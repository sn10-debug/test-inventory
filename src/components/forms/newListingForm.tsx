"use client";
import React,{useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsonData from "@/data/componentsData.json";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
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

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

export function NewListingForm() {
  const [files, setFiles] = useState([]);
  let pond: any = null;
  const { newListings } = jsonData;
  const addInput = () => {
    const inputCont = document.getElementById("input-cont");
    const input = document.createElement("input");
    input.type = "text";
    input.className =
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    input.placeholder = "New Variant";
    inputCont?.appendChild(input);
  };
  return (
    <Card>
      <CardContent className="p-8">
        {newListings.map((item) => (
          <div className="space-y-2">
          <Label className="font-bold pt-8 text-lg">{item.label}</Label>
          <div className="grid grid-cols-2 gap-2 ">
            
            {item.fields.map((field) => (
              <div>
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea />
                ) : field.type == "button" ? (
                  <div id="input-cont" className="space-y-2"></div>
                ) : field.type == "file" ? (
                  <div className="grid w-full w-full items-center gap-1.5 ">
              <FilePond
                      files={files}
                      credits={false}
                      ref={(ref) => {
                        pond = ref;
                      }}
                      required
                      acceptedFileTypes={["image/*"]}
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
                    />                  </div>
                ) : (
                  <Input type={field.type} />
                )}
              </div>
            ))}
          </div>
        </div>
        ))}
        
        <div className="mt-2 space-y-2">
          <Button onClick={() => addInput()}>+ Add variants</Button>
        </div>
      </CardContent>
    </Card>
  );
}
