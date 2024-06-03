import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import Sale from "./general"
  import Promo from "./influencer"
  export default function TabsMenu() {
    return (
      <Tabs defaultValue="account" className="max-w-screen-xl mx-auto ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sale">General PromoCode</TabsTrigger>
          <TabsTrigger value="promocode">Influencer PromoCode</TabsTrigger>
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
  