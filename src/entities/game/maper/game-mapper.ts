import { Game, User } from "@prisma/client";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import { z } from "zod";

const fieldSchema = z.array(z.union([z.string(), z.null()]));

export function dbGameToGameEntity(
    game: Game & { players: User[]; winner: User | null }
): GameEntity {
    switch (game.status) {
        case "idle": {
            const [creator] = game.players;
            if (!creator) {
                throw new Error("Game has no creator");
            }
            return {
                id: game.id,
                creator: creator,
                status: game.status,
            } satisfies GameIdleEntity;
        }
        case "inProgress":
        case "gameOverDraw": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: fieldSchema.parse(game.field),
            };
        }
        case "gameOver": {
            if (!game.winner) {
                throw new Error("Game has no winner");
            }

            return {
                id: game.id,
                players: game.players,
                status: game.status,
                winner: game.winner,
                field: fieldSchema.parse(game.field),
            } satisfies GameOverEntity;
        }
    }
}
