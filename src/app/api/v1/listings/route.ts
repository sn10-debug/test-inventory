import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import ListingSchema from "@/models/ListingSchema";
export async function GET(req:NextRequest){

    
    try{
        await dbConnect()
    let data=await ListingSchema.find({})

    return NextResponse.json({ 
        status:200,
      data
    })
}catch(e){
    return NextResponse.json({
        status:500,
        data:e
    })
}





}