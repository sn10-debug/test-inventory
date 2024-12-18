import { NextRequest, NextResponse } from 'next/server';
import dbConnect  from '@/utils/dbConnect';
import Listing from '@/models/ListingSchema';

export const revalidate = 0;


export async function GET(req: NextRequest,{params}:any) {

    await dbConnect();
    try {
      // const {category,limit=20,offset=0}=params;

      console.log("Getting Listings.... ")
        const listings =await Listing.find({})
        // .limit(parseInt(limit)).skip(parseInt(offset));
        console.log("Listing Received")

        return new Response(JSON.stringify(listings), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
        

       
      } catch (err:any) {

        
        return new Response(JSON.stringify({
          status: "failed",
          message: err.message,
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        
      }
}



