"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const applicationData = [
  { name: "Jan", total: 45 },
  { name: "Feb", total: 62 },
  { name: "Mar", total: 78 },
  { name: "Apr", total: 56 },
  { name: "May", total: 69 },
  { name: "Jun", total: 87 },
  { name: "Jul", total: 95 },
  { name: "Aug", total: 102 },
  { name: "Sep", total: 120 },
  { name: "Oct", total: 98 },
  { name: "Nov", total: 86 },
  { name: "Dec", total: 74 },
]

const jobViewsData = [
  { name: "Mon", views: 240 },
  { name: "Tue", views: 280 },
  { name: "Wed", views: 305 },
  { name: "Thu", views: 290 },
  { name: "Fri", views: 310 },
  { name: "Sat", views: 180 },
  { name: "Sun", views: 160 },
]

export function RecruiterStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Applications Over Time</CardTitle>
          <CardDescription>Monthly application trends for the past year</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={applicationData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Job Posting Views</CardTitle>
          <CardDescription>Daily views for the past week</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={jobViewsData}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

