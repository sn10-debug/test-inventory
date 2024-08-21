import { NextRequest } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/OrderSchema";
import Bill from "@/models/BillSchema";
import { getToken } from "next-auth/jwt";
import Listing from "@/models/ListingSchema";
import Coupon from "@/models/CouponSchema";
export async function POST(req:NextRequest){

    await dbConnect();

    try{

        const body=await req.json()

        // Get the next Auth token
        // Get the user ID from the token
        const token=await getToken({req,secret:process.env.NEXTAUTH_SECRET});
        
            // ProdDetails
    
            /* { 
                product_id,
                quantity,
                price
            
            }*/
        const {productDetails,deliveryAddress,total,discounts,couponsUsed}=body;


        // Check for the Product Quantity

            let productQuantityCheck=productDetails.map(async (prod)=>{
                const product=await Listing.findById(prod.product_id);
                if(product){
                    if(product.quantity<prod.quantity){
                        throw new Error(`Quantity of ${product.title} is not available`)
                    }
                }
            }
            ) as any[];

            await Promise.all(productQuantityCheck);

            let availabilityStatus=productQuantityCheck.every((prod)=>prod==true);

            if(!availabilityStatus){
                throw new Error("Product Quantity not available")
            }





            


        // Check for the Coupon



        let couponDB=await Coupon.find({code:couponsUsed});

        let couponCheck=true;

        if(couponDB){
            if(couponDB.validFrom>new Date()){
                couponCheck=false;
                throw new Error("Coupon is not valid yet")
            }
            if(couponDB.validTill<new Date()){
                couponCheck=false;
                throw new Error("Coupon has expired")
            }
            if(couponDB.minOrder>total){
                couponCheck=false;
                throw new Error("Minimum Order value not met")
            }
        }


        if(!couponCheck){
            throw new Error("Coupon is not valid")
        }




        // Create a Bill


        /*
        total,discounts [],couponsUsed
        */


        const bill=await Bill.create(productDetails,total,discounts,couponsUsed,token.id)

        // Create an Order


        const order=await Order.create({
            productID:productDetails.map((prod)=>prod.product_id),
            bill:bill._id,
            userID:token.id,
            deliveryAddress,
        })


        return new Response(JSON.stringify({
            status:"success",
            message:"Order placed successfully",
            data:{
                order,
                bill
            }}),{
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            }    
            )





    }catch(err){


        return new Response(JSON.stringify({
            status:"failed",
            message:err.message
        }),{
            status:500,
            headers:{
                "Content-Type":"application/json"
            }
        })
    }



}