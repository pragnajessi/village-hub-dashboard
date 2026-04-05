import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { toast } from "sonner";

interface Village {
  id: number
  name: string
  code: string
  subDistrict: { name: string; district: { name: string; state: { name: string } } }
}

const ContactForm = () => {
  const [villageSearch, setVillageSearch] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [villages, setVillages] = useState<Village[]>([])
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (villageSearch.length < 2) return

    const timeout = setTimeout(() => {
      fetch(`http://localhost:3000/api/v1/villages/search?q=${villageSearch}`)
        .then(res => res.json())
        .then(data => setVillages(data))
        .catch(console.error)
    }, 300)

    return () => clearTimeout(timeout)
  }, [villageSearch])

  const selectVillage = (village: Village) => {
    setSelectedVillage(village);
    setVillageSearch(village.name);
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Demo Contact Form</h1>
        <p className="text-sm text-muted-foreground mt-1">Experience the Village API autocomplete in action</p>
      </div>

      <Card className="border-l-4 border-l-[hsl(150,60%,45%)]">
        <CardHeader><CardTitle>Get in Touch</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="space-y-2"><Label htmlFor="fullName">Full Name</Label><Input id="fullName" required /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
            <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" required /></div>

            <div className="space-y-2">
              <Label>Village</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-start font-normal" onClick={() => setOpen(true)}>
                    {selectedVillage ? selectedVillage.name : "Search for a village..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Type a village name..." value={villageSearch} onValueChange={setVillageSearch} />
                    <CommandList>
                      <CommandEmpty>No village found.</CommandEmpty>
                      <CommandGroup>
                        {villages.map((v) => (
                          <CommandItem key={v.id} value={v.name} onSelect={() => selectVillage(v)}>
                            {v.name} — {v.subDistrict?.district?.name}, {v.subDistrict?.district?.state?.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Sub-District</Label><Input value={selectedVillage?.subDistrict?.name ?? ""} readOnly className="bg-muted" /></div>
              <div className="space-y-2"><Label>District</Label><Input value={selectedVillage?.subDistrict?.district?.name ?? ""} readOnly className="bg-muted" /></div>
              <div className="space-y-2"><Label>State</Label><Input value={selectedVillage?.subDistrict?.district?.state?.name ?? ""} readOnly className="bg-muted" /></div>
              <div className="space-y-2"><Label>Country</Label><Input value="India" readOnly className="bg-muted" /></div>
            </div>

            <Button type="submit" className="mt-2">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;