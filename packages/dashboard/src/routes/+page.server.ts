import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export async function load() {
    const stats = await prisma.aggregatedStats.findMany({
        orderBy: {
            date: 'desc',
        },
    });

    return {
        stats: stats,
    };
}