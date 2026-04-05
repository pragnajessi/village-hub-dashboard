import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import villageRoutes from './routes/villages.js'
import authRoutes from './routes/auth.js'
import apiKeyRoutes from './routes/apikeys.js'
import adminRoutes from './routes/admin.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'
import { apiLogger } from './middleware/apiLogger.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }))
app.use(express.json())
app.use(apiLogger)

// Routes
app.use('/api/v1', apiLimiter, villageRoutes)
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/keys', apiKeyRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Village Hub API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
}) 