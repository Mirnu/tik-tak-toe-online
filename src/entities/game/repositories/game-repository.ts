import { prisma } from "@/shared/lib/db";
import { GameEntity } from "../domain";
import { dbGameToGameEntity } from "../maper/game-mapper";
import { GameStatus } from "@prisma/client";

interface GameListParams {
    status?: GameStatus;
}

async function gameList({ status }: GameListParams): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        where: { status },
        include: {
            players: true,
            winner: true,
        },
    });

    return games.map(dbGameToGameEntity);
}

export const gameRepository = { gameList };
