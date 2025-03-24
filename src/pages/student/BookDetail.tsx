
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, BookUser, Calendar, BookCheck, Users, Clock, Star, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// Sample books data 
const booksData = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A novel set in the American South during the 1930s, the story explores themes of racial injustice and moral growth. The story takes place in the fictional town of Maycomb, Alabama, during the Great Depression. The novel is told through the eyes of Scout Finch, a young girl whose father, Atticus Finch, is a lawyer defending a black man accused of raping a white woman.',
    publicationYear: 1960,
    publisher: 'J.B. Lippincott & Co.',
    isbn: '978-0446310789',
    pages: 281,
    available: true,
    totalCopies: 3,
    availableCopies: 2,
    rating: 4.5,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'Michael Johnson', rating: 5, comment: 'A timeless classic that still resonates today.', date: '2023-02-15' },
      { user: 'Sarah Thompson', rating: 4, comment: 'Beautifully written with important social commentary.', date: '2023-01-23' }
    ],
    relatedBooks: ['2', '4', '8']
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Science Fiction',
    description: 'A dystopian novel set in a totalitarian society where critical thought is suppressed under a cult of personality.',
    publicationYear: 1949,
    publisher: 'Secker & Warburg',
    isbn: '978-0451524935',
    pages: 328,
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    rating: 4.7,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'James Wilson', rating: 5, comment: 'Prophetic and terrifying. A must-read.', date: '2023-03-10' }
    ],
    relatedBooks: ['3', '5', '7']
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Romance',
    description: 'A romantic novel following the emotional development of Elizabeth Bennet who learns about the repercussions of hasty judgments.',
    publicationYear: 1813,
    publisher: 'T. Egerton, Whitehall',
    isbn: '978-0141439518',
    pages: 432,
    available: false,
    totalCopies: 2,
    availableCopies: 0,
    rating: 4.3,
    language: 'English',
    popularity: 'Medium',
    reviews: [
      { user: 'Emma Clark', rating: 4, comment: 'A delightful read with memorable characters.', date: '2023-01-05' }
    ],
    relatedBooks: ['1', '4', '6']
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'This novel depicts the Jazz Age and tells the tragic story of Jay Gatsby and his pursuit of the American Dream.',
    publicationYear: 1925,
    publisher: 'Charles Scribner\'s Sons',
    isbn: '978-0743273565',
    pages: 180,
    available: true,
    totalCopies: 4,
    availableCopies: 1,
    rating: 4.2,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'David Brown', rating: 5, comment: 'Beautifully written exploration of the American Dream.', date: '2023-02-28' },
      { user: 'Lisa Martin', rating: 3, comment: 'Good but overrated in my opinion.', date: '2023-02-01' }
    ],
    relatedBooks: ['1', '3', '8']
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1587583875445-14c0d37659b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'A fantasy novel about the adventures of a reluctant hero, a powerful wizard, and a treasure-seeking dragon.',
    publicationYear: 1937,
    publisher: 'George Allen & Unwin',
    isbn: '978-0547928227',
    pages: 310,
    available: true,
    totalCopies: 6,
    availableCopies: 4,
    rating: 4.8,
    language: 'English',
    popularity: 'High',
    reviews: [
      { user: 'Robert Taylor', rating: 5, comment: 'The perfect introduction to Middle-earth.', date: '2023-03-15' }
    ],
    relatedBooks: ['6', '7']
  },
  {
    id: '6',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'The first book in the Harry Potter series introduces a young wizard to the hidden magical world.',
    publicationYear: 1997,
    publisher: 'Bloomsbury',
    isbn: '978-0590353427',
    pages: 223,
    available: false,
    totalCopies: 8,
    availableCopies: 0,
    rating: 4.9,
    language: 'English',
    popularity: 'Very High',
    reviews: [
      { user: 'Sarah Johnson', rating: 5, comment: 'The beginning of a magical journey!', date: '2023-01-18' },
      { user: 'Mark Williams', rating: 5, comment: 'As enchanting now as when I first read it.', date: '2023-02-10' }
    ],
    relatedBooks: ['5', '7']
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'An epic high-fantasy novel revolving around the struggle for control of the One Ring.',
    publicationYear: 1954,
    publisher: 'Allen & Unwin',
    isbn: '978-0618640157',
    pages: 1178,
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    rating: 4.9,
    language: 'English',
    popularity: 'Very High',
    reviews: [
      { user: 'John Davis', rating: 5, comment: 'The definitive fantasy epic.', date: '2023-02-05' }
    ],
    relatedBooks: ['5', '6']
  },
  {
    id: '8',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A teenage boy\'s experiences in New York City, exploring themes of adolescence, identity, and alienation.',
    publicationYear: 1951,
    publisher: 'Little, Brown and Company',
    isbn: '978-0316769488',
    pages: 277,
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    rating: 4.1,
    language: 'English',
    popularity: 'Medium',
    reviews: [
      { user: 'Jessica Adams', rating: 4, comment: 'A classic exploration of teenage angst.', date: '2023-03-01' }
    ],
    relatedBooks: ['1', '4']
  }
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  const [isRequesting, setIsRequesting] = useState(false);
  
  // Find the book by ID
  const book = booksData.find(book => book.id === id);
  
  // Find related books
  const relatedBooks = book?.relatedBooks
    ? booksData.filter(relBook => book.relatedBooks.includes(relBook.id))
    : [];
  
  // Handle borrow request
  const handleBorrowRequest = () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      toast.success("Book loan request submitted successfully!");
    }, 1000);
  };
  
  // If book not found
  if (!book) {
    return (
      <StudentLayout title="Book Not Found">
        <div className="flex flex-col items-center justify-center p-12">
          <h2 className="text-xl font-semibold mb-4">Book not found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
          <Link to="/student/catalog">
            <Button>Return to Catalog</Button>
          </Link>
        </div>
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
      
      {/* Book Header */}
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
      
      {/* Tabs for Details, Reviews, etc. */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          <TabsTrigger value="related" className="flex-1">Related Books</TabsTrigger>
        </TabsList>
        
        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Description</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">ISBN</h4>
                  <p>{book.isbn}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Publisher</h4>
                  <p>{book.publisher}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Language</h4>
                  <p>{book.language}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total Copies</h4>
                  <p>{book.totalCopies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Availability</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${book.availableCopies > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                    style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-4 text-sm font-medium">
                  {book.availableCopies} of {book.totalCopies} available
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Reader Reviews</h3>
            </CardHeader>
            <CardContent>
              {book.reviews && book.reviews.length > 0 ? (
                <div className="space-y-6">
                  {book.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{review.user}</h4>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet for this book.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Write a Review</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Related Books Tab */}
        <TabsContent value="related">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Similar Books You Might Enjoy</h3>
            </CardHeader>
            <CardContent>
              {relatedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {relatedBooks.map(relBook => (
                    <Link key={relBook.id} to={`/student/books/${relBook.id}`}>
                      <div className="flex border rounded-lg overflow-hidden hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-28 min-w-20 bg-gray-200">
                          <img src={relBook.coverUrl} alt={relBook.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium line-clamp-1">{relBook.title}</h4>
                          <p className="text-sm text-gray-600">{relBook.author}</p>
                          <div className="flex items-center mt-1">
                            <Star size={12} className="text-yellow-500 mr-1" />
                            <span className="text-xs">{relBook.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No related books found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

export default BookDetail;
