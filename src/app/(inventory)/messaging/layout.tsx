'use client';
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const options = [
    {
      id: 1,
      name: "Inbox",
      link: 'messaging/inbox'
    },
    {
      id: 2,
      name: "Unread",
      link: 'messaging/unread'
    },
    {
      id: 3,
      name: "Read",
      link: 'messaging/read'
    },
    
  ]

  const handleButtonClick = (link: string) => {
    router.push(`/${link}`);
  }

  return (
    <Card>
      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <div className="flex gap-6 w-full">
          <div className="w-1/4">
            {options.map((option) => (
              <div key={option.id} className="mt-3">
                <Button
                  className="flex justify-center items-center w-full"
                  onClick={() => handleButtonClick(option.link)}
                >
                  <span className="font-bold">{option.name}</span>
                </Button>
              </div>
            ))}
          </div>
          {children}
        </div>
      </div>
    </Card>
  )
}