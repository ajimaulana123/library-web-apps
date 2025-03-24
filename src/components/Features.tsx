
import { Book, Users, Clock } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
            Everything you need for your school library
          </h2>
          <p className="text-lg text-gray-600">
            Our platform offers a comprehensive suite of tools to manage and access your library resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Book size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Digital Catalogue</h3>
            <p className="text-gray-600">
              Browse our extensive collection of books, journals, and digital resources online.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
              <Users size={24} className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User Profiles</h3>
            <p className="text-gray-600">
              Personalized accounts for students and staff with borrowing history and recommendations.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Clock size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
            <p className="text-gray-600">
              Access the library anytime, anywhere with our mobile-friendly platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
