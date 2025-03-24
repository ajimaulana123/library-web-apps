
import { useState } from 'react';
import { Book, Home, FileText, User, LogOut, Search, BookOpenText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '../../contexts/AuthContext';

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
}

const StudentLayout = ({ children, title }: StudentLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Student Header (Sticky) */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo + App Name */}
            <div className="flex items-center">
              <Link to="/student/dashboard" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">L</span>
                </div>
                <span className="text-lg font-medium hidden sm:inline">Library System</span>
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <Input
                  type="search"
                  className="pl-10 w-full"
                  placeholder="Search for books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/student/dashboard" 
                className={`text-sm font-medium ${isActive('/student/dashboard') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <Home size={16} />
                Dashboard
              </Link>
              <Link 
                to="/student/catalog" 
                className={`text-sm font-medium ${isActive('/student/catalog') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <Book size={16} />
                Catalog
              </Link>
              <Link 
                to="/student/loans" 
                className={`text-sm font-medium ${isActive('/student/loans') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <FileText size={16} />
                My Loans
              </Link>
            </nav>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User size={16} />
                  </div>
                  <span className="hidden sm:inline">{user?.name || 'Student'}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
                  {user?.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/student/dashboard" className="flex items-center w-full">
                    <Home size={16} className="mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/student/loans" className="flex items-center w-full">
                    <BookOpenText size={16} className="mr-2" />
                    My Loans
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t py-2">
        <div className="flex justify-around">
          <Link
            to="/student/dashboard"
            className={`flex flex-col items-center p-2 ${
              isActive('/student/dashboard') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/student/catalog"
            className={`flex flex-col items-center p-2 ${
              isActive('/student/catalog') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <Book size={20} />
            <span className="text-xs mt-1">Catalog</span>
          </Link>
          <Link
            to="/student/loans"
            className={`flex flex-col items-center p-2 ${
              isActive('/student/loans') ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FileText size={20} />
            <span className="text-xs mt-1">Loans</span>
          </Link>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 mb-16 md:mb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2023 School Library System
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Terms of Use</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;
