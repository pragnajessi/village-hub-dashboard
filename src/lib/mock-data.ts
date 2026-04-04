// Mock data for VillageAPI dashboard

export const metricCards = {
  totalVillages: 645832,
  activeUsers: 3247,
  todayApiRequests: 28493,
  avgResponseTime: 142, // ms
};

export const topStatesByVillage = [
  { state: "Uttar Pradesh", count: 97941 },
  { state: "Madhya Pradesh", count: 55393 },
  { state: "Bihar", count: 45103 },
  { state: "Rajasthan", count: 44981 },
  { state: "Maharashtra", count: 43711 },
  { state: "Odisha", count: 51349 },
  { state: "Tamil Nadu", count: 37189 },
  { state: "West Bengal", count: 40203 },
  { state: "Andhra Pradesh", count: 28293 },
  { state: "Gujarat", count: 27842 },
];

export const apiRequestsLast30Days = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    requests: Math.floor(Math.random() * 15000) + 20000,
  };
});

export const usersByPlan = [
  { plan: "Free", count: 1820, fill: "hsl(210, 70%, 55%)" },
  { plan: "Premium", count: 890, fill: "hsl(150, 60%, 45%)" },
  { plan: "Pro", count: 420, fill: "hsl(280, 60%, 55%)" },
  { plan: "Unlimited", count: 117, fill: "hsl(35, 90%, 55%)" },
];

export const responseTimeTrends = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    avgTime: Math.floor(Math.random() * 80) + 100,
    p95Time: Math.floor(Math.random() * 120) + 200,
  };
});

// User management mock data
const plans = ["Free", "Premium", "Pro", "Unlimited"] as const;
const statuses = ["Active", "Pending", "Suspended"] as const;
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Priya", "Ananya", "Diya", "Meera", "Riya", "Saanvi", "Isha", "Kavya", "Aisha", "Neha"];
const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Reddy", "Joshi", "Verma", "Nair", "Iyer", "Das", "Mehta", "Rao", "Chopra", "Bhat", "Mishra", "Banerjee", "Desai", "Pillai", "Menon"];

export const mockUsers = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / 2) % lastNames.length];
  const regDate = new Date();
  regDate.setDate(regDate.getDate() - Math.floor(Math.random() * 365));
  const lastActive = new Date();
  lastActive.setHours(lastActive.getHours() - Math.floor(Math.random() * 720));
  return {
    id: `usr_${(i + 1).toString().padStart(4, "0")}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
    plan: plans[i % plans.length],
    status: statuses[i % statuses.length],
    registeredDate: regDate.toISOString().split("T")[0],
    lastActive: lastActive.toISOString().split("T")[0],
  };
});

// API Logs mock data
const endpoints = ["/api/v1/villages", "/api/v1/villages/search", "/api/v1/states", "/api/v1/districts", "/api/v1/subdistricts"];
const statusCodes = [200, 200, 200, 200, 201, 400, 401, 404, 500];

export const mockApiLogs = Array.from({ length: 100 }, (_, i) => {
  const ts = new Date();
  ts.setMinutes(ts.getMinutes() - i * 15);
  const user = mockUsers[i % mockUsers.length];
  return {
    id: i + 1,
    timestamp: ts.toISOString(),
    apiKey: `vapi_****${Math.random().toString(36).substring(2, 6)}`,
    username: user.name,
    endpoint: endpoints[i % endpoints.length],
    responseTime: Math.floor(Math.random() * 300) + 50,
    statusCode: statusCodes[i % statusCodes.length],
  };
});

// B2B Portal mock data
export const portalUsage = {
  todayRequests: 1247,
  monthlyTotal: 34892,
  successRate: 99.2,
};

export const portalUsageLast7Days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toLocaleDateString("en-US", { weekday: "short" }),
    requests: Math.floor(Math.random() * 3000) + 3000,
  };
});

export const mockApiKeys = [
  { id: "key_1", name: "Production Key", key: "vapi_prod_a8f3k2m9x1b7", created: "2025-01-15", status: "Active" as const },
  { id: "key_2", name: "Staging Key", key: "vapi_stg_c4d6e8f0g2h1", created: "2025-02-20", status: "Active" as const },
  { id: "key_3", name: "Dev Key", key: "vapi_dev_j5k7l9m1n3p0", created: "2025-03-10", status: "Revoked" as const },
];

// Contact form village data
export const mockVillages = [
  { name: "Rampur", subDistrict: "Sadar", district: "Lucknow", state: "Uttar Pradesh", country: "India" },
  { name: "Ramgarh", subDistrict: "Hazaribagh", district: "Hazaribagh", state: "Jharkhand", country: "India" },
  { name: "Sultanpur", subDistrict: "Sultanpur", district: "Sultanpur", state: "Uttar Pradesh", country: "India" },
  { name: "Chandpur", subDistrict: "Bijnor", district: "Bijnor", state: "Uttar Pradesh", country: "India" },
  { name: "Dhanpur", subDistrict: "Ballia", district: "Ballia", state: "Uttar Pradesh", country: "India" },
  { name: "Kothagudem", subDistrict: "Kothagudem", district: "Bhadradri", state: "Telangana", country: "India" },
  { name: "Vellanki", subDistrict: "Narsapur", district: "Medak", state: "Telangana", country: "India" },
  { name: "Palani", subDistrict: "Palani", district: "Dindigul", state: "Tamil Nadu", country: "India" },
  { name: "Mandya", subDistrict: "Mandya", district: "Mandya", state: "Karnataka", country: "India" },
  { name: "Shirdi", subDistrict: "Rahata", district: "Ahmednagar", state: "Maharashtra", country: "India" },
  { name: "Alibaug", subDistrict: "Alibaug", district: "Raigad", state: "Maharashtra", country: "India" },
  { name: "Somnath", subDistrict: "Veraval", district: "Gir Somnath", state: "Gujarat", country: "India" },
  { name: "Pushkar", subDistrict: "Ajmer", district: "Ajmer", state: "Rajasthan", country: "India" },
  { name: "Khajuraho", subDistrict: "Rajnagar", district: "Chhatarpur", state: "Madhya Pradesh", country: "India" },
  { name: "Bodh Gaya", subDistrict: "Bodh Gaya", district: "Gaya", state: "Bihar", country: "India" },
];
