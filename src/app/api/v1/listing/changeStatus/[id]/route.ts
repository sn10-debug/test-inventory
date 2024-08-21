import dbConnect  from "@/utils/dbConnect";
import Listing  from "@/models/ListingSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest,{params}:any) {
  await dbConnect();
    try {

        const {id} =params;
        let body =await req.json()
        const listingDetails = body.listing;
        let listing = await Listing.findById(
          id);

          console.log(listing.draft)
        

          
        


        if(body.status==="active"){
          
             listing=await Listing.updateOne(
                { _id: id },
                { $set: { draft:false,listed:true } },
                {new:true}
            );
        }
        else{

          listing =await Listing.updateOne(
            { _id: id },
            { $set: { draft:true,listed:false } },
            {new:true}
        );
        }



        return new Response(JSON.stringify({
            status: "success",
            message: "Listing updated Successfully",
            listing,
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        
      } catch (err:any) {
        return NextResponse.json({
          message: err.message,
        });
      }
    }

