"use client"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import jsonData from "@/data/componentsData.json"
const pending = () => {
  return (
    <Card>
      <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent >
          </CardContent>
          <CardFooter>
            <Button>Apply</Button>
          </CardFooter>
        </Card>
  )
}
export default pending