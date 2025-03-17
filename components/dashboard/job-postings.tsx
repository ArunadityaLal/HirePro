"use client"

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
import { MoreHorizontal, Edit, Trash, Eye, Copy } from "lucide-react"
import Link from "next/link"

interface JobPostingsProps {
  showAll?: boolean
}

export function JobPostings({ showAll = false }: JobPostingsProps) {
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      location: "Remote",
      type: "Full-time",
      applications: 24,
      posted: "2 days ago",
      status: "active",
    },
    {
      id: "2",
      title: "UX Designer",
      location: "New York, NY",
      type: "Full-time",
      applications: 18,
      posted: "5 days ago",
      status: "active",
    },
    {
      id: "3",
      title: "Backend Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      applications: 12,
      posted: "1 week ago",
      status: "active",
    },
    {
      id: "4",
      title: "Product Manager",
      location: "Remote",
      type: "Full-time",
      applications: 32,
      posted: "2 weeks ago",
      status: "closed",
    },
    {
      id: "5",
      title: "DevOps Engineer",
      location: "Austin, TX",
      type: "Contract",
      applications: 8,
      posted: "3 weeks ago",
      status: "draft",
    },
  ]

  const displayJobs = showAll ? jobs : jobs.slice(0, 3)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "closed":
        return <Badge variant="secondary">Closed</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {displayJobs.map((job) => (
          <div key={job.id} className="flex flex-col space-y-2 rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="ml-2">{getStatusBadge(job.status)}</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {job.location} • {job.type}
                </div>
              </div>
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
                    <Eye className="mr-2 h-4 w-4" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Posted {job.posted}</div>
              <div className="font-medium">{job.applications} applications</div>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/recruiter/jobs">View All Jobs</Link>
        </Button>
      )}
    </div>
  )
}

