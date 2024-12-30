import { gameService } from "@/entities/game/server";
import { FC } from "react";
import { GameCard } from "../ui/game-card";
import { Layout } from "../ui/layout";
import { CreateButton } from "./create-button";
import { createGameAction } from "../actions/create-game";

export const GamesList: FC = async () => {
    const games = await gameService.getIdleGames();

    return (
        <Layout actions={<CreateButton action={createGameAction} />}>
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    login={game.creator.login}
                    rating={game.creator.rating}
                />
            ))}
        </Layout>
    );
};
