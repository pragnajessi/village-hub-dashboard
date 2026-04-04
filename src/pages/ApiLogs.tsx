import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { mockApiLogs } from "@/lib/mock-data";

const ApiLogs = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [endpointFilter, setEndpointFilter] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const endpoints = [...new Set(mockApiLogs.map((l) => l.endpoint))];

  const filtered = mockApiLogs.filter((l) => {
    const matchStatus = statusFilter === "all" || l.statusCode.toString() === statusFilter;
    const matchEndpoint = endpointFilter === "all" || l.endpoint === endpointFilter;
    const logDate = new Date(l.timestamp);
    const matchStart = !startDate || logDate >= startDate;
    const matchEnd = !endDate || logDate <= endDate;
    return matchStatus && matchEndpoint && matchStart && matchEnd;
  });

  const exportCsv = () => {
    const header = "Timestamp,API Key,Username,Endpoint,Response Time (ms),Status Code\n";
    const rows = filtered.map((l) => `${l.timestamp},${l.apiKey},${l.username},${l.endpoint},${l.responseTime},${l.statusCode}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusColor = (code: number) => {
    if (code < 300) return "rounded-full bg-[hsl(150,60%,45%)] text-white px-3 py-1";
    if (code < 500) return "rounded-full bg-[hsl(35,90%,55%)] text-white px-3 py-1";
    return "rounded-full bg-[hsl(0,70%,55%)] text-white px-3 py-1";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor and debug all API activity</p>
        </div>
        <Button onClick={exportCsv} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[180px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-[180px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status Code" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Codes</SelectItem>
            <SelectItem value="200">200</SelectItem>
            <SelectItem value="201">201</SelectItem>
            <SelectItem value="400">400</SelectItem>
            <SelectItem value="401">401</SelectItem>
            <SelectItem value="404">404</SelectItem>
            <SelectItem value="500">500</SelectItem>
          </SelectContent>
        </Select>
        <Select value={endpointFilter} onValueChange={setEndpointFilter}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Endpoint" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Endpoints</SelectItem>
            {endpoints.map((ep) => <SelectItem key={ep} value={ep}>{ep}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-l-4 border-l-[hsl(280,60%,55%)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 50).map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs">{new Date(l.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-xs">{l.apiKey}</TableCell>
                  <TableCell>{l.username}</TableCell>
                  <TableCell className="font-mono text-xs">{l.endpoint}</TableCell>
                  <TableCell>{l.responseTime}ms</TableCell>
                  <TableCell><Badge className={statusColor(l.statusCode)}>{l.statusCode}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiLogs;
