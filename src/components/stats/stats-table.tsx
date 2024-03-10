import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Badge } from "@/components/ui/badge"

export function StatsTable() {
  const data = [
    {
      id: 1,
      name: "Fabric remnants, sari fabric scraps, silk fabric scraps, sari trim remnants, saree border remnants, Assorted Silk Trims for DIY Junk Journal",
      views: 1141,
      cart: 41,
      orders: 6,
      revenue: 184,
      image: "/clearance-1.png",
      status: "active",
    },{
      id: 2,
      name: "Fabric remnants, sari fabric scraps, silk fabric scraps, sari trim remnants, saree border remnants, Assorted Silk Trims for DIY Junk Journal",
      views: 573,
      cart: 33,
      orders: 3,
      revenue: 47,
      image: "/clearance-2.png",
      status: "inactive",
    },
    {
      id: 3,
      name: "Net Fabric Saree Border Indian Lace Trim By The Yard, Sari Fabric Trim-Table Runner-Art Quilt fabric trim Sari Border Silk Fabric",
      views: 379,
      cart: 45,
      orders: 13,
      revenue: 61.20,
      image: "/pompom-2.png",
      status: "expired",
    },{
      id: 4,
      name: "Saree Border Indian Lace Trim By The Yard, embroidered Ribbon Sari Fabric Trim-Table Runner-Art Quilt fabric trim Sari Border Silk Fabric",
      views: 207,
      cart: 24,
      orders: 1,
      revenue: 2.25,
      image: "/pompom-3.png",
      status: "active",
    }
  ]
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Listings</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Cart</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
          <TableRow key={item.id}>
              
            <TableCell>
              <div className="flex items-center">
                <img
                  alt="Listing Image"
                  className="mr-4 "
                  src={item.image}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width={70}
                />
                <div className="space-y-4">
                  <p className="font-medium">{item.name}</p>
                  <Badge variant={item.status as "active" | "default" | "destructive" | "outline" | "secondary" | "inactive" | "expired" | null | undefined}>{item.status}</Badge>
                </div>
              </div>
            </TableCell>
            <TableCell>{item.views}</TableCell>
            <TableCell>{item.cart}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>${item.revenue}</TableCell>

           
          </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button className="w-8 h-8 flex items-center justify-center " variant="ghost">
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button className="w-8 h-8 flex items-center justify-center " variant="ghost">
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}


function ChevronLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
