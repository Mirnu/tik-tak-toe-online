import { prisma } from "@/shared/lib/db";
import { UserEntity } from "./domain";

function saveUser(user: UserEntity) {
    return prisma.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
    });
}

interface GetUserWhere {
    id?: string;
    login?: string;
}

function getUser(where: GetUserWhere) {
    return prisma.user.findFirst({ where });
}

export const userRepository = { saveUser, getUser };
