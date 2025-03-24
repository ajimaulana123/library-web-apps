
import { useState, useEffect } from 'react';
import { Bell, Book, FileText, Home, LogOut, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [notifications, setNotifications] = useState(5);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Header (Sticky) */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* School Logo + App Name */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Link to="/admin/dashboard" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                  <span className="text-lg font-medium hidden sm:inline">Library Admin</span>
                </Link>
              </div>
            </div>

            {/* Quick Access Menu */}
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/admin/dashboard" 
                className={`text-sm font-medium ${isActive('/admin/dashboard') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <Home size={16} />
                Dashboard
              </Link>
              <Link 
                to="/admin/books" 
                className={`text-sm font-medium ${isActive('/admin/books') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <Book size={16} />
                Books
              </Link>
              <Link 
                to="/admin/loans" 
                className={`text-sm font-medium ${isActive('/admin/loans') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <FileText size={16} />
                Loans
              </Link>
              <Link 
                to="/admin/reports" 
                className={`text-sm font-medium ${isActive('/admin/reports') ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'} transition-colors flex items-center gap-1`}
              >
                <FileText size={16} />
                Reports
              </Link>
            </nav>

            {/* Admin Controls */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-2 font-medium">Notifications</div>
                  <DropdownMenuSeparator />
                  <div className="p-4 text-sm text-gray-500">
                    <div className="mb-2 text-red-500 font-medium">Overdue Books</div>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Emma Watson - "The Great Gatsby"</span>
                        <span className="text-red-500">7 days</span>
                      </li>
                      <li className="flex justify-between">
                        <span>John Smith - "To Kill a Mockingbird"</span>
                        <span className="text-red-500">3 days</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sarah Johnson - "1984"</span>
                        <span className="text-red-500">5 days</span>
                      </li>
                    </ul>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-center">
                    <button className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User size={16} />
                    </div>
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/admin/settings" className="flex items-center w-full">
                      <Settings size={16} className="mr-2" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/" className="flex items-center w-full">
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              Last Synced: {new Date().toLocaleTimeString()}
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Help Center</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Inventory Guide</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-500 transition-colors">Contact IT</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
