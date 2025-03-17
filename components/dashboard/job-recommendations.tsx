"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock, Star, StarOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface JobRecommendationsProps {
  showAll?: boolean
}

export function JobRecommendations({ showAll = false }: JobRecommendationsProps) {
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      matchScore: 95,
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted: "5 days ago",
      matchScore: 88,
    },
    {
      id: "3",
      title: "Backend Engineer",
      company: "Software Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "1 week ago",
      matchScore: 82,
    },
    {
      id: "4",
      title: "Product Manager",
      company: "Product Innovations",
      location: "Remote",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "2 weeks ago",
      matchScore: 78,
    },
    {
      id: "5",
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Austin, TX",
      type: "Contract",
      salary: "$100,000 - $130,000",
      posted: "3 weeks ago",
      matchScore: 75,
    },
  ]

  const displayJobs = showAll ? jobs : jobs.slice(0, 3)

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
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
                  <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                    {job.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-1">{job.company}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-3 w-3" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {job.posted}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSaveJob(job.id)}
                className="text-muted-foreground hover:text-primary"
              >
                {savedJobs.includes(job.id) ? (
                  <Star className="h-4 w-4 fill-primary" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-sm font-medium">{job.salary}</div>
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/jobs/${job.id}`}>View Details</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/jobs">View All Recommended Jobs</Link>
        </Button>
      )}
    </div>
  )
}

