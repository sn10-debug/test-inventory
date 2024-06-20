"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { addData } from "../../../actions/actions";

interface FileWithStatus {
  file: File;
  approved: boolean;
}

// Define the Zod schema
const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
        approved: z.boolean(),
      })
    )
    .min(1, "At least one approved image is required")
    .refine((files) => files.some((file) => file.approved), {
      message: "At least one approved image is required",
    }),
});

export function NewListingForm() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        approved: false,
      }));

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        setValue("files", updatedFiles);
        return updatedFiles;
      });
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      setValue("files", updatedFiles);
      return updatedFiles;
    });
  };

  const handleApprove = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.map((file, i) =>
        i === index ? { ...file, approved: !file.approved } : file
      );
      setValue("files", updatedFiles);
      return updatedFiles;
    });
  };

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    const approvedFiles = data.files.filter((file: FileWithStatus) => file.approved);
    console.log("Approved files:", approvedFiles);
    const formData = new FormData();
  
    approvedFiles.forEach((file: FileWithStatus, i: number) => {
      formData.append(`file-${i + 1}`, file.file);
    });
  
    formData.append("numImages", approvedFiles.length.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    try {
      const response = await addData(formData);
      console.log('Form submitted successfully', response);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">About</CardTitle>
              <CardDescription>Tell the world all about your item and why they'll love it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Title*</CardTitle>
                  <CardDescription>Include keywords that buyers would use to search for this item.</CardDescription>
                </div>
                <Textarea placeholder="Enter title" {...register("title")} />
                {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}
              </div>
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Photo and video*</CardTitle>
                  <CardDescription>Add up to 10 photos and 1 video</CardDescription>
                </div>
                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                />
                {errors.files && <p className="text-red-500">{String(errors.files.message)}</p>}
                <div className="mt-4 space-y-4">
                  {files.map((fileWithStatus, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {fileWithStatus.file.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(fileWithStatus.file)}
                            alt="preview"
                            className="h-16 w-16 object-cover"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(fileWithStatus.file)}
                            className="h-16 w-16 object-cover"
                            controls
                          />
                        )}
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 hover:bg-red-700"
                      >
                        Remove
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleApprove(index)}
                        className={`${
                          fileWithStatus.approved
                            ? "bg-green-500 hover:bg-green-700"
                            : "bg-gray-500 hover:bg-gray-700"
                        }`}
                      >
                        {fileWithStatus.approved ? "Approved" : "Approve"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Description*</CardTitle>
                  <CardDescription>What makes your item special?</CardDescription>
                </div>
                <Textarea placeholder="Enter Description" {...register("description")} />
                {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
              </div>
            </CardContent>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Price & Inventory</CardTitle>
              <CardDescription>Set a price for your item and indicate how many are available for sale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Price*</CardTitle>
                </div>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 ">
                  <div>
                    <label>India</label>
                    <Input placeholder="Enter Price" type="number" />
                  </div>
                  <div>
                    <label>Everywhere else</label>
                    <Input placeholder="Enter Price" type="number" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <CardTitle>Quantity*</CardTitle>
              </div>
              <div className="flex sm:w-2/4 md:w-1/4">
                <Input placeholder="Enter Quantity" type="number" />
              </div>
              <div className="space-y-2 mb-2">
                <CardTitle>SKU*</CardTitle>
              </div>
              <div className="flex sm:w-2/4 md:w-1/4">
                <Input placeholder="Enter SKU" />
              </div>
            </CardContent>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Variations</CardTitle>
              <CardDescription>Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.</CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Detail</CardTitle>
              <CardDescription>Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.</CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Shipping</CardTitle>
              <CardDescription>Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.</CardDescription>
            </CardHeader>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
