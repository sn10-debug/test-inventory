"use server"

import { revalidatePath } from "next/cache"

import {storeInGoogleDrive,createFolder} from "../src/utils/googleDriveImageUploader"
import dbConnect from "@/utils/dbConnect"
import ListingSchema from "@/models/ListingSchema"
import { Value } from "@radix-ui/react-select"
import { link } from "fs"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"







export const uploadFolder=async (folder_name:string)=>{
    try{

    console.log("Creating Folder....")
    return await createFolder(folder_name);
    }catch(e){
        console.log(e)
    }
}
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
        sku:"",
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
        featuredCategory:data.get('featuredCatgory') as string,
        sku:data.get('sku') as string
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
    variantInfo:variantObj,
    },{new:true})



    console.log("Listing Created Successfully!")


    revalidatePath("/listings/newListing")


}



//   Testing the New Functionality



export const updateListingURL=async (data:any,listingId:String)=>{

    await dbConnect();
let updatedListing=await ListingSchema.updateOne({_id:listingId},{
    images:data.imagesUrls,
primaryImage:data.primaryImage,
variantInfo:data.variantObj,
videoLink:data.videoURL
},{new:true})

return updatedListing

}
export const addListing=async (data:FormData)=>{

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
        sku:"",
        color:"",
        length:0,
        width:0,
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
        featuredCategory:data.get('featuredCatgory') as string,
        sku:data.get('sku') as string,
        color:data.get('color') as string,
        length:Number(data.get('length')) as number ,
        width:Number(data.get('width')) as number,

    }



    
    let listing=await ListingSchema.create(submissionData)
    

   console.log("Listing Created Successfully! : "+` ${submissionData.name}`)



    return listing._id



}


export const uploadImage=async (data:FormData,name:string,listingId:string,folderId="")=>{


        console.log("Uploading Image....")
  
        const file:File=(data.get(name)) as File;

         const bytes=await file.arrayBuffer()
        const buffer=Buffer.from(bytes)
   
        const imageURL=await storeInGoogleDrive(listingId.toString(),name,buffer,folderId);
        console.log("Image Uploaded Successfully!")
        console.log(imageURL)

        return imageURL


}
const s3Client = new S3Client({
    region: process.env.BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  })

const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/quicktime"
  ]
  
  const maxFileSize = 1048576 * 10 // 1 MB
  
  type GetSignedURLParams = {
    fileType: string|undefined,
    fileSize: number|undefined,
    checksum: string,
    listingId:string,
    fileName:string
  }
  export async function getSignedURL({
    fileType,
    fileSize,
    checksum,listingId,fileName
  }: GetSignedURLParams) {

  
      
  
    // first just make sure in our code that we're only allowing the file types we want
    if (!allowedFileTypes.includes(fileType as string)) {
      return { failure: "File type not allowed" }
    }
  
    if ((fileType === "image/jpeg" || fileType === "image/png") && (fileSize && fileSize > maxFileSize)) {
        return { failure: "File too large" }
    }

  
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: fileName,
      ContentType: fileType,
      ContentLength: fileSize,
      ChecksumSHA256: checksum,
      // Let's also add some metadata which is stored in s3.
      Metadata: {
        listingId
      },
    })
  
  // ...
  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  )

  return {success: {url}}
} 