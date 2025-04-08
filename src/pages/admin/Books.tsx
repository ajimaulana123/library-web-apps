import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Link } from 'react-router-dom';
import { prisma } from '@/lib/db';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Type for Book
type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: string;
  condition: string;
  coverUrl: string | null;
};

const Books = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all_statuses');
  const [genreFilter, setGenreFilter] = useState('all_genres');
  const [conditionFilter, setConditionFilter] = useState('all_conditions');
  const queryClient = useQueryClient();

  // Fetch books query
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('/api/books');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Delete book mutation
  const deleteMutation = useMutation({
    mutationFn: async (bookId: string) => {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all_statuses' || book.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesGenre = genreFilter === 'all_genres' || book.genre.toLowerCase() === genreFilter.toLowerCase();
    const matchesCondition = conditionFilter === 'all_conditions' || book.condition.toLowerCase() === conditionFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesGenre && matchesCondition;
  });

  const handleDeleteBook = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteMutation.mutateAsync(bookId);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Manajemen Buku">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manajemen Buku">
      {/* Search & Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Cari buku berdasarkan judul atau penulis..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_statuses">Semua Status</SelectItem>
                <SelectItem value="tersedia">Tersedia</SelectItem>
                <SelectItem value="dipinjam">Dipinjam</SelectItem>
                <SelectItem value="dipesan">Dipesan</SelectItem>
                <SelectItem value="hilang">Hilang/Rusak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_genres">Semua Genre</SelectItem>
                <SelectItem value="fiksi">Fiksi</SelectItem>
                <SelectItem value="fiksi ilmiah">Fiksi Ilmiah</SelectItem>
                <SelectItem value="fantasi">Fantasi</SelectItem>
                <SelectItem value="non-fiksi">Non-Fiksi</SelectItem>
                <SelectItem value="biografi">Biografi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kondisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_conditions">Semua Kondisi</SelectItem>
                <SelectItem value="sangat baik">Sangat Baik</SelectItem>
                <SelectItem value="baik">Baik</SelectItem>
                <SelectItem value="cukup">Cukup</SelectItem>
                <SelectItem value="buruk">Buruk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Books Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Sampul</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kondisi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
                    {book.coverUrl && (
                      <img 
                        src={book.coverUrl} 
                        alt={`Sampul ${book.title}`} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.status === 'Tersedia' ? 'bg-green-100 text-green-800' :
                    book.status === 'Dipinjam' ? 'bg-blue-100 text-blue-800' :
                    book.status === 'Dipesan' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {book.status}
                  </span>
                </TableCell>
                <TableCell>{book.condition}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/books/edit/${book.id}`}>
                        <Edit size={16} className="text-blue-500" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteBook(book.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium">1</span> hingga <span className="font-medium">{filteredBooks.length}</span> dari <span className="font-medium">{books.length}</span> buku
        </p>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      
      {/* Floating Action Button */}
      <Link to="/admin/books/add">
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
          <Plus size={24} />
        </Button>
      </Link>
    </AdminLayout>
  );
};

export default Books;
