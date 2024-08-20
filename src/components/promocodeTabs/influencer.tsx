"use client"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import jsonData from "@/data/componentsData.json"
const promoCode = () => {
    const { regions,influencer_promoCode : promoCode } = jsonData
  return (
    <Card>
            <CardTitle className="p-4">Create a influencer promoCode</CardTitle>

          <CardContent className="space-y-2 p-4">
          {promoCode.map((item)=>(
            <div key={item.id} className="space-y-1">
              <Label>{item.label}</Label>
              <Input type={item.type} placeholder="" />               
            </div>
            ))}
            <div className="space-y-1">
            <Label htmlFor="name">Select countries</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((item)=>(
                      <SelectGroup key={item.id}>
                      <SelectLabel>{item.label}</SelectLabel>
                      {item.countries.map((item)=>(
                      <SelectItem key={item.id} value={item.value}>{item.label}</SelectItem>
                      ))}
                    </SelectGroup>
                    ))}
                  </SelectContent>      
                </Select>
             </div>
             <div className="space-y-2">
              <Label >Validity</Label>
              <div className="flex flex-row gap-2 ">
                <div className="flex flex-col w-full space-y-2">
                    <Label >Start Date</Label>
                    <Input type="date" />
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Terms of service</Label>
              <Textarea />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Apply</Button>
          </CardFooter>
        </Card>
  )
}
export default promoCode