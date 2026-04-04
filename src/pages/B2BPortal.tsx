import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Copy, RefreshCw, Circle as XCircle, Zap, Calendar, CircleCheck as CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { portalUsage, portalUsageLast7Days, mockApiKeys } from "@/lib/mock-data";

const accentColors = [
  "border-l-4 border-l-[hsl(210,70%,55%)]",
  "border-l-4 border-l-[hsl(150,60%,45%)]",
  "border-l-4 border-l-[hsl(35,90%,55%)]",
];

const iconColors = [
  "text-[hsl(210,70%,55%)]",
  "text-[hsl(150,60%,45%)]",
  "text-[hsl(35,90%,55%)]",
];

const B2BPortal = () => {
  const [keys, setKeys] = useState(mockApiKeys);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied");
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "Revoked" as const } : k)));
    toast.success("API key revoked");
  };

  const regenerateKey = (id: string) => {
    const newKey = `vapi_${Math.random().toString(36).substring(2, 18)}`;
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, key: newKey, status: "Active" as const } : k)));
    toast.success("API key regenerated");
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Registration submitted successfully!");
    (e.target as HTMLFormElement).reset();
  };

  const summaryCards = [
    { title: "Today's Requests", value: portalUsage.todayRequests.toLocaleString(), icon: Zap },
    { title: "Monthly Total", value: portalUsage.monthlyTotal.toLocaleString(), icon: Calendar },
    { title: "Success Rate", value: `${portalUsage.successRate}%`, icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">B2B User Portal</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your API keys and monitor usage</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((c, i) => (
          <Card key={c.title} className={accentColors[i]}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className={`h-5 w-5 ${iconColors[i]}`} />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{c.value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-l-4 border-l-[hsl(210,70%,55%)]">
        <CardHeader><CardTitle>Usage (Last 7 Days)</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={{ requests: { label: "Requests", color: "hsl(210, 70%, 55%)" } }} className="h-[250px]">
            <LineChart data={portalUsageLast7Days}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="requests" stroke="hsl(210, 70%, 55%)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-[hsl(150,60%,45%)]">
        <CardHeader><CardTitle>API Keys</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell className="font-medium">{k.name}</TableCell>
                  <TableCell className="font-mono text-xs">{k.key}</TableCell>
                  <TableCell>{k.created}</TableCell>
                  <TableCell>
                    <Badge className={k.status === "Active"
                      ? "rounded-full bg-[hsl(150,60%,45%)] text-white px-3 py-1"
                      : "rounded-full bg-[hsl(0,70%,55%)] text-white px-3 py-1"}>
                      {k.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => copyKey(k.key)}><Copy className="h-3 w-3" /></Button>
                      <Button size="sm" variant="outline" onClick={() => revokeKey(k.id)} disabled={k.status === "Revoked"}><XCircle className="h-3 w-3" /></Button>
                      <Button size="sm" variant="outline" onClick={() => regenerateKey(k.id)}><RefreshCw className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-[hsl(35,90%,55%)]">
        <CardHeader><CardTitle>Self Registration</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4 max-w-md">
            <div className="space-y-2"><Label htmlFor="reg-name">Name</Label><Input id="reg-name" required /></div>
            <div className="space-y-2"><Label htmlFor="reg-email">Email</Label><Input id="reg-email" type="email" required /></div>
            <div className="space-y-2"><Label htmlFor="reg-company">Company</Label><Input id="reg-company" required /></div>
            <Button type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default B2BPortal;
