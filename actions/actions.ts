"use server"

import { revalidatePath } from "next/cache"

import {storeInGoogleDrive} from "../src/utils/googleDriveImageUploader"
import dbConnect from "@/utils/dbConnect"
import ListingSchema from "@/models/ListingSchema"
import { Value } from "@radix-ui/react-select"




export const addData=async (data:FormData)=>{


    await dbConnect();

    let submissionData= {
        name:"",
        description:"",
        images:[] as any[],
        quantity:0,
        primaryImage:{} as any,
        tags:[] as string[],
        material:[] as string[],
        priceIndia:0,
        priceEverywhereElse:0,
        indiaDiscount:0,
        everywhereElseDiscount:0,
        variationPriceVary:false,
        variationQuantityVary:false,
        variationSKUVary:false,
        variantsLabels:[] as string[],
        variantInfo:[] as Object[],
        reviews:[],
        views:0,
        rating:0,
        soldQuantity:0,
        draft:true ,
        listed:false,
        returnable:false,
        occassion:[] as string[],
        category:"",
        featured:false,
        featuredCategory:"",
    }

    


    submissionData={...submissionData,
         name:data.get('name') as string,
        description:data.get('description') as string,
        images:[],
        quantity:parseInt(data.get('quantity') as string),
        primaryImage:" " as string,
        tags:(data.get('tags') as string).split(","),
        material:(data.get('material') as string).split(","),
        priceIndia:parseInt(data.get('priceIndia') as string),
        priceEverywhereElse:parseInt(data.get('priceEverywhereElse') as string),
        indiaDiscount:parseInt(data.get('indiaDiscount') as string),
        everywhereElseDiscount:parseInt(data.get('everywhereElseDiscount') as string),
        variantInfo:[] as any[],
        variationPriceVary:data.get('variationPriceVary')=="true"?true:false,
        variationQuantityVary:data.get('variationQuantityVary')=="true"?true:false,
        variationSKUVary:data.get('variationSKUVary')=="true"?true:false,
        variantsLabels:(data.get('variantsLabels') as string).split(","),
        reviews:[],
        views:0,
        rating:0,
        soldQuantity:0,
        draft:true ,
        listed:false,
        returnable:data.get('returnable')=="true"?true:false,
        occassion:(data.get('occassion') as string).split(","),
        category:data.get('category') as string,
        featured:data.get('featured')=="true"?true:false,
        featuredCategory:data.get('featuredCatgory') as string
    }



    
    let listing=await ListingSchema.create(submissionData)
    

    let listingId=listing._id


    let images=[] as Buffer[]
    let imagesUrls=[] as any[]

    const imageURLMapping ={ } as any

    let primaryImagefileIndex=0 as number;
    for (let i=0;i<parseInt(data.get('numImages') as string);i++){

        const file:File | null=data.get(`file-${i+1}`) as File;

        

        

        const bytes=await file.arrayBuffer()
        const buffer=Buffer.from(bytes)

        const primaryBytes=await (data.get('primaryImage') as File).arrayBuffer()
        const primaryImageBuffer=Buffer.from(primaryBytes)

        if(buffer.equals(primaryImageBuffer)){
            primaryImagefileIndex=i
        }

        images.push(buffer)


            
        const res=await storeInGoogleDrive(listingId.toString(),`Img-${i+1}`,buffer);
        imagesUrls.push(res)
        imageURLMapping[`file-${i+1}`]=res
        
    }


    const variantObj=JSON.parse(data.get('variantInfo') as string).map((variant :any)=>{
        return {...variant,variants:variant.variants.map((value : any)=>({...value,image:imageURLMapping[value.image]}))}
    })


    
    
    

    let updatedListing=await ListingSchema.updateOne({_id:listingId},{
        images:imagesUrls,
    primaryImage:imagesUrls[primaryImagefileIndex].webViewLink,
    variantInfo:variantObj
    },{new:true})



    console.log("Listing Created Successfully!")


    revalidatePath("/listings/newListing")


}