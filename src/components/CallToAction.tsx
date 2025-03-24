
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
          <button className="px-8 py-3 text-sm font-medium text-blue-600 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
