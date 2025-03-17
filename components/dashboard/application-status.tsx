"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ApplicationStatusProps {
  showAll?: boolean
}

export function ApplicationStatus({ showAll = false }: ApplicationStatusProps) {
  const applications = [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      applied: "May 15, 2023",
      status: "interview",
      progress: 75,
      nextStep: "Technical Interview on June 15, 2023",
    },
    {
      id: "2",
      company: "Design Studio",
      position: "UX Designer",
      applied: "May 10, 2023",
      status: "review",
      progress: 40,
      nextStep: "Waiting for application review",
    },
    {
      id: "3",
      company: "Software Solutions",
      position: "Backend Engineer",
      applied: "May 5, 2023",
      status: "rejected",
      progress: 100,
      nextStep: "Application not selected",
    },
    {
      id: "4",
      company: "Product Innovations",
      position: "Product Manager",
      applied: "April 28, 2023",
      status: "offer",
      progress: 90,
      nextStep: "Offer received, pending decision",
    },
    {
      id: "5",
      company: "Cloud Systems",
      position: "DevOps Engineer",
      applied: "April 20, 2023",
      status: "applied",
      progress: 20,
      nextStep: "Application submitted",
    },
  ]

  const displayApplications = showAll ? applications : applications.slice(0, 3)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline">Applied</Badge>
      case "review":
        return <Badge variant="secondary">In Review</Badge>
      case "interview":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Interview</Badge>
      case "offer":
        return <Badge className="bg-green-500 hover:bg-green-600">Offer</Badge>
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
          <div key={application.id} className="flex flex-col space-y-2 rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{application.position}</h3>
                <p className="text-sm text-muted-foreground">{application.company}</p>
              </div>
              {getStatusBadge(application.status)}
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Application Progress</span>
                <span>{application.progress}%</span>
              </div>
              <Progress value={application.progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">Applied: {application.applied}</p>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href={`/candidate/applications/${application.id}`}>
                  Details <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
            <div className="text-sm">
              <span className="font-medium">Next Step: </span>
              {application.nextStep}
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/candidate/applications">View All Applications</Link>
        </Button>
      )}
    </div>
  )
}

