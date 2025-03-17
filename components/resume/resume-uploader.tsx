"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Check, AlertCircle, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ResumeParser } from "@/components/resume/resume-parser"

export function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [parsedResume, setParsedResume] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus("idle")
      setParsedResume(false)
    }
  }

  // Update the handleUpload function to pass the file content to the parser
  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 100)

    try {
      // In a real implementation, this would send the file to a backend service
      // that would extract text from the PDF/DOCX and use NLP to parse the content
      const fileContent = await readFileContent(file)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(interval)
      setUploadProgress(100)
      setUploading(false)
      setUploadStatus("success")

      // Store the parsed resume data in localStorage for the parser component to use
      localStorage.setItem("parsedResumeFile", file.name)
      localStorage.setItem("parsedResumeContent", fileContent)

      // Simulate parsing delay
      setTimeout(() => {
        setParsedResume(true)
      }, 1000)
    } catch (error) {
      clearInterval(interval)
      setUploadProgress(0)
      setUploading(false)
      setUploadStatus("error")
      console.error("Error processing resume:", error)
    }
  }

  // Add a function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          // In a real implementation, this text would be sent to an NLP service
          // Here we're just returning the raw text for simulation purposes
          resolve(event.target.result as string)
        } else {
          reject(new Error("Failed to read file content"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Error reading file"))
      }

      if (file.type === "application/pdf") {
        // For PDFs, we'd use a PDF parsing library in a real implementation
        // Here we're just simulating by reading as text
        reader.readAsText(file)
      } else {
        // For DOC/DOCX, we'd use a document parsing library
        // Here we're just simulating by reading as text
        reader.readAsText(file)
      }
    })
  }

  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload Resume</TabsTrigger>
        <TabsTrigger value="parsed" disabled={!parsedResume}>
          Parsed Information
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upload" className="space-y-4">
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="resume">Upload your resume</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} disabled={uploading} />
            <p className="text-sm text-muted-foreground">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>

          {file && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button onClick={handleUpload} disabled={uploading || uploadStatus === "success"} size="sm">
                    {uploadStatus === "idle" && (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                      </>
                    )}
                    {uploadStatus === "uploading" && (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                      </>
                    )}
                    {uploadStatus === "success" && (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Uploaded
                      </>
                    )}
                  </Button>
                </div>

                {uploadStatus === "uploading" && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "success" && (
                  <Alert className="mt-4" variant="default">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Upload Successful</AlertTitle>
                    <AlertDescription>
                      {parsedResume
                        ? "Your resume has been uploaded and parsed successfully."
                        : "Your resume has been uploaded and is being processed..."}
                    </AlertDescription>
                  </Alert>
                )}

                {uploadStatus === "error" && (
                  <Alert className="mt-4" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upload Failed</AlertTitle>
                    <AlertDescription>There was an error uploading your resume. Please try again.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      <TabsContent value="parsed">{parsedResume && <ResumeParser />}</TabsContent>
    </Tabs>
  )
}

