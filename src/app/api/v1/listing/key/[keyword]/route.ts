import { NextRequest, NextResponse } from 'next/server';
import dbConnect  from '@/utils/dbConnect';
import Listing from '@/models/ListingSchema';

export async function GET(req: NextRequest,{params}:{params:{keyword:string,limit:number,offset:number}}) {

    try{
    let {keyword,limit,offset}=params;

    limit = limit || 10;
    offset = offset || 0;
    await dbConnect();

    const listings=await Listing.find({title:{$regex:keyword,$options:'i'}}).limit((limit)).skip((offset)).exec();


    return NextResponse.json({
        success:true,
        data:listings,
        keyword:keyword
    });

}catch(err:any){
    return new Response(JSON.stringify({
        status: "failed",
        message: err.message,
    }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
    });
    }}





