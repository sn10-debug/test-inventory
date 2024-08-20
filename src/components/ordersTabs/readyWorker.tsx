"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import "filepond/dist/filepond.min.css";

import Image from "next/image"
import jsonData from "@/data/orders.json"

const useReady = () => {   
  const data=jsonData;
  const [files, setFiles] = useState([]);
  let pond: any = null;
  return (
    
    <Card className="p-[20px] space-y-4">
    {data.pendingOrders.map((item:any) => (
      <Card key={item.id}>
        <CardHeader>
        <div className="flex">
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
          <CardContent key={item.id} className="flex flex-row space-x-4 justify-around items-center">      
          <Image src={product?.image} alt={""} width={100} height={100} />     
            <div className="flex flex-col space-y-2">
            <CardDescription>{product.productName}</CardDescription>
              <div className="flex justify-between">
                
                <CardDescription>Sku:{product.sku}</CardDescription>
                <CardDescription> Qty:{product.quantity} </CardDescription>
                <CardDescription>Category:{product.category}</CardDescription>
               </div>
               <div className="flex flex-row justify-between">
               <CardDescription className="flex flex-row space-x-2"><p>Weight:</p><p>{product.weight}</p></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>length:</p> <p>{product.length}</p></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>width:</p>{product.width} <p></p></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>height:</p> <p>{product.height}</p></CardDescription>
                </div>
                
            </div>
            
            <Image src={product?.image} alt={""} width={100} height={100} />     

                
          </CardContent>
          
          ))
          
}
        </Card>
          ))}
        </Card>
  )
}
export default useReady