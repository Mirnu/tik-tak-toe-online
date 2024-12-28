import { prisma } from "@/shared/lib/db";
import { GameEntity } from "../domain";
import { dbGameToGameEntity } from "../maper/game-mapper";
import { GameStatus } from "@prisma/client";

interface GameListParams {
    status?: GameStatus;
}

async function createGame({
    gameId,
    creatorId,
}: {
    gameId: string;
    creatorId: string;
}): Promise<GameEntity> {
    const createdGame = await prisma.game.create({
        data: {
            status: "idle",
            field: Array(9).fill(null),
            id: gameId,
            players: {
                connect: {
                    id: creatorId,
                },
            },
        },
        include: {
            players: true,
            winner: true,
        },
    });

    return dbGameToGameEntity(createdGame);
}

async function getAllGames({ status }: GameListParams): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        where: { status },
        include: {
            players: true,
            winner: true,
        },
    });

    return games.map(dbGameToGameEntity);
}

async function getGamesByPlayerId(playerId: string, status?: GameStatus) {
    const games = await prisma.game.findMany({
        where: { players: { some: { id: playerId } }, status: status },
    });
    return games;
}

export const gameRepository = { getAllGames, createGame, getGamesByPlayerId };
