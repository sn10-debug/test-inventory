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
import { addData } from "../../../actions/actions";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { redirect } from "next/dist/server/api-utils";
interface FileWithStatus {
  file: File;
  approved: boolean;
  primary:boolean;
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
  indiaPrice: z.string().min(1, "Price must be greater than 0"),
  everywherePrice: z.string().min(1, "Price must be greater than 0"),
  quantity: z.string().min(1, "Quantity must be greater than 0"),
  sku: z.string().min(1, "SKU required"),
  tags: (z.string().refine((tags) => tags.split(",").length > 0, { message: "At least one tag is required" })),
  material: (z.string().refine((material) => material.split(",").length > 0, { message: "At least one material is required" })),
  indiaDiscount:z.string().min(0,"Discount should be greater than 0"),
  everywhereElseDiscount:z.string().min(0,"Discount should be greater than 0"),
  category:z.enum(["Trims & Laces","Fabrics","Appliqué","Tassels & Latkans"]),
  occassion:z.enum(["Diwali","Christmas","St. patricks day","Holi",""]).nullish(),
});

type FormFields = z.infer<typeof schema>;

export function NewListingForm() {
  const router = useRouter();
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [variations, setVariations] = useState<{
    type: string;
    values: { value: string; image: FileWithStatus | null; price: string; quantity: string; sku: string; }[];
    images: boolean;
    prices: boolean;
    quantity: boolean;
    skus: boolean;
  }[]>([]);
  const [newVariation, setNewVariation] = useState({
    type: "",
    values: [] as { value: string; image: FileWithStatus | null; price: string; quantity: string; sku: string; }[],
    images: false,
    prices: false,
    quantity: false,
    skus: false,
  });

  const [primaryImage,setPrimaryImage]=useState<FileWithStatus | null>(null); 
  const [category,setCategory]=useState<string>("");
  const [featured,setFeatured]=useState<boolean>(false);
  const [returnListing,setReturnListing] =useState<boolean>(false);
  const [approvedImages, setApprovedImages] = useState<FileWithStatus[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors,isSubmitting},
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        approved: false,
        primary: false,
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
      
      // Update approvedImages
      const newApprovedImages = updatedFiles.filter(file => file.approved);
      setApprovedImages(newApprovedImages);
      
      return updatedFiles;
    });
  };
  const handleAddVariation = () => {
    setShowModal(true);
  };

  const handleVariationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVariation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVariationValue = () => {
    setNewVariation((prev) => ({
      ...prev,
      values: [...prev.values, { value: "", image: null, price: "", quantity: "", sku: "" }],
    }));
  };

  const handleVariationValueChange = (
    index: number,
    key: keyof typeof newVariation.values[0],
    value: string | FileWithStatus
  ) => {
    setNewVariation((prev) => {
      const updatedValues = [...prev.values];
      updatedValues[index] = {
        ...updatedValues[index],
        [key]: value,
      };
      return { ...prev, values: updatedValues };
    });
  };
  

  const handleRemoveVariationValue = (index: number) => {
    setNewVariation((prev) => {
      const updatedValues = prev.values.filter((_, i) => i !== index);
      return { ...prev, values: updatedValues };
    });
  };

  const handleToggle = (key: keyof typeof newVariation) => {
    setNewVariation((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  const handleFileUploadForValue = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileWithStatus = { file, approved: false, primary: false };
      handleVariationValueChange(index, 'image', fileWithStatus);
    }
  };

  const [editingVariationIndex, setEditingVariationIndex] = useState<number | null>(null);

  const handleEditVariation = (index: number) => {
    setNewVariation(variations[index]);
    setEditingVariationIndex(index);
    setShowModal(true);
  };
  
  const handleCancelEdit = () => {
    setShowModal(false);
    setNewVariation({ type: "", values: [], images: false, prices: false, quantity: false, skus: false });
    setEditingVariationIndex(null);
  };
  
  const handleDone = () => {
    if (editingVariationIndex !== null) {
      setVariations((prev) => {
        const updatedVariations = [...prev];
        updatedVariations[editingVariationIndex] = newVariation;
        return updatedVariations;
      });
    } else {
      setVariations((prev) => [...prev, newVariation]);
    }
    setNewVariation({ type: "", values: [], images: false, prices: false, quantity: false, skus: false });
    setShowModal(false);
    setEditingVariationIndex(null);
  };

  const handleRemoveVariation = (index: number) => {
    setVariations((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrimary=(index:Number)=>{

    if(primaryImage){
      setPrimaryImage(null);
    }
    
   
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.map((file, i) =>


        {
        if (i === index) {
          
          if(!file.primary) setPrimaryImage({ ...file, primary: !file.primary })
          
          return{ ...file, primary: !file.primary } }
          
          else return file
        }
      );
      setValue("files", updatedFiles);
      return updatedFiles;
    });
  }

  const onSubmit = async (data:any) => {

    

    const approvedFiles = data.files.filter((file:FileWithStatus) => file.approved);
    const primaryFile = data.files.find((file:FileWithStatus) => file.primary);
    const formData = new FormData();
    let image_mapping={} as any;

    approvedFiles.forEach((file: FileWithStatus, i: number) => {
      formData.append(`file-${i + 1}`, file.file);
      image_mapping[file.file.name]=`file-${i+1}`;
    });

    let variantionObj=variations.map((variation)=>({label:variation.type,
      images:variation.images,
      skus:variation.skus,
      prices:variation.prices,
      quantity:variation.quantity,
      variants:variation.values.map((value:any)=>{
      return {...value,image:image_mapping[value.image.file.name]}
    })}));

    console.log(variantionObj)


    formData.append("primaryImage", primaryImage ? primaryImage.file : "");
    formData.append("category",category);
    formData.append("numImages", approvedFiles.length.toString());
    formData.append("name", data.title);
    formData.append("description", data.description);
    formData.append("priceIndia", data.indiaPrice.toString());
    formData.append("priceEverywhereElse", data.everywherePrice.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("sku", data.sku);
    formData.append("category", data.category);
    formData.append("tags", JSON.stringify(data.tags.split(",")));
    formData.append("material", JSON.stringify(data.material.split(",")));
    formData.append("indiaDiscount",data.indiaDiscount.toString());
    formData.append("everywhereElseDiscount",data.everywhereElseDiscount.toString());
    formData.append("variantInfo",JSON.stringify(variantionObj));
    formData.append("featured",featured.toString());
    formData.append("returnable",returnListing.toString());
    formData.append("occassion",data.occassion);
    formData.append("variationPriceVary",variations.some((variation)=>variation.prices).toString());
    formData.append("variationQuantityVary",variations.some((variation)=>variation.quantity).toString());
    formData.append("variationSKUVary",variations.some((variation)=>variation.skus).toString());
    formData.append("variantsLabels", variations.map((variation)=>variation.type).join(","));
    console.log("Form data:", formData);



    try {
      const response = await addData(formData);
      console.log('Form submitted successfully', response);
      alert("Form submitted successfully");
      router.push("/listings")



  
      
    } catch (error) {
      alert("Error submitting form");
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
              <CardDescription>Tell the world all about your item and why they&apos;ll love it.</CardDescription>
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
                        {fileWithStatus.approved && (!primaryImage ? !primaryImage : fileWithStatus.primary) ?
                      <Button
                        type="button"
                        onClick={() => handlePrimary(index)}
                        className={`${
                          !fileWithStatus.primary
                            ? "bg-green-500 hover:bg-green-700"
                            : "bg-gray-500 hover:bg-gray-700"
                        }`}
                      >
                        { fileWithStatus.primary ? "Remove as Primary" : "Make Primary" }
                      </Button> : ""}
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
                    <Input placeholder="0"   {...register("indiaPrice")} type="number" />
                    {errors.indiaPrice && <p className="text-red-500">{String(errors.indiaPrice.message)}</p>}

                  </div>
                  <div>
                    <label>Everywhere else</label>
                    <Input placeholder="0" {...register("everywherePrice")} type="number" />
                    {errors.everywherePrice && <p className="text-red-500">{String(errors.everywherePrice.message)}</p>}

                  </div>
                  <div>
                    <label>India Discount</label>
                    <Input placeholder="Enter India Discount"  {...register("indiaDiscount")} type="number" />  
                    {errors.indiaDiscount && <p className="text-red-500">{String(errors.indiaDiscount.message)}</p>}

                  </div>

                  <div>
                    <label>Everywhere else Discount</label>
                    <Input placeholder="Enter other Countries Discount"  {...register("everywhereElseDiscount")} type="number" />
                    {errors.everywhereElseDiscount && <p className="text-red-500">{String(errors.everywhereElseDiscount.message)}</p>}

                  </div>    
                </div>
              </div>
              <div className="space-y-2 mb-2">
                <CardTitle>Quantity*</CardTitle>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity*</Label>
                <Input placeholder="Enter Quantity" {...register("quantity")} type="number" />
                {errors.quantity && <p className="text-red-500">{String(errors.quantity.message)}</p>}
              </div>
              <div>
                <Label htmlFor="sku">SKU (Stock Keeping Unit)*</Label>
                <Input type="text" placeholder="Enter SKU" {...register("sku")} />
                {errors.sku && <p className="text-red-500">{String(errors.sku.message)}</p>}
              </div>
            </CardContent>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Variations</CardTitle>
              <CardDescription>Manage variations like color, size, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {variations.map((variation, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <CardTitle>{variation.type}</CardTitle>
                    <div className="space-x-2">
                      <Button variant="outline" type="button" onClick={() => handleEditVariation(index)}>Edit</Button>
                      <Button variant="outline" type="button" onClick={() => handleRemoveVariation(index)}>Remove</Button>
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    {variation.values.map((value, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <p>{value.value}</p>
                        {variation.images && value.image && (
                              <img 
                                src={URL.createObjectURL(value.image.file)} 
                                alt="Variation" 
                                className="h-10 w-10 object-cover" 
                              />
                            )}                        
                        {variation.prices && <p>Price: {value.price}</p>}
                        {variation.quantity && <p>Quantity: {value.quantity}</p>}
                        {variation.skus && <p>SKU: {value.sku}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Button type="button" onClick={handleAddVariation}>Add Variation</Button>
            </CardContent>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Detail</CardTitle>
              <CardDescription>Share a few more specifics about your item to make it easier to find in search, and to help buyers know what to expect.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div >
                <div className="space-y-2 mb-2">
                  <CardTitle>Category*</CardTitle>
                </div>
               

<select {...register("category")} className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none">
        
         <option value={" "} defaultChecked={true}>Select a Category</option>
        <option value={"Appliqué"}>Appliqué</option>
        <option value={"Trims & Laces"}>Trims & Laces </option>
        <option value={"Fabrics"}>Fabrics</option>
        <option value={"Tassels & Latkans"}>Tassels & Latkans</option>
      </select>
      {errors.category && <p className="text-red-500">{String(errors.category.message)}</p>}
              </div>
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Tags</CardTitle>
                </div>
                <Textarea placeholder="shape, style, color, function etc." {...register("tags")} />
              </div>
              <div>
                <div className="space-y-2 mb-2">
                  <CardTitle>Material</CardTitle>
                </div>
                <Textarea placeholder="Ingridients, components etc." {...register("material")} />
              </div>
            </CardContent>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-8">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">Settings</CardTitle>
              <CardDescription>Choose how this listing will display in your shop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex space-x-4">
                  <CardTitle>Featured Listing</CardTitle>
                <Switch checked={featured} onCheckedChange={(val:boolean)=>{
                  setFeatured(val);
                }} />
              </div>
              <div className="flex space-x-4">
                  <CardTitle>Return available</CardTitle>
                <Switch checked={returnListing} onCheckedChange={(val:boolean)=>{
                  setReturnListing(val);
                }} />
              </div>

              
              <div className="flex flex-row items-center space-x-4">
                <div >
                  <CardTitle>Occassion</CardTitle>
                </div>             
              


                <select {...register("occassion")} className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none">
        
             <option value={""} defaultChecked={true}>Select a Occasion</option>
            <option value={"Diwali"}>Diwali</option>
            <option value={"Christmas"}>Christmas</option>
            <option value={"St. patricks day"}>St. patricks day</option>
            <option value={"Holi"}>Holi</option>
            </select>
                </div>
            </CardContent>
          </CardContent>
          </Card>
       
        <div className="flex justify-end space-x-4">
          <Button variant={'outline'}>Save as Draft</Button>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." :"Submit"}</Button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md space-y-4">
            <h2 className="text-xl font-bold">Add Variation</h2>
            <Input placeholder="Variation Type" value={newVariation.type} name="type" onChange={handleVariationChange} />
            <Button type="button" onClick={handleAddVariationValue}>Add Value</Button>

            <div className="mt-4 space-y-4">
              {newVariation.values.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input placeholder="Value" value={value.value} onChange={(e) => handleVariationValueChange(index, "value", e.target.value)} />
                  {newVariation.images && (
                      <select 
                        value={value.image ? value.image.file.name : ""}
                        onChange={(e) => {
                          const selectedImage = approvedImages.find(img => img.file.name === e.target.value);
                          handleVariationValueChange(index, "image", selectedImage ?? '');
                        }}
                      >
                        <option value="">Select an image</option>
                        {approvedImages.map((img, i) => (
                          <option key={i} value={img.file.name}>{img.file.name}</option>
                        ))}
                      </select>
                    )}
                  {newVariation.prices && (
                    <Input type="number" placeholder="Price" value={value.price} onChange={(e) => handleVariationValueChange(index, "price", e.target.value)} />
                  )}
                  {newVariation.quantity && (
                    <Input type="number" placeholder="Quantity" value={value.quantity} onChange={(e) => handleVariationValueChange(index, "quantity", e.target.value)} />
                  )}
                  {newVariation.skus && (
                    <Input type="text" placeholder="SKU" value={value.sku} onChange={(e) => handleVariationValueChange(index, "sku", e.target.value)} />
                  )}
                  <Button variant="outline" type="button" onClick={() => handleRemoveVariationValue(index)}>Remove</Button>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" type="button" onClick={() => handleToggle('images')}>
                {newVariation.images ? 'Disable Images' : 'Enable Images'}
              </Button>
              <Button variant="outline" type="button" onClick={() => handleToggle('prices')}>
                {newVariation.prices ? 'Disable Prices' : 'Enable Prices'}
              </Button>
              <Button variant="outline" type="button" onClick={() => handleToggle('quantity')}>
                {newVariation.quantity ? 'Disable Quantity' : 'Enable Quantity'}
              </Button>
              <Button variant="outline" type="button" onClick={() => handleToggle('skus')}>
                {newVariation.skus ? 'Disable SKUs' : 'Enable SKUs'}
              </Button>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" onClick={handleCancelEdit}>Cancel</Button>
              <Button type="button" onClick={handleDone}>Done</Button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
}
