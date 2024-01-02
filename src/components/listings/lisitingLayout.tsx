"use client";   
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import ListingCards from "./listingCards";
import ListingManager from "./listingManager";
  
  export function Listing() {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full items-center justify-center p-6">
            <ListingCards/>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <ListingManager/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
  