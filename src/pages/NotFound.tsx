
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
          <span className="text-blue-600 text-2xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
