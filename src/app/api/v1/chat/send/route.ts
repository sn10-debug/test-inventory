import Chat from "@/models/ChatSchema";
import Message from "@/models/MessageSchema";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/utils/dbConnect";
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req:NextRequest  ){
  await dbConnect();
     try {

      const authToken = await getToken({ req, secret });
      

        let body=await req.json();
        body.sender= new mongoose.Types.ObjectId(body.sender);
        if (body.receiver === "admin") {
          body.receiver = new mongoose.Types.ObjectId("65e3526c9cc5e6d2369a6740");
        } else {
          body.receiver = new mongoose.Types.ObjectId(body.receiver);
        }
        let chats = await Chat.find({});
        let chat = chats.find((mov:any) =>
          mov.sessionCreators.includes(body.sender)
        );
        if (chat) {
          body.chatId = chat._id;
        } else {
          body.chatId = null;
        }


        chat = await (body.chatId ? Chat.findById(body.chatId) : null);
        if (chat) {
          let message = await Message.create({
            message: body.message,
            sender: body.sender,
            receiver: body.receiver,
            chat: body.chatId,
          });
          chat.message.push(message._id);
          await chat.save();

          return  new Response( JSON.stringify({ message: "Message Sent Successfully" }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          });
          
        } else {
          let chat = await Chat.create({
            sessionCreators: [body.sender, body.receiver],
          });
          if (!chat) throw new Error("Chat not created");
          let message = await Message.create({
            message: body.message,
            sender: body.sender,
            receiver: body.receiver,
    
            chat: chat._id,
          });
          chat.message.push(message._id);
          await chat.save();
          return new Response(
            JSON.stringify({ message: "Message Sent Successfully" }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      } catch (err:any) {
        

        return new Response(
            JSON.stringify({ message: "Failed to get chat",
            err:err.message }),
            {
                status: 400,
                headers: {
                "Content-Type": "application/json",
                },
            }
            );
      }
}