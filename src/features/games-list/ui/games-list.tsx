import { gameService } from "@/entities/game";

export async function GamesList() {
    const games = await gameService.getIdleGames();

    return <div></div>;
}
