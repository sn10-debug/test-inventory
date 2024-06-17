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
      link: 'messaging/inbox',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
    </svg>
    
    },
    {
      id: 2,
      name: "Unread",
      link: 'messaging/unread',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
    
    },
    {
      id: 3,
      name: "Read",
      link: 'messaging/read',
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
    </svg>
    
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
                  className="flex justify-center items-center w-full space-x-2 "
                  onClick={() => handleButtonClick(option.link)}
                >
                  <span>{option.icon??''}</span>
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