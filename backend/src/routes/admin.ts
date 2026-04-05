import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()
const prisma = new PrismaClient()

// Get dashboard stats
router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const totalVillages = await prisma.village.count()
    const totalUsers = await prisma.user.count()
    const totalApiRequests = await prisma.apiLog.count()
    const totalStates = await prisma.state.count()

    res.json({
      totalVillages,
      totalUsers,
      totalApiRequests,
      totalStates,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get recent API logs
router.get('/logs', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.apiLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        apiKey: {
          select: { key: true, user: { select: { email: true } } }
        }
      }
    })
    res.json(logs)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all users
router.get('/users', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        planType: true,
        createdAt: true,
        _count: { select: { apiKeys: true } }
      }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router