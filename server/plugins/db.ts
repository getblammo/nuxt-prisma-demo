import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare module 'nitropack' {
  interface NitroApp {
    prisma: PrismaClient
  }
}

export default defineNitroPlugin((nitro) => {
  prisma = new PrismaClient()
  nitro.prisma = prisma

  nitro.hooks.hook('close', async () => {
    await prisma.$disconnect()
  })
})

export { prisma }
