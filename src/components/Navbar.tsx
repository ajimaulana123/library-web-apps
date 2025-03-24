
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <span className="ml-2 text-lg font-medium">Library</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-medium px-4 py-2 rounded-md transition-colors hover:bg-gray-100">
              Log in
            </button>
            <button className="btn-primary">
              Sign up
            </button>
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
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Home
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Pricing
            </a>
            <a href="#" className="block text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">
              Contact
            </a>
            <div className="pt-4 flex flex-col space-y-4">
              <button className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-100">
                Log in
              </button>
              <button className="btn-primary">
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
