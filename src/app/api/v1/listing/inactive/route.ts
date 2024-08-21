import { NextRequest } from "next/server";
import Listing from "@/models/ListingSchema";
import dbConnect from "@/utils/dbConnect";
export async function GET(req:NextRequest){

    await dbConnect();
    try{



        let listings=await Listing.find({listed:false,draft:false});
        return new Response(JSON.stringify({


            status:"success",

            message:"This is the list of inactive listings",
            data:{
                listings
            
            }
        }),{status:200});


        
    }catch(err:any){

        return new Response(JSON.stringify({message:err.message}),{status:500});

    }



}