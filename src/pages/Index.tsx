import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Line, LineChart, Pie, PieChart, Cell, Area, AreaChart, CartesianGrid } from "recharts";
import { Building2, Users, Zap, Clock } from "lucide-react";
import { metricCards, topStatesByVillage, apiRequestsLast30Days, usersByPlan, responseTimeTrends } from "@/lib/mock-data";

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

const metrics = [
  { title: "Total Villages", value: metricCards.totalVillages.toLocaleString(), icon: Building2, desc: "Across all states" },
  { title: "Active Users", value: metricCards.activeUsers.toLocaleString(), icon: Users, desc: "+12% from last month" },
  { title: "Today's API Requests", value: metricCards.todayApiRequests.toLocaleString(), icon: Zap, desc: "Real-time count" },
  { title: "Avg Response Time", value: `${metricCards.avgResponseTime}ms`, icon: Clock, desc: "Last 24 hours" },
];

const Index = () => (
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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar chart with blue gradient */}
      <Card>
        <CardHeader><CardTitle>Top 10 States by Village Count</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ count: { label: "Villages", color: "hsl(210, 70%, 55%)" } }} className="h-[300px]">
            <BarChart data={topStatesByVillage} layout="vertical" margin={{ left: 80 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(220, 80%, 60%)" />
                  <stop offset="100%" stopColor="hsl(200, 90%, 50%)" />
                </linearGradient>
              </defs>
              <XAxis type="number" />
              <YAxis dataKey="state" type="category" width={75} tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="url(#barGradient)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line chart */}
      <Card>
        <CardHeader><CardTitle>API Requests (Last 30 Days)</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ requests: { label: "Requests", color: "hsl(210, 70%, 55%)" } }} className="h-[300px]">
            <LineChart data={apiRequestsLast30Days}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="requests" stroke="hsl(210, 70%, 55%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie chart */}
      <Card>
        <CardHeader><CardTitle>Users by Plan Type</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ count: { label: "Users" } }} className="h-[300px]">
            <PieChart>
              <Pie data={usersByPlan} dataKey="count" nameKey="plan" cx="50%" cy="50%" outerRadius={100} label={({ plan, count }) => `${plan}: ${count}`}>
                {usersByPlan.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Area chart */}
      <Card>
        <CardHeader><CardTitle>Response Time Trends</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ avgTime: { label: "Avg (ms)", color: "hsl(150, 60%, 45%)" }, p95Time: { label: "P95 (ms)", color: "hsl(0, 70%, 55%)" } }} className="h-[300px]">
            <AreaChart data={responseTimeTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="avgTime" stroke="hsl(150, 60%, 45%)" fill="hsl(150, 60%, 45%)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="p95Time" stroke="hsl(0, 70%, 55%)" fill="hsl(0, 70%, 55%)" fillOpacity={0.1} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Index;
