'use client';
import React,{useState} from 'react'
import Link from 'next/link'; 
import { Input } from "@/components/ui/input"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import jsonData from "@/data/messageData.json" 
export default function Page() {
  const {inboxData}=jsonData;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = inboxData.filter((message) =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="">
        <Input
          className="mb-6"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {filteredMessages.map(({ id, name, date, message }) => (
              <Card key={id} className="w-full">
                <Link href={{pathname:`/messaging/inbox/${id}`}}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{message}</p>
                </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
