"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { JobPreview } from "@/components/jobs/job-preview"

const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.string(),
  experience: z.string(),
  salary: z.object({
    min: z.coerce.number(),  // Ensure it's stored as a number
    max: z.coerce.number(),
  }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }),
  requirements: z.string().min(50, { message: "Requirements must be at least 50 characters" }),
  benefits: z.string().optional(),
  skills: z.array(z.string()).min(3, { message: "At least 3 skills are required" }),
  remote: z.boolean().default(false),
  featured: z.boolean().default(false),
  urgent: z.boolean().default(false),
})

type JobFormValues = z.infer<typeof jobFormSchema>

export default function NewJobPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<JobFormValues> = {
    title: "",
    company: "",
    location: "",
    type: "full-time",
    experience: "mid-level",
    salary: {
      min: 0, // Default to number
      max: 0,
    },
    description: "",
    requirements: "",
    benefits: "",
    skills: [],
    remote: false,
    featured: false,
    urgent: false,
  }

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: JobFormValues) {
    setIsSubmitting(true)

    try {
      console.log("Job data:", data)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Job posted successfully",
        description: "Your job has been posted and is now live.",
      })

      router.push("/recruiter/jobs")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error posting job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
      <p className="text-muted-foreground">Create a new job posting to attract the best candidates</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
              <CardDescription>Enter the details of the job you want to post</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary.min"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Salary</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 80000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary.max"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Salary</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 120000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Job Preview</CardTitle>
              <CardDescription>Preview how your job posting will appear to candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <JobPreview
                formData={{
                  ...form.getValues(),
                  salary: {
                    min: Number(form.getValues().salary.min),
                    max: Number(form.getValues().salary.max),
                  },
                }}
              />
              <Button onClick={() => setActiveTab("details")}>Back to Edit</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
