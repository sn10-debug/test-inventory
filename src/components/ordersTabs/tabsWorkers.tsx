import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import Pending from "./pendingWorkers"
  import Ready from "./readyWorker"
  export default function TabsMenu() {
    return (
      <Tabs defaultValue="account" className="max-w-screen-xl mx-auto ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sale">Pending Orders</TabsTrigger>
          <TabsTrigger value="promocode">Ready to ship</TabsTrigger>
        </TabsList>
        <TabsContent value="sale">
          <Pending/>
        </TabsContent>
        <TabsContent value="promocode">
          <Ready/>
        </TabsContent>
      </Tabs>
    )
  }
  