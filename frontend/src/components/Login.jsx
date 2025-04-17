import React, { useActionState, useEffect, useState } from "react";

// ShadCN UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Icons
import { FaEnvelope, FaLock } from "react-icons/fa";
import { CheckCircle, AlertTriangle } from "lucide-react";

// Router imports
import { Link, useNavigate } from "react-router-dom";

// Service function for login
import { login } from "../services/userServices";

const Login = () => {
  const navigate = useNavigate();

  // State for form input
  const [formData, setFormData] = useState({ email: "", password: "" });

  // useActionState handles form submission, errors, and success messages
  const [state, formAction, isPending] = useActionState(login, {
    success: null,
    error: null,
  });

  // Handle input changes and update form state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Navigate to homepage after successful login
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [state.success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
        {/* Card Header */}
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>

        {/* Card Content */}
        <CardContent>
          <form action={formAction} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FaEnvelope className="text-blue-600" /> Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FaLock className="text-blue-600" /> Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Logging In..." : "Login"}
            </Button>

            {/* Error Alert */}
            {state.error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="font-semibold">Login Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {/* Navigation to Register Page */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
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
