## VillageAPI Dashboard

A production-grade SaaS platform providing a comprehensive REST API for India's complete village-level geographical data.

## 🌍 Live Demo
VillageAPI: https://village-hub-dashboard-clxensgig-pragnajessiks-projects.vercel.app/

## 👥 Team
Name: PragnaJessi Koduri Role: Frontend Developer 
Name: Mohammad Faiz Role: Backend Developer 

## 🚀 Features
- Admin Dashboard with analytics charts
- User Management with search and filters
- API Logs viewer with CSV export
- B2B User Portal with API key management
- Demo Contact Form with village autocomplete
- Dark/Light mode toggle
- Fully responsive design
- JWT Authentication
- Rate limiting
- NeonDB PostgreSQL database

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts for data visualization
- Vite build tool

### Backend
- Node.js + Express.js
- NeonDB (PostgreSQL)
- Prisma ORM
- JWT Authentication
- Redis (Upstash) for caching

## 📁 Project Structure
```
village-hub-dashboard/
├── src/                  # Frontend React code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Dashboard pages
│   └── lib/              # Utilities and mock data
├── backend/              # Backend Express API
│   ├── src/              # API routes and controllers
│   ├── prisma/           # Database schema
│   └── data/             # Village data files
└── public/               # Static assets
```

## 🗺️ Pages
- **/** — Admin Dashboard with charts and metrics
- **/users** — User Management
- **/logs** — API Logs viewer
- **/portal** — B2B User Portal
- **/contact** — Demo Contact Form

## ⚙️ Getting Started

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL=your_neondb_url
REDIS_URL=your_upstash_redis_url
JWT_SECRET=your_jwt_secret
```

## 📊 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /v1/search | Search villages |
| GET | /v1/states | List all states |
| GET | /v1/states/:id/districts | Districts by state |
| GET | /v1/autocomplete | Village autocomplete |

## 🏢 Built for
Bluestock Fintech Internship — Capstone Project 2026
