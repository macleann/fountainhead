import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-5 text-white">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <Link to="/" className="mt-4 text-green-500 underline">Go Home</Link>
        </div>
    );
};

export default NotFoundPage;