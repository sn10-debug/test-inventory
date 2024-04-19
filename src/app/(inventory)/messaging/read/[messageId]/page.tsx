'use client';
import React from 'react'
import jsonData from '@/data/messageData.json'
import { Card,CardHeader,CardContent,CardDescription,CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function Page({params}:{
    params:{
        messageId:string
    }
}){
    const { inboxData } = jsonData;
    const messageData = inboxData.find((item) => item.id === params.messageId);
    const [newMessage, setNewMessage] = useState('');
    const [conversationHistory, setConversationHistory] = useState(messageData?.message.split('\n') || []);

    if (!messageData) {
        return <div>Message not found</div>;
    }

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            // Add logic to send the new message to the server
            console.log('New message:', newMessage);
            setConversationHistory([...conversationHistory, `You: ${newMessage}`]);
            setNewMessage('');
        }
    };
  
    return (
      <div className="flex flex-col space-y-4">
        
        <div className="flex flex-col space-y-4">
         
          {conversationHistory.map((message, index) => (
      
            <div
              key={index}
              className={`flex ${message.startsWith('You:') ? 'justify-end ' : 'justify-start '}`}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{message.startsWith('You:') ? 'You' : messageData.name}</CardTitle>
                  <CardDescription>{messageData.date}</CardDescription>
                </CardHeader>
                <CardContent>{message.replace(/^You: /, '')}</CardContent>
              </Card>
            </div>
           
          ))}
       
        </div>
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
  