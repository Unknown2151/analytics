import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import Fastify from 'fastify';

const prisma = new PrismaClient();

const fastify = Fastify({
    logger: true
});

fastify.get('/', async (request, reply) => {
    return { status: 'ok', service: 'tracker-api' };
});

fastify.post('/api/track', async (request, reply) => {
    try {
        const { type, eventName, payload } = request.body;

        if (!type || !eventName) {
            reply.code(400);
            return { error: 'Missing required fields: type, eventName' };
        }

        const newEvent = await prisma.rawEvent.create({
            data: {
                type: type,
                eventName: eventName,
                payload: payload || undefined,
            },
        });

        return { success: true, event: newEvent };

    } catch (error) {
        fastify.log.error(error);
        reply.code(500);
        return { error: 'Failed to track event' };
    }
});


const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        await prisma.$disconnect();
        process.exit(1);
    }
};

start();