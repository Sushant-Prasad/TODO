import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaEnvelope className="text-blue-600" /> Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaLock className="text-blue-600" /> Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>

            {/* Register Link */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
