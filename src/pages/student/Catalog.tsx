
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent
} from '@/components/ui/card';

// Sample book data
const booksData = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A novel set in the American South during the 1930s, the story explores themes of racial injustice and moral growth.',
    available: true,
    publicationYear: 1960,
    rating: 4.5
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Science Fiction',
    description: 'A dystopian novel set in a totalitarian society where critical thought is suppressed under a cult of personality.',
    available: true,
    publicationYear: 1949,
    rating: 4.7
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Romance',
    description: 'A romantic novel following the emotional development of Elizabeth Bennet who learns about the repercussions of hasty judgments.',
    available: false,
    publicationYear: 1813,
    rating: 4.3
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'This novel depicts the Jazz Age and tells the tragic story of Jay Gatsby and his pursuit of the American Dream.',
    available: true,
    publicationYear: 1925,
    rating: 4.2
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1587583875445-14c0d37659b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'A fantasy novel about the adventures of a reluctant hero, a powerful wizard, and a treasure-seeking dragon.',
    available: true,
    publicationYear: 1937,
    rating: 4.8
  },
  {
    id: '6',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'The first book in the Harry Potter series introduces a young wizard to the hidden magical world.',
    available: false,
    publicationYear: 1997,
    rating: 4.9
  },
  {
    id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fantasy',
    description: 'An epic high-fantasy novel revolving around the struggle for control of the One Ring.',
    available: true,
    publicationYear: 1954,
    rating: 4.9
  },
  {
    id: '8',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    description: 'A teenage boy\'s experiences in New York City, exploring themes of adolescence, identity, and alienation.',
    available: true,
    publicationYear: 1951,
    rating: 4.1
  }
];

// Get all available genres
const allGenres = Array.from(new Set(booksData.map(book => book.genre)));

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState(booksData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('title');
  
  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearchQuery = params.get('search');
    
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      filterAndSortBooks(urlSearchQuery, selectedGenre, availabilityFilter, sortBy);
    }
  }, [location.search]);
  
  // Filter and sort books based on criteria
  const filterAndSortBooks = (search: string, genre: string, availability: string, sort: string) => {
    let filteredBooks = [...booksData];
    
    // Apply search filter
    if (search) {
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase()) || 
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply genre filter
    if (genre) {
      filteredBooks = filteredBooks.filter(book => book.genre === genre);
    }
    
    // Apply availability filter
    if (availability === 'available') {
      filteredBooks = filteredBooks.filter(book => book.available);
    } else if (availability === 'unavailable') {
      filteredBooks = filteredBooks.filter(book => !book.available);
    }
    
    // Apply sorting
    filteredBooks.sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year_new_to_old':
          return b.publicationYear - a.publicationYear;
        case 'year_old_to_new':
          return a.publicationYear - b.publicationYear;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
    setBooks(filteredBooks);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterAndSortBooks(searchQuery, selectedGenre, availabilityFilter, sortBy);
    
    // Update URL with search query
    navigate(`/student/catalog?search=${encodeURIComponent(searchQuery)}`);
  };
  
  // Handle filter changes
  const handleFilterChange = (filter: string, value: string) => {
    switch (filter) {
      case 'genre':
        setSelectedGenre(value);
        filterAndSortBooks(searchQuery, value, availabilityFilter, sortBy);
        break;
      case 'availability':
        setAvailabilityFilter(value);
        filterAndSortBooks(searchQuery, selectedGenre, value, sortBy);
        break;
      case 'sort':
        setSortBy(value);
        filterAndSortBooks(searchQuery, selectedGenre, availabilityFilter, value);
        break;
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setAvailabilityFilter('');
    setSortBy('title');
    setBooks(booksData);
    navigate('/student/catalog');
  };
  
  return (
    <StudentLayout title="Book Catalog">
      <div className="grid gap-6">
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input
                type="search"
                className="pl-10"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <Select
                value={selectedGenre}
                onValueChange={(value) => handleFilterChange('genre', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genres</SelectItem>
                  {allGenres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <Select
                value={availabilityFilter}
                onValueChange={(value) => handleFilterChange('availability', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Books" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Books</SelectItem>
                  <SelectItem value="available">Available Only</SelectItem>
                  <SelectItem value="unavailable">Unavailable Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <Select
                value={sortBy}
                onValueChange={(value) => handleFilterChange('sort', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="year_new_to_old">Newest First</SelectItem>
                  <SelectItem value="year_old_to_new">Oldest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Showing {books.length} books</p>
        </div>
        
        {/* Book Grid */}
        {books.length === 0 ? (
          <div className="bg-gray-50 p-12 rounded-lg text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <Button onClick={resetFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map(book => (
              <Link key={book.id} to={`/student/books/${book.id}`} className="block">
                <div className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-48 bg-gray-200">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-3 flex-grow">{book.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{book.genre}</span>
                      {book.available ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default Catalog;
