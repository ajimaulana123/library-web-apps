
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookCheck, Calendar, BookOpen, Star, BookUser, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Handle borrow request
  const handleBorrowRequest = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsRequesting(true);
    
    // Simulate API call to create a new loan request
    setTimeout(() => {
      // Create a new loan request
      const newLoanRequest = {
        id: Math.random().toString(36).substr(2, 9),
        bookId: book.id,
        book: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        requestDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        estimatedAvailability: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        studentId: user?.id,
        studentName: user?.name || 'Student'
      };
      
      // Store in local storage
      const existingReservations = JSON.parse(localStorage.getItem('bookReservations') || '[]');
      localStorage.setItem('bookReservations', JSON.stringify([...existingReservations, newLoanRequest]));
      
      // Reduce available copies
      const booksData = JSON.parse(localStorage.getItem('booksData') || '[]');
      const updatedBooks = booksData.map((b: any) => {
        if (b.id === book.id) {
          const newAvailableCopies = b.availableCopies > 0 ? b.availableCopies - 1 : 0;
          return {
            ...b,
            availableCopies: newAvailableCopies,
            available: newAvailableCopies > 0
          };
        }
        return b;
      });
      localStorage.setItem('booksData', JSON.stringify(updatedBooks));
      
      setIsRequesting(false);
      toast.success("Permintaan pinjaman buku berhasil dikirim dan menunggu persetujuan!");
      navigate('/student/loans');
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
                    <span className="text-green-600">{book.availableCopies} tersedia dari {book.totalCopies} total</span>
                  ) : (
                    <span className="text-red-600">Tidak tersedia</span>
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
                  <span>Memproses...</span>
                ) : (
                  <>
                    <BookCheck size={16} className="mr-2" />
                    {book.available ? "Ajukan Peminjaman" : "Tidak Tersedia"}
                  </>
                )}
              </Button>
              
              <Button variant="outline">Tambahkan ke Daftar Baca</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
