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
