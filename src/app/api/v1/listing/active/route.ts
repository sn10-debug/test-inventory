import { NextRequest } from "next/server";
import dbConnect  from "@/utils/dbConnect";
import Listing  from "@/models/ListingSchema";
export async function GET(req:NextRequest){
await dbConnect();

try{

    let listings=await Listing.find({draft:false,listed:true});
    return new Response(JSON.stringify({
            
            status:"success",
    
            message:"This is the list of active listings",
            data:{
                listings
            
            }
        
        
    }),{status:200});



}catch(err:any){
    return new Response(JSON.stringify({
        message: err.message,
    }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    });
    }
}
    

