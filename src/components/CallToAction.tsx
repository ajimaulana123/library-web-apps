
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-6">
            Ready to transform your school library?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of schools already using our platform to make their libraries more accessible.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-3 text-sm font-medium text-blue-600 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              to="/admin/dashboard"
              className="px-8 py-3 text-sm font-medium text-white border border-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
            >
              Visit Demo Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
