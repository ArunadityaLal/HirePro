import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, FileText, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                The Next Generation Recruitment Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Connect with the perfect candidates using our AI-powered matching system. Streamline your hiring process
                and find the best talent.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/register?role=recruiter">
                  I&apos;m a Recruiter <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register?role=candidate">
                  I&apos;m a Job Seeker <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform offers cutting-edge tools to make recruitment efficient and effective.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Intelligent Resume Processing</h3>
              <p className="text-muted-foreground text-center">
                Extract structured information from resumes automatically and organize candidate data efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Job-Candidate Matching</h3>
              <p className="text-muted-foreground text-center">
                Our AI algorithm matches the right candidates to your job postings based on skills and experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Applicant Tracking System</h3>
              <p className="text-muted-foreground text-center">
                Track applications, analyze resumes against job descriptions, and provide actionable feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Hiring Process?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of companies and candidates who have already improved their recruitment experience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

