import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global types to
// prevent multiple instances of prisma client
// get created by hot-reloading in development
// declare global {
//     var prismadb: PrismaClient
// }

const prismadb = /*global.prismadb || */new PrismaClient()

// if (process.env.NODE_ENV === 'development') {
//     global.prismadb = prismadb
// }

export default prismadb;