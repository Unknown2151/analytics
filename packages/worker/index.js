import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
    console.log('Starting worker process...');

    const rawEvents = await prisma.rawEvent.findMany();

    if (rawEvents.length === 0) {
        console.log('No new events to process. Exiting.');
        return;
    }

    console.log(`Found ${rawEvents.length} raw events to process.`);

    const dailyCounts = {};
    for (const event of rawEvents) {
        const eventDate = event.createdAt.toISOString().split('T')[0];
        const key = `${eventDate}::${event.eventName}`;
        if (!dailyCounts[key]) {
            dailyCounts[key] = {
                date: new Date(eventDate),
                eventName: event.eventName,
                count: 0,
            };
        }
        dailyCounts[key].count += 1;
    }

    console.log('Saving aggregated stats to the database...');
    for (const key in dailyCounts) {
        const stat = dailyCounts[key];
        await prisma.aggregatedStats.upsert({
            where: {
                date_eventName: {
                    date: stat.date,
                    eventName: stat.eventName,
                },
            },
            update: { count: { increment: stat.count } },
            create: {
                date: stat.date,
                eventName: stat.eventName,
                count: stat.count,
            },
        });
    }

    const eventIdsToDelete = rawEvents.map(event => event.id);
    await prisma.rawEvent.deleteMany({
        where: { id: { in: eventIdsToDelete } },
    });

    console.log(`Successfully processed and deleted ${rawEvents.length} events.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Worker process finished.');
    });