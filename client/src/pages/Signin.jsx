import { Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import sideLogo from "../assets/sidelogo.png";

export function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <img src={sideLogo} className="h-10 w-10 text-red-600" />
              <Heart className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Emergenix</h1>
          </div>
          <p className="text-center text-gray-600">
            Welcome back! Please login to continue
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white">
            Sign In
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
