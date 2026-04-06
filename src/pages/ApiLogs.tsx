import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface Log {
  id: number
  endpoint: string
  responseTime: number
  createdAt: string
  apiKey: {
    key: string
    user: { email: string }
  }
}

const ApiLogs = () => {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:3000/api/admin/logs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(console.error)
  }, [])

  const exportCsv = () => {
    const header = "Timestamp,API Key,Email,Endpoint,Response Time (ms)\n"
    const rows = logs.map(l => `${l.createdAt},${l.apiKey?.key},${l.apiKey?.user?.email},${l.endpoint},${l.responseTime}`).join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "api_logs.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const statusColor = (time: number) => {
    if (time < 200) return "rounded-full bg-[hsl(150,60%,45%)] text-white px-3 py-1"
    if (time < 500) return "rounded-full bg-[hsl(35,90%,55%)] text-white px-3 py-1"
    return "rounded-full bg-[hsl(0,70%,55%)] text-white px-3 py-1"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor and debug all API activity</p>
        </div>
        <Button onClick={exportCsv} variant="outline"><Download className="mr-2 h-4 w-4" />Export CSV</Button>
      </div>

      <Card className="border-l-4 border-l-[hsl(280,60%,55%)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Response Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No logs yet. Start making API calls to see logs here.
                  </TableCell>
                </TableRow>
              )}
              {logs.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs">{new Date(l.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-xs">{l.apiKey?.key}</TableCell>
                  <TableCell>{l.apiKey?.user?.email}</TableCell>
                  <TableCell className="font-mono text-xs">{l.endpoint}</TableCell>
                  <TableCell><Badge className={statusColor(l.responseTime)}>{l.responseTime}ms</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApiLogs;