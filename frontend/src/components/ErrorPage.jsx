import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <AlertTriangle size={60} className="text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-4 py-2 shadow-md bg-[#14eea978] text-slate-700 rounded-lg  hover:bg-[#14eea9ba] transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
