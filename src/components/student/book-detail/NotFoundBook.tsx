
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundBook = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <h2 className="text-xl font-semibold mb-4">Book not found</h2>
      <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
      <Link to="/student/catalog">
        <Button>Return to Catalog</Button>
      </Link>
    </div>
  );
};

export default NotFoundBook;
