"use client"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import Image from "next/image"
import jsonData from "@/data/orders.json"
const pending = () => {
  const data=jsonData;
  return (
    
    <Card className="p-[20px] space-y-4">
    {data.pendingOrders.map((item:any) => (
      <Card>
        <CardHeader>
        <div className="flex justify-between">
            <CardDescription>{item.orderedOn}</CardDescription>
            <CardDescription>{item.orderNumber}
            </CardDescription>
            <CardDescription>{item.shipBy}
            </CardDescription>
          </div>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.address}
            </CardDescription>
          </CardHeader>
          {item.products.map((product:any) => (
          <CardContent className="flex flex-row space-x-4">      
            <Image src={product?.image} alt={""} width={100} height={100} />     
            <div className="flex flex-col space-y-2">
            <CardDescription>{product.productName}</CardDescription>
              <div className="flex justify-between">
                <CardDescription>Sku:{product.sku}</CardDescription>
                <CardDescription> Qty:{product.quantity} </CardDescription>
                <CardDescription>Category:{product.category}</CardDescription>
              </div>
            </div>
          </CardContent>
          ))
}
          <CardFooter className="flex justify-end">
            <Button>proceed</Button>
          </CardFooter></Card>
          ))}
        </Card>
  )
}
export default pending