import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {validPassword,genPassword} from "@/utils/password";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/UserSchema";



export const options: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID as string : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET as string : "",
            

            async profile(profile) {

              await dbConnect();
             
             let user=await User.find({
              Email:profile.email
            }).then((users)=>{
                  if(users.length==0){
                    return User.create({
                      Email:profile.name,
                      name:profile.name,
                      image:profile.picture,
                      uniqueID:crypto.randomUUID(),
                      verified:false,
                      createdAt:Date.now(),
                      updatedAt:Date.now(),
                      googleId:profile.sub,
                     
                    })
                  

                  }
                  else {
                    return users[0]
                  }
                }).catch((error)=>{
                  console.log(error)
                })

             


                return user;
            },
        
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {  
              username: { label: "Username", type: "text" },
              password: {  label: "Password", type: "password" }
            },
            
            async authorize(credentials,req) {


              try{


              await dbConnect()


              const user=await User.findOne({Email:credentials?.username})
             

             if(user && validPassword(credentials ? credentials?.password : "",user.hash,user.salt)){
             return user; 
              }
              else {
                return null
              }

            }catch(error){

              console.log(error)
            }
                
              
              
            },
            
})

    ],
    // pages: {
    //     signIn: "/auth/signin",
    //     signOut: "/auth/signout",
    //     error: "/auth/error", // Error code passed in query string as ?error=
    //     verifyRequest: "/auth/verify-request", // (used for check email message)
    //     newUser: "/" // If set, new users will be directed here on first sign in
    // },
    callbacks:{
      async jwt({token, user}){
        if(user){
          token.id=user.id;
          token.user={ id: user.id, email: user.email, name: user.name };
        }
        console.log("JWT Token : ",token)
        return token
      },
      async session({session , token} : any){

         
        session.id=token.id
        session.user = token.user
        console.log("Session : ",session)
        return session
      }
    },session: {
      strategy: "jwt", // Ensure you're using the 'jwt' strategy
    },
    
}