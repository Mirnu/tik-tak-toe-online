import { prisma } from "@/shared/lib/db";

async function main() {
    const user = await prisma.user.create({
        data: {
            login: "admin",
            rating: 1000,
            passwordHash: "admin",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            login: "admin2",
            rating: 1000,
            passwordHash: "admin2",
        },
    });

    await prisma.game.create({
        data: {
            status: "idle",
            field: Array(9).fill(null),
            players: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    await prisma.game.create({
        data: {
            status: "idle",
            field: Array(9).fill(null),
            players: {
                connect: {
                    id: user2.id,
                },
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
