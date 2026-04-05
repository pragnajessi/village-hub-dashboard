import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const apiLogger = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()
  const apiKey = req.headers['x-api-key'] as string

  res.on('finish', async () => {
    if (!apiKey) return

    try {
      const key = await prisma.apiKey.findUnique({
        where: { key: apiKey }
      })

      if (key) {
        await prisma.apiLog.create({
          data: {
            endpoint: req.path,
            responseTime: Date.now() - start,
            apiKeyId: key.id
          }
        })
      }
    } catch (error) {
      console.error('Logging error:', error)
    }
  })

  next()
}