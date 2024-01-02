import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Sale from "./sale"
import Promo from "./promoCode"
export default function TabsMenu() {
  return (
    <Tabs defaultValue="account" className="max-w-screen-xl mx-auto ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sale">Sale</TabsTrigger>
        <TabsTrigger value="promocode">Promo Code</TabsTrigger>
      </TabsList>
      <TabsContent value="sale">
        <Sale/>
      </TabsContent>
      <TabsContent value="promocode">
        <Promo/>
      </TabsContent>
    </Tabs>
  )
}
