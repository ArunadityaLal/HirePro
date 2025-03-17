"use client";

import { AuthForm } from "@/app/auth/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="container flex h-screen items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="login" />
        </CardContent>
      </Card>
    </div>
  );
}
