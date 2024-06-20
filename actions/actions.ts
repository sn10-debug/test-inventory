"use server"

import { revalidatePath } from "next/cache"

import {storeInGoogleDrive} from "../src/utils/googleDriveImageUploader"
import dbConnect from "@/utils/dbConnect"
import ListingSchema from "@/models/ListingSchema"




export const addData=async (data:FormData)=>{


    await dbConnect();

    let images=[] as Buffer[]


    for (let i=0;i<parseInt(data.get('numImages') as string);i++){

        const file:File | null=data.get(`file-${i+1}`) as File;


        const bytes=await file.arrayBuffer()
        const buffer=Buffer.from(bytes)


        images.push(buffer)

        

    }



    // Now Make the listing after storing the images


    // let listing=await ListingSchema.create({






    // Folder Name is the Product Id 
    //  const res=await storeInGoogleDrive("Shakti","Img-1",buffer);
    //  console.log(res)


    revalidatePath("/listings/newListing")


}