import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all states
router.get('/states', async (req, res) => {
  const states = await prisma.state.findMany()
  res.json(states)
})

// Get districts by state
router.get('/districts', async (req, res) => {
  const { stateId } = req.query
  const districts = await prisma.district.findMany({
    where: { stateId: Number(stateId) }
  })
  res.json(districts)
})

// Get subdistricts by district
router.get('/subdistricts', async (req, res) => {
  const { districtId } = req.query
  const subDistricts = await prisma.subDistrict.findMany({
    where: { districtId: Number(districtId) }
  })
  res.json(subDistricts)
})

// Get villages by subdistrict
router.get('/villages', async (req, res) => {
  const { subDistrictId } = req.query
  const villages = await prisma.village.findMany({
    where: { subDistrictId: Number(subDistrictId) }
  })
  res.json(villages)
})

// Search villages by name
router.get('/villages/search', async (req, res) => {
  const { q } = req.query
  const villages = await prisma.village.findMany({
    where: { name: { contains: String(q), mode: 'insensitive' } },
    take: 50,
    include: {
      subDistrict: {
        include: {
          district: {
            include: {
              state: true
            }
          }
        }
      }
    }
  })
  res.json(villages)
})

export default router