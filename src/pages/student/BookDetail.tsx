
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Book, booksData } from '../../data/booksData';

// Imported components
import BookHeader from '../../components/student/book-detail/BookHeader';
import DetailsTab from '../../components/student/book-detail/DetailsTab';
import ReviewsTab from '../../components/student/book-detail/ReviewsTab';
import RelatedBooksTab from '../../components/student/book-detail/RelatedBooksTab';
import NotFoundBook from '../../components/student/book-detail/NotFoundBook';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  
  // Find the book by ID
  const book = booksData.find(book => book.id === id);
  
  // Find related books
  const relatedBooks = book?.relatedBooks
    ? booksData.filter(relBook => book.relatedBooks.includes(relBook.id))
    : [];
  
  // If book not found
  if (!book) {
    return (
      <StudentLayout title="Book Not Found">
        <NotFoundBook />
      </StudentLayout>
    );
  }
  
  return (
    <StudentLayout title="Book Details">
      <div className="mb-4">
        <Link to="/student/catalog" className="text-blue-500 hover:text-blue-700 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to Catalog
        </Link>
      </div>
      
      {/* Book Header Component */}
      <BookHeader book={book} />
      
      {/* Tabs for Details, Reviews, etc. */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="related" className="flex-1">Related Books</TabsTrigger>
        </TabsList>
        
        {/* Details Tab */}
        <TabsContent value="details">
          <DetailsTab book={book} />
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <ReviewsTab reviews={book.reviews} />
        </TabsContent>
        
        {/* Related Books Tab */}
        <TabsContent value="related">
          <RelatedBooksTab relatedBooks={relatedBooks} />
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

export default BookDetail;
