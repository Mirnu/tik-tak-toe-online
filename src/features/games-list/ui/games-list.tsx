import { gameService } from "@/entities/game/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
    const games = await gameService.getIdleGames();

    return (
        <div className="grid grid-cols-2 gap-4">
            {games.map((game) => (
                <Card key={game.id}>
                    <CardHeader>
                        <CardTitle>Игра с {game.creator.login}</CardTitle>
                    </CardHeader>
                    <CardContent>Рейтинг: {game.creator.rating}</CardContent>
                </Card>
            ))}
        </div>
    );
}
