
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookCheck, Calendar, BookOpen, Star, BookUser, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface BookHeaderProps {
  book: {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    publicationYear: number;
    pages: number;
    rating: number;
    genre: string;
    popularity: string;
    available: boolean;
    availableCopies: number;
    totalCopies: number;
  };
}

export const BookHeader = ({ book }: BookHeaderProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  
  // Handle borrow request
  const handleBorrowRequest = () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      toast.success("Book loan request submitted successfully!");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row">
          {/* Book Cover */}
          <div className="w-full md:w-1/4 lg:w-1/6 mb-6 md:mb-0">
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-[2/3]">
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Book Info */}
          <div className="md:pl-8 flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            
            {/* Book Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">{book.publicationYear}</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">{book.pages} pages</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 mr-2" />
                <span className="text-sm">{book.rating} rating</span>
              </div>
              <div className="flex items-center">
                <BookUser size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">{book.genre}</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">{book.popularity} popularity</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">
                  {book.available ? (
                    <span className="text-green-600">{book.availableCopies} available</span>
                  ) : (
                    <span className="text-red-600">Unavailable</span>
                  )}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                disabled={!book.available || isRequesting}
                onClick={handleBorrowRequest}
                className="flex items-center"
              >
                {isRequesting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <BookCheck size={16} className="mr-2" />
                    Request Loan
                  </>
                )}
              </Button>
              
              <Button variant="outline">Add to Reading List</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
