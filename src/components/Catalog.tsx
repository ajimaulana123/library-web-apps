
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample featured books
const featuredBooks = [
  {
    id: '1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiksi'
  },
  {
    id: '2',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiksi Sejarah'
  },
  {
    id: '3',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Filsafat'
  },
  {
    id: '4',
    title: 'Pulang',
    author: 'Tere Liye',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiksi'
  }
];

const Catalog = () => {
  return (
    <section id="catalog" className="py-16 bg-gray-50">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Katalog Buku
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
            Temukan Buku Baru Favorit Anda
          </h2>
          <p className="text-lg text-gray-600">
            Jelajahi koleksi buku kami yang terus berkembang dengan judul-judul terbaru dan klasik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredBooks.map(book => (
            <div key={book.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{book.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/student/catalog">
            <Button className="px-6">
              <BookOpen size={16} className="mr-2" />
              Lihat Semua Buku
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
