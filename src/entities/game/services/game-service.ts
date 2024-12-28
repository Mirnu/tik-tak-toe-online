import cuid from "cuid";
import { GameIdleEntity, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game-repository";

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
        return {
            type: "error",
            error: "can-create-only-one-game",
        };
    }

    const games = await gameRepository.createGame({
        gameId: cuid(),
        creatorId: player.id,
    });
    return games;
}

export const gameService = { getIdleGames, createGame };
