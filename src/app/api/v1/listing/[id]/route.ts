import dbConnect  from "@/utils/dbConnect";
import Listing  from "@/models/ListingSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:any) {
  
    const {id}=params;
 
    try {

        dbConnect();
        const listings = await Listing.findById(id);

        return new Response(JSON.stringify(listings), {

            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
       
    } catch (err:any) {
      return new Response(JSON.stringify({
        error: err.message,
      }), {

        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    })
    }
}


export async function PUT(req: NextRequest,{params} : any) {
    try {

        dbConnect();
        const {id} =params;
        let body=await req.json()
        const listingDetails = body.listing;
        const listing = await Listing.findByIdAndUpdate(
          id,
          listingDetails,
          //   This returns the updated listing
          { new: true }
        );
        NextResponse.json({
          status: "success",
          message: "Listing updated Successfully",
          listing,
        });
      } catch (err:any) {
        NextResponse.json({
          message: err.message,
        });
      }

    }