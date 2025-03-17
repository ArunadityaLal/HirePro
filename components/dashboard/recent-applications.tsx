"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface RecentApplicationsProps {
  showAll?: boolean
}

export function RecentApplications({ showAll = false }: RecentApplicationsProps) {
  const applications = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Senior Frontend Developer",
      date: "2 hours ago",
      status: "new",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Sarah Williams",
      position: "UX Designer",
      date: "5 hours ago",
      status: "reviewed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Michael Brown",
      position: "Backend Engineer",
      date: "1 day ago",
      status: "shortlisted",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Emily Davis",
      position: "Product Manager",
      date: "2 days ago",
      status: "rejected",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "David Wilson",
      position: "DevOps Engineer",
      date: "3 days ago",
      status: "new",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const displayApplications = showAll ? applications : applications.slice(0, 3)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">New</Badge>
      case "reviewed":
        return <Badge variant="outline">Reviewed</Badge>
      case "shortlisted":
        return <Badge className="bg-green-500 hover:bg-green-600">Shortlisted</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {displayApplications.map((application) => (
          <div key={application.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={application.avatar} alt={application.name} />
                <AvatarFallback>{application.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{application.name}</p>
                <p className="text-sm text-muted-foreground">{application.position}</p>
                <div className="flex items-center pt-2">
                  {getStatusBadge(application.status)}
                  <span className="ml-2 text-xs text-muted-foreground">{application.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/recruiter/applications/${application.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <CheckCircle className="mr-2 h-4 w-4" /> Shortlist
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </DropdownMenuItem>
                  <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                  <DropdownMenuItem>Download Resume</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/recruiter/applications">View All Applications</Link>
        </Button>
      )}
    </div>
  )
}

