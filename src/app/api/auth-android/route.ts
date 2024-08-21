

import { NextRequest } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { validPassword } from "@/utils/password";
import User from "@/models/UserSchema";
import {issueJWT} from "@/utils/AuthUtils";
export async function POST(req:NextRequest){

    await dbConnect();

    try{
        let body=await req.json();
          let email=body.email;


        let user=await User.findOne({Email:email});


        if(!user){

            return new Response(JSON.stringify({message:"User not found"}),{status:404});
            

        }



        if (user && validPassword(body.password,user.hash,user.salt)){

            let token=await issueJWT(user);
            return new Response(JSON.stringify({token}),{status:200});

        }













    }catch(err:any){
        return new Response(JSON.stringify({message:err.message}),{status:500});



    }

}