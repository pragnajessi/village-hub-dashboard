import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockUsers } from "@/lib/mock-data";

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchPlan = planFilter === "all" || u.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const handleAction = (id: string, action: "Approve" | "Suspend" | "Delete") => {
    if (action === "Delete") {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted");
    } else {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: action === "Approve" ? "Active" : "Suspended" } : u)));
      toast.success(`User ${action.toLowerCase()}d`);
    }
  };

  const statusStyle = (s: string) => {
    if (s === "Active") return "rounded-full bg-[hsl(150,60%,45%)] text-white px-3 py-1 font-medium";
    if (s === "Pending") return "rounded-full bg-[hsl(35,90%,55%)] text-white px-3 py-1 font-medium";
    return "rounded-full bg-[hsl(0,70%,55%)] text-white px-3 py-1 font-medium";
  };

  const planStyle = (p: string) => {
    if (p === "Free") return "rounded-full bg-slate-100 text-slate-600 border border-slate-300 px-3 py-1 font-medium dark:bg-slate-700 dark:text-slate-200";
    if (p === "Premium") return "rounded-full bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1 font-medium dark:bg-blue-900 dark:text-blue-200";
    if (p === "Pro") return "rounded-full bg-purple-100 text-purple-700 border border-purple-300 px-3 py-1 font-medium dark:bg-purple-900 dark:text-purple-200";
    return "rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 font-medium dark:bg-yellow-900 dark:text-yellow-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and monitor all registered users</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-green-100 text-green-700 border border-green-200 px-3 py-1 text-sm font-medium dark:bg-green-900 dark:text-green-200">{users.filter(u => u.status === "Active").length} Active</span>
          <span className="rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 px-3 py-1 text-sm font-medium dark:bg-yellow-900 dark:text-yellow-200">{users.filter(u => u.status === "Pending").length} Pending</span>
          <span className="rounded-full bg-red-100 text-red-700 border border-red-200 px-3 py-1 text-sm font-medium dark:bg-red-900 dark:text-red-200">{users.filter(u => u.status === "Suspended").length} Suspended</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Pro">Pro</SelectItem>
            <SelectItem value="Unlimited">Unlimited</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-l-4 border-l-[hsl(210,70%,55%)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell><Badge className={planStyle(u.plan)}>{u.plan}</Badge></TableCell>
                  <TableCell><Badge className={statusStyle(u.status)}>{u.status}</Badge></TableCell>
                  <TableCell>{u.registeredDate}</TableCell>
                  <TableCell>{u.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleAction(u.id, "Approve")} disabled={u.status === "Active"}>Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => handleAction(u.id, "Suspend")} disabled={u.status === "Suspended"}>Suspend</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleAction(u.id, "Delete")}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
