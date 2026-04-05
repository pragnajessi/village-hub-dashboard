import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
})

async function importData() {
  const dataDir = path.join(process.cwd(), 'data')
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.xls') || f.endsWith('.xlsx') || f.endsWith('.ods'))

  console.log(`Found ${files.length} files to import`)

  // Create India country record
  const country = await prisma.country.upsert({
    where: { code: 'IN' },
    update: {},
    create: { name: 'India', code: 'IN' }
  })

  for (const file of files) {
    console.log(`Processing ${file}...`)
    const filePath = path.join(dataDir, file)
    const workbook = XLSX.readFile(filePath)
    const sheet = workbook.Sheets[workbook.SheetNames[0]!]
    const rows: any[] = XLSX.utils.sheet_to_json(sheet)

    // Collect unique states, districts, subdistricts
    const stateMap = new Map<string, string>()
    const districtMap = new Map<string, { name: string; stateCode: string }>()
    const subDistrictMap = new Map<string, { name: string; districtCode: string; stateCode: string }>()
    const villages: { code: string; name: string; subDistrictCode: string; stateCode: string; districtCode: string }[] = []

    for (const row of rows) {
      const stateCode = String(row['MDDS STC'])
      const stateName = String(row['STATE NAME'])
      const districtCode = String(row['MDDS DTC'])
      const districtName = String(row['DISTRICT NAME'])
      const subDistrictCode = String(row['MDDS Sub_DT'])
      const subDistrictName = String(row['SUB-DISTRICT NAME'])
      const villageCode = String(row['MDDS PLCN'])
      const villageName = String(row['Area Name'])

      if (villageCode === '0' || !villageName) continue

      stateMap.set(stateCode, stateName)
      districtMap.set(`${stateCode}-${districtCode}`, { name: districtName, stateCode })
      subDistrictMap.set(`${stateCode}-${districtCode}-${subDistrictCode}`, { name: subDistrictName, districtCode: `${stateCode}-${districtCode}`, stateCode })
      villages.push({ code: villageCode, name: villageName.trim(), subDistrictCode: `${stateCode}-${districtCode}-${subDistrictCode}`, stateCode, districtCode: `${stateCode}-${districtCode}` })
    }

    // Insert states
    for (const [code, name] of stateMap) {
      await prisma.state.upsert({
        where: { code },
        update: {},
        create: { code, name, countryId: country.id }
      })
    }

    // Insert districts
    const stateRecords = await prisma.state.findMany()
    const stateIdMap = new Map(stateRecords.map(s => [s.code, s.id]))

    for (const [code, { name, stateCode }] of districtMap) {
      await prisma.district.upsert({
        where: { code },
        update: {},
        create: { code, name, stateId: stateIdMap.get(stateCode)! }
      })
    }

    // Insert subdistricts
    const districtRecords = await prisma.district.findMany()
    const districtIdMap = new Map(districtRecords.map(d => [d.code, d.id]))

    for (const [code, { name, districtCode }] of subDistrictMap) {
      await prisma.subDistrict.upsert({
        where: { code },
        update: {},
        create: { code, name, districtId: districtIdMap.get(districtCode)! }
      })
    }

    // Insert villages in batches of 500
    const subDistrictRecords = await prisma.subDistrict.findMany()
    const subDistrictIdMap = new Map(subDistrictRecords.map(s => [s.code, s.id]))

    const BATCH_SIZE = 500
    for (let i = 0; i < villages.length; i += BATCH_SIZE) {
      const batch = villages.slice(i, i + BATCH_SIZE)
      await prisma.village.createMany({
        data: batch.map(v => ({
          code: v.code,
          name: v.name,
          subDistrictId: subDistrictIdMap.get(v.subDistrictCode)!
        })),
        skipDuplicates: true
      })
      console.log(`  Inserted ${Math.min(i + BATCH_SIZE, villages.length)}/${villages.length} villages`)
    }

    console.log(`✅ Done: ${file}`)
  }

  console.log('🎉 Import complete!')
  await prisma.$disconnect()
}

importData().catch(console.error)