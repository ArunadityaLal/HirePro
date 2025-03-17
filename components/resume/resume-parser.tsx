"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Download, CheckCircle, AlertCircle } from "lucide-react"

export function ResumeParser() {
  // Mock parsed resume data
  const resumeData = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com",
    },
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "HTML/CSS", level: 90 },
      { name: "UI/UX Design", level: 70 },
      { name: "Git", level: 85 },
      { name: "Agile/Scrum", level: 80 },
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "Led the development of responsive web applications using React and TypeScript. Implemented state management with Redux and improved performance by 40%.",
        highlights: [
          "Developed and maintained multiple React applications",
          "Implemented CI/CD pipelines using GitHub Actions",
          "Mentored junior developers and conducted code reviews",
          "Reduced bundle size by 35% through code splitting and lazy loading",
        ],
      },
      {
        title: "Frontend Developer",
        company: "Web Innovations",
        location: "Seattle, WA",
        startDate: "Mar 2017",
        endDate: "Dec 2019",
        description:
          "Developed and maintained web applications using React, Redux, and JavaScript. Collaborated with designers to implement responsive UI components.",
        highlights: [
          "Built reusable component library used across multiple projects",
          "Implemented responsive designs for mobile and desktop",
          "Integrated RESTful APIs and GraphQL endpoints",
          "Participated in agile development process",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        location: "Berkeley, CA",
        startDate: "2013",
        endDate: "2017",
        gpa: "3.8/4.0",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "2021",
      },
      {
        name: "Professional Scrum Master I (PSM I)",
        issuer: "Scrum.org",
        date: "2020",
      },
    ],
    jobMatch: {
      overallScore: 85,
      missingKeywords: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      strengths: ["React", "TypeScript", "Frontend Development", "UI/UX"],
      suggestions: [
        "Add experience with Docker and containerization",
        "Highlight any cloud platform experience (AWS, Azure, GCP)",
        "Include CI/CD tools you've worked with",
        "Emphasize team leadership and project management skills",
      ],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Parsed Resume Information</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{resumeData.personalInfo.name}</CardTitle>
          <CardDescription className="flex flex-col space-y-1">
            <span>{resumeData.personalInfo.email}</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>{resumeData.personalInfo.location}</span>
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="analysis">Job Match</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{exp.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <CardDescription>
                  {exp.company} • {exp.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{exp.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <CardDescription>
                  {edu.institution} • {edu.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">GPA: {edu.gpa}</p>
              </CardContent>
            </Card>
          ))}

          {resumeData.certifications.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-medium mb-2">Certifications</h4>
              <div className="space-y-2">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between items-center border p-3 rounded-md">
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <Badge variant="outline">{cert.date}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Job Match Analysis
                <Badge className="ml-2 text-lg bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  {resumeData.jobMatch.overallScore}% Match
                </Badge>
              </CardTitle>
              <CardDescription>
                Analysis of your resume against typical job requirements for your target role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Your Strengths</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.jobMatch.strengths.map((strength, index) => (
                    <Badge key={index} className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" /> {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.jobMatch.missingKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="border-destructive text-destructive">
                      <AlertCircle className="mr-1 h-3 w-3" /> {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Improvement Suggestions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {resumeData.jobMatch.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

