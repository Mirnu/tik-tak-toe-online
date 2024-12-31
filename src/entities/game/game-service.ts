import cuid from "cuid";
import { GameIdleEntity, PlayerEntity } from "./domain";
import { gameRepository } from "./game-repository";
import { left, right } from "@/shared/lib/either";

async function getIdleGames(): Promise<GameIdleEntity[]> {
    const games = await gameRepository.getAllGames({ status: "idle" });
    return games as GameIdleEntity[];
}

async function createGame(player: PlayerEntity) {
    const playerGames = await gameRepository.getGamesByPlayerId(
        player.id,
        "idle"
    );

    if (playerGames.length > 0) {
        return left("can-create-only-one-game");
    }

    const createdGame = await gameRepository.createGame({
        gameId: cuid(),
        creatorId: player.id,
    });
    return right(createdGame);
}

export const gameService = { getIdleGames, createGame };
