"use server";

import { gameService } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";

export const createGameAction = async () => {
    const user = await prisma.user.findFirst();
    if (!user) return left("user-not-found");

    const gameResult = await gameService.createGame(user);
    return gameResult;
};
