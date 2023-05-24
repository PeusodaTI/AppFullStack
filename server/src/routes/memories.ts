/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
    app.get('/memories', async () =>   {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        })
        
        return memories.map(memories => {
            return {
                id: memories.id,
                coverUrl: memories.coverUrl,
                excerpt: memories.content.substring(0, 115).concat('...')
            }
        })
    })

    app.get('/memories/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const memory = await prisma.memory.findFirstOrThrow({
            where: {
                id,
            }
        })

        return memory
    })

    app.post('/memories', async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

        const memory = await prisma.memory.create({
            data: {
                content,
                coverUrl,
                isPublic,
                userId: '3d61141e-8a1a-4a34-81ac-842cba880bc7',
            }
        })

        return memory
    })

    app.put('/memories/:id', async (request) =>   {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

        const memory = await prisma.memory.update({
            where: {
                id,
            },
            data: {
                content, 
                coverUrl, 
                isPublic
            }
        })

        return memory
    })

    app.delete('/memories/:id', async (request) =>   {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.memory.delete({
            where: {
                id,
            }
        })
    })
}