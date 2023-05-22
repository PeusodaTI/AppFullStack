import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()

const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  console.log(users)
  return users
})

app
  .listen({
    port: 3333,
  })
  .then(() => {})
