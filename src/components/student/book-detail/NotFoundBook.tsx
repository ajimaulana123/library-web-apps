
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundBook = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <h2 className="text-xl font-semibold mb-4">Buku tidak ditemukan</h2>
      <p className="text-gray-600 mb-6">Buku yang Anda cari tidak ada atau telah dihapus.</p>
      <Link to="/student/catalog">
        <Button>Kembali ke Katalog</Button>
      </Link>
    </div>
  );
};

export default NotFoundBook;
