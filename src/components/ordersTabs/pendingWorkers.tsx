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
import { Input } from "@/components/ui/input"
import "filepond/dist/filepond.min.css";

import Image from "next/image"
import jsonData from "@/data/orders.json"
import Link from "next/link";

const useReady = () => {   
  const data=jsonData;
  const [files, setFiles] = useState([]);
  let pond: any = null;
  return (
    
    <Card className="p-[20px] space-y-4">
    {data.pendingOrders.map((item:any) => (
      <Card key={item.id}>
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
          <CardContent key={item.id} className="flex flex-row space-x-4 justify-around items-center">      
          <Image src={product?.image} alt={""} width={100} height={100} />     
            <div className="flex flex-col space-y-2">
            <CardDescription>{product.productName}</CardDescription>
              <div className="flex justify-between">
                <CardDescription>Sku:{product.sku}</CardDescription>
                <CardDescription> Qty:{product.quantity} </CardDescription>
                <CardDescription>Category:{product.category}</CardDescription>
              </div>
              <div className="flex justify-between space-x-4">
                <CardDescription className="flex flex-row space-x-2"><p>Weight:</p> <Input type="number" min={0}></Input></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>length:</p> <Input type="number" min={0}></Input></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>width:</p> <Input type="number" min={0}></Input></CardDescription>
                <CardDescription className="flex flex-row space-x-2"><p>height:</p> <Input type="number" min={0}></Input></CardDescription>
              </div>
             </div>
            <div className="grid w-[103px]  ">
            <FilePond
                      files={files}
                      credits={false}
                      ref={(ref) => {
                        pond = ref;
                      }}
                      required
                      acceptedFileTypes={["application/pdf", "image/*"]}
                      fileValidateTypeDetectType={(source, type) =>
                        new Promise((resolve, reject) => {
                          resolve(type);
                        })
                      }
                      allowFileEncode
                      allowImageTransform
                      imagePreviewHeight={400}
                      imageCropAspectRatio={"1:1"}
                      imageResizeTargetWidth={100}
                      imageResizeTargetHeight={100}
                      imageResizeMode={"cover"}
                      imageTransformOutputQuality={50}
                      imageTransformOutputQualityMode="optional"
                      imageTransformBeforeCreateBlob={(canvas: unknown) =>
                        new Promise((resolve) => {
                          const ctx = (canvas as HTMLCanvasElement).getContext("2d");
                          if (ctx) {
                            ctx.font = "48px serif";
                          }
                          if (ctx) {
                            ctx.fillText("Hello world", 10, 50);
                          }

                          console.log("imageTransformBeforeCreateBlob", ctx, canvas);
                          resolve(canvas);
                        })
                      }
                      imageTransformAfterCreateBlob={(blob: unknown) =>
                        new Promise((resolve) => {
                          console.log("imageTransformAfterCreateBlob", blob);
                          resolve(blob);
                        })
                      }
                      instantUpload={false}
                      allowMultiple={true}
                      maxFiles={10}
                      server="https://httpbin.org/post"
                      name="files"
                      labelIdle='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    '
                    />   
            </div>
          </CardContent>
          ))
}
                          
          <CardFooter className="flex justify-end">
            <Button>confirm</Button>
          </CardFooter></Card>
          ))}
        </Card>
  )
}
export default useReady