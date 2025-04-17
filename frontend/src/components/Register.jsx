import React, { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { register } from "../services/userServices";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  // State to store input values from the registration form
  const [formData, setFormData] = useState({ email: "", password: "" });

  // useActionState is used to manage the async state of the registration process
  const [state, formAction, isPending] = useActionState(register, {
    success: null, // Holds success message or data
    error: null,   // Holds error message
  });

  // Update form data state when input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // If registration is successful, redirect the user to login page after 2 seconds
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [state.success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      {/* Card wrapper for the registration form */}
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            Registration
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Registration Form */}
          <form action={formAction} className="space-y-5">
            {/* Email Input Field */}
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

            {/* Password Input Field */}
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

            {/* Submit Button to trigger the registration */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 text-white bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? "Registering..." : "Register"}
            </Button>

            {/* Success Alert - Shown when registration is successful */}
            {state.success && (
              <Alert variant="default" className="mt-4 border-green-600 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <AlertTitle className="font-semibold">Registration Successful!</AlertTitle>
                <AlertDescription>Redirecting to login page...</AlertDescription>
              </Alert>
            )}

            {/* Error Alert - Shown when registration fails */}
            {state.error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="font-semibold">Registration Failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {/* Link to login page if the user already has an account */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
