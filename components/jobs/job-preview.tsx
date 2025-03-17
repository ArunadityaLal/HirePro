"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Building, DollarSign } from "lucide-react"

interface JobPreviewProps {
  formData: any
}

export function JobPreview({ formData }: JobPreviewProps) {
  const {
    title,
    company,
    location,
    type,
    experience,
    salary,
    description,
    requirements,
    benefits,
    skills,
    remote,
    featured,
    urgent,
  } = formData

  const formatSalary = () => {
    if (!salary.min && !salary.max) return "Not specified"
    if (salary.min && !salary.max) return `$${Number(salary.min).toLocaleString()}+`
    if (!salary.min && salary.max) return `Up to $${Number(salary.max).toLocaleString()}`
    return `$${Number(salary.min).toLocaleString()} - $${Number(salary.max).toLocaleString()}`
  }

  const formatJobType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatExperience = (exp: string) => {
    return exp
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {featured && <Badge className="bg-primary">Featured</Badge>}
          {urgent && <Badge variant="destructive">Urgent</Badge>}
          {remote && <Badge variant="outline">Remote</Badge>}
          <Badge variant="secondary">{formatJobType(type)}</Badge>
          <Badge variant="secondary">{formatExperience(experience)}</Badge>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{title || "Job Title"}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{company || "Company Name"}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location || "Location"}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>{formatSalary()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Posted just now</span>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            {description ? (
              <p>{description}</p>
            ) : (
              <p className="text-muted-foreground italic">No description provided</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none dark:prose-invert">
            {requirements ? (
              <p>{requirements}</p>
            ) : (
              <p className="text-muted-foreground italic">No requirements provided</p>
            )}
          </div>
        </CardContent>
      </Card>

      {benefits && (
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p>{benefits}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {skills && skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No skills specified</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

