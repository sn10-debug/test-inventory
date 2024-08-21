import { NextRequest, NextResponse } from 'next/server';
import dbConnect  from '@/utils/dbConnect';
import Listing from '@/models/ListingSchema';
export async function GET(req: NextRequest,{params}:{params:{category:string,limit:number,offset:number}}) {
    const {category,limit,offset}=params;
    await dbConnect();


    const listings=await Listing.find({category:{$in :[category]}}).limit((limit)).skip((offset)).exec();

    return NextResponse.json({
        success:true,
        data:listings,
        category:category
    });





    return NextResponse.next();
}
