import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game-repository";

async function getIdleGames(): Promise<GameIdleEntity[]> {
    const games = await gameRepository.gameList({ status: "idle" });
    return games as GameIdleEntity[];
}

export const gameService = { getIdleGames };
