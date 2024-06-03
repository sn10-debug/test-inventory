"use client"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import jsonData from "@/data/componentsData.json"
const promoCode = () => {
    const { regions,promoCode } = jsonData
  return (
    <Card>
      <CardHeader>
            <CardTitle>Create a promo code</CardTitle>
            <CardDescription>
              Manage your promo code settings here. These settings will apply to
              all.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          {promoCode.map((item)=>(
            <div className="space-y-1">
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
                      <SelectGroup>
                      <SelectLabel>{item.label}</SelectLabel>
                      {item.countries.map((item)=>(
                      <SelectItem value={item.value}>{item.label}</SelectItem>
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