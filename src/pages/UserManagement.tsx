import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number
  email: string
  planType: string
  createdAt: string
  _count: { apiKeys: number }
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:3000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(console.error)
  }, [])

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const planStyle = (p: string) => {
    if (p === "free") return "rounded-full bg-slate-100 text-slate-600 border border-slate-300 px-3 py-1 font-medium dark:bg-slate-700 dark:text-slate-200"
    if (p === "premium") return "rounded-full bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1 font-medium"
    if (p === "pro") return "rounded-full bg-purple-100 text-purple-700 border border-purple-300 px-3 py-1 font-medium"
    return "rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 font-medium"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor all registered users</p>
        </div>
        <span className="rounded-full bg-green-100 text-green-700 border border-green-200 px-3 py-1 text-sm font-medium">
          {users.length} Total Users
        </span>
      </div>

      <Input
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />

      <Card className="border-l-4 border-l-[hsl(210,70%,55%)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>API Keys</TableHead>
                <TableHead>Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge className={planStyle(u.planType)}>{u.planType}</Badge></TableCell>
                  <TableCell>{u._count.apiKeys}</TableCell>
                  <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserManagement;