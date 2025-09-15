import { PrismaClient } from '@prisma/client';

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
