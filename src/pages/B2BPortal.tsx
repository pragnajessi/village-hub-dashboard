import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Key } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: number
  key: string
  createdAt: string
}

const B2BPortal = () => {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
  const [generatedSecret, setGeneratedSecret] = useState('')

  useEffect(() => {
    if (isLoggedIn) fetchKeys()
  }, [isLoggedIn])

  const fetchKeys = async () => {
    const res = await fetch('http://localhost:3000/api/keys', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setKeys(data)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setIsLoggedIn(true)
      toast.success('Logged in successfully!')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
      setIsLoggedIn(true)
      toast.success('Registered successfully!')
    } else {
      toast.error(data.error || 'Registration failed')
    }
  }

  const generateKey = async () => {
    const res = await fetch('http://localhost:3000/api/keys/generate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (data.key) {
      setGeneratedSecret(data.secret)
      toast.success('API key generated!')
      fetchKeys()
    }
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success('Copied!')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setToken('')
    setKeys([])
  }

  if (!isLoggedIn) {
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h1 className="text-2xl font-bold text-foreground">B2B User Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Login or register to manage your API keys</p>
        </div>

        <Card className="border-l-4 border-l-[hsl(210,70%,55%)]">
          <CardHeader><CardTitle>Login / Register</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
              <div className="flex gap-2">
                <Button onClick={handleLogin} className="flex-1">Login</Button>
                <Button onClick={handleRegister} variant="outline" className="flex-1">Register</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">B2B User Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your API keys</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      {generatedSecret && (
        <Card className="border-l-4 border-l-[hsl(150,60%,45%)]">
          <CardHeader><CardTitle>⚠️ Save your secret — shown only once!</CardTitle></CardHeader>
          <CardContent>
            <p className="font-mono text-sm break-all bg-muted p-3 rounded">{generatedSecret}</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-l-4 border-l-[hsl(150,60%,45%)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your API Keys</CardTitle>
          <Button onClick={generateKey} size="sm"><Key className="h-4 w-4 mr-2" />Generate New Key</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.length === 0 && (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No API keys yet. Generate one above.</TableCell></TableRow>
              )}
              {keys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell className="font-mono text-xs">{k.key}</TableCell>
                  <TableCell>{new Date(k.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => copyKey(k.key)}><Copy className="h-3 w-3" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default B2BPortal;