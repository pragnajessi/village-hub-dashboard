import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const router = Router()
const prisma = new PrismaClient()

// Generate API Key
router.post('/generate', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const key = 'vh_' + crypto.randomBytes(16).toString('hex')
    const secret = crypto.randomBytes(32).toString('hex')
    const secretHash = await bcrypt.hash(secret, 10)

    const apiKey = await prisma.apiKey.create({
      data: {
        key,
        secretHash,
        userId: req.userId!
      }
    })

    // Return secret only once — never stored in plain text
    res.status(201).json({
      key: apiKey.key,
      secret,
      message: 'Save your secret — it will not be shown again'
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// List API Keys for user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: req.userId! },
      select: { id: true, key: true, createdAt: true }
    })
    res.json(apiKeys)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete API Key
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.apiKey.delete({
      where: { id: Number(req.params['id']), userId: req.userId! }
    })
    res.json({ message: 'API key deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router