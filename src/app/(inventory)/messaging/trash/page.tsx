'use client';
import React,{useState} from 'react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
export default function Page() {
  const messagesData = [
    {
      id: 1,
      name: 'Deepika Dave',
      date: '12 Dec 2023',
      message: 'https://bohotree.etsy.com/listing/1570010174/exquisite-net-fabrio-saree-border.https://bohotree.etsy.com/listing/985893534/sar...',
    },
    {
      id: 2,
      name: 'Cassandra',
      date: '12 Dec 2023',
      message: 'Hi, This is an etsy issue. If you want you can go ahead with the purchase and i will calculate the difference manually and refund th...',
    },
    {
      id: 3,
      name: 'Susan Klären',
      date: '12 Dec 2023',
      message: 'Hello there, Thank You for contacting Bohotree. I will get back to you shortly. Warmest regards, Shikha',
    },
    {
      id: 4,
      name: 'Aline ruze-senderain',
      date: '12 Dec 2023',
      message: 'Hello there, Thank You for contacting Bohotree, I will get back to you shortly. Warmest regardi, Shikha',
    },
    {
      id: 5,
      name: 'Bonnie',
      date: '12 Dec 2023',
      message: 'Hi, Ideally it should arrive by then. Best Regards',
    },
    {
      id: 6,
      name: 'Stavo Craft',
      date: '12 Dec 2023',
      message: 'Try on browser.',
    },
    {
      id: 7,
      name: 'MARIA ROSA',
      date: '12 Dec 2023',
      message: 'Hi, Yes you can pay through credit card using the same paypal checkout without registering. Pls opt for credit card payment optio...',
    },
  ];const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messagesData.filter((message) =>
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
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
