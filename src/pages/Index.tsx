import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Line, LineChart, Area, AreaChart, CartesianGrid } from "recharts";
import { Building2, Users, Zap, Clock } from "lucide-react";
import { apiRequestsLast30Days, responseTimeTrends } from "@/lib/mock-data";

const accentColors = [
  "border-l-4 border-l-[hsl(210,70%,55%)]",
  "border-l-4 border-l-[hsl(150,60%,45%)]",
  "border-l-4 border-l-[hsl(280,60%,55%)]",
  "border-l-4 border-l-[hsl(35,90%,55%)]",
];

const iconColors = [
  "text-[hsl(210,70%,55%)]",
  "text-[hsl(150,60%,45%)]",
  "text-[hsl(280,60%,55%)]",
  "text-[hsl(35,90%,55%)]",
];

const Index = () => {
  const [stats, setStats] = useState({
    totalVillages: 0,
    totalUsers: 0,
    totalApiRequests: 0,
    totalStates: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:3000/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error)
  }, [])

  const metrics = [
    { title: "Total Villages", value: stats.totalVillages.toLocaleString(), icon: Building2, desc: "Across all states" },
    { title: "Active Users", value: stats.totalUsers.toLocaleString(), icon: Users, desc: "Registered users" },
    { title: "Total API Requests", value: stats.totalApiRequests.toLocaleString(), icon: Zap, desc: "All time" },
    { title: "Total States", value: stats.totalStates.toLocaleString(), icon: Clock, desc: "Across India" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening with VillageAPI today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={m.title} className={accentColors[i]}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.title}</CardTitle>
              <m.icon className={`h-5 w-5 ${iconColors[i]}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="min-w-0 overflow-hidden">
          <CardHeader><CardTitle>API Requests (Last 30 Days)</CardTitle></CardHeader>
          <CardContent className="pr-2">
            <ChartContainer config={{ requests: { label: "Requests", color: "hsl(210, 70%, 55%)" } }} className="h-[320px] w-full">
              <LineChart data={apiRequestsLast30Days} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="requests" stroke="hsl(210, 70%, 55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden">
          <CardHeader><CardTitle>Response Time Trends</CardTitle></CardHeader>
          <CardContent className="pr-2">
            <ChartContainer config={{ avgTime: { label: "Avg (ms)", color: "hsl(150, 60%, 45%)" }, p95Time: { label: "P95 (ms)", color: "hsl(0, 70%, 55%)" } }} className="h-[320px] w-full">
              <AreaChart data={responseTimeTrends} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="avgTime" stroke="hsl(150, 60%, 45%)" fill="hsl(150, 60%, 45%)" fillOpacity={0.2} />
                <Area type="monotone" dataKey="p95Time" stroke="hsl(0, 70%, 55%)" fill="hsl(0, 70%, 55%)" fillOpacity={0.1} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index;