

# VillageAPI — SaaS Dashboard Platform

## Overview
A multi-page SaaS dashboard for a Village API platform with admin tools, user management, API logs, a B2B portal, and a demo contact form. All data is mock/dummy. Dark/light mode throughout, collapsible sidebar navigation, fully responsive.

## Pages & Features

### 1. Layout & Navigation
- Collapsible sidebar with VillageAPI logo, nav links to all 5 pages, and a dark/light mode toggle at the bottom
- Responsive: sidebar collapses to icon-only on smaller screens
- Header with sidebar trigger and breadcrumb

### 2. Admin Dashboard (`/`)
- 4 metric cards: Total Villages, Active Users, Today's API Requests, Avg Response Time
- Bar chart: Top 10 states by village count (Recharts)
- Line chart: API requests over last 30 days
- Pie chart: Users by plan type (Free, Premium, Pro, Unlimited)
- Area chart: Response time trends

### 3. User Management (`/users`)
- Data table with columns: Name, Email, Plan, Status, Registered Date, Last Active
- Search input (filters by name/email)
- Dropdown filters: Status (Pending/Active/Suspended), Plan type
- Action buttons per row: Approve, Suspend, Delete (with toast confirmations)

### 4. API Logs (`/logs`)
- Data table: Timestamp, API Key (masked), Username, Endpoint, Response Time, Status Code
- Filters: date range picker, status code dropdown, endpoint dropdown
- "Export CSV" button that downloads filtered results

### 5. B2B User Portal (`/portal`)
- Summary cards: Today's Requests, Monthly Total, Success Rate
- Line chart: last 7 days usage
- API Key management table with Copy, Revoke, Regenerate actions
- Self-registration form (Name, Email, Company)

### 6. Demo Contact Form (`/contact`)
- Fields: Full Name, Email, Phone
- Village search with autocomplete dropdown (mock village list)
- Auto-fill: Sub-District, District, State, Country on village selection
- Submit button with success toast

## Tech & Design
- React + TypeScript + Tailwind CSS + shadcn/ui components
- Recharts for all charts
- Dark/light mode via class-based toggle with localStorage persistence
- Collapsible sidebar using shadcn Sidebar component
- All mock data — no backend required
- Responsive for tablet and desktop

