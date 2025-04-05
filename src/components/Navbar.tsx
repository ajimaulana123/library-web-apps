
import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, User, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="ml-2 text-lg font-medium">Perpustakaan</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Beranda
            </Link>
            <HashLink to="#features" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Fitur
            </HashLink>
            <HashLink to="#catalog" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Katalog Buku
            </HashLink>
            <HashLink to="#about" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Tentang Kami
            </HashLink>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/admin/dashboard"
                  className="text-sm font-medium px-4 py-2 rounded-md transition-colors hover:bg-gray-100 flex items-center"
                >
                  <BookOpen size={16} className="mr-2" />
                  Dasbor Admin
                </Link>
                <button 
                  className="btn-secondary flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/admin/dashboard"
                  className="text-sm font-medium px-4 py-2 rounded-md transition-colors hover:bg-gray-100 flex items-center"
                >
                  <BookOpen size={16} className="mr-2" />
                  Portal Pustakawan
                </Link>
                <Link 
                  to="/login" 
                  className="btn-primary flex items-center"
                >
                  <LogIn size={16} className="mr-2" />
                  Masuk
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <HashLink 
              to="#features" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fitur
            </HashLink>
            <HashLink 
              to="#catalog" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Katalog Buku
            </HashLink>
            <HashLink 
              to="#about" 
              className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang Kami
            </HashLink>
            <div className="pt-4 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/admin/dashboard"
                    className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Dasbor Admin
                  </Link>
                  <button 
                    className="btn-secondary flex items-center justify-center"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/admin/dashboard"
                    className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-100 flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BookOpen size={16} className="mr-2" />
                    Portal Pustakawan
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn-primary flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn size={16} className="mr-2" />
                    Masuk
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
