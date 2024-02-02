"use client";   
import React, { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import ListingCards from "./listingCards";
import ListingManager from "./listingManager";
import jsonData from "@/data/listingData.json";
export function Listing() {
  const { listingData } = jsonData;
  const [filteredData, setFilteredData] = useState(listingData);
  const handleSearch = (filteredData: any[]) => {
    setFilteredData(filteredData);
  };
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={100}>
        <div className="flex h-full items-center justify-center p-6 flex-col space-y-2">
          <ListingCards filteredData={filteredData}  />
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={0} minSize={32} maxSize={32}>
        <div className="flex h-full p-6 flex-col">
          <ListingManager
            listingData={listingData}
            onSearch={handleSearch}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
