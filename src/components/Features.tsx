
import { Book, Users, Clock } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Fitur-Fitur
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
            Semua yang Anda butuhkan untuk perpustakaan sekolah Anda
          </h2>
          <p className="text-lg text-gray-600">
            Platform kami menawarkan rangkaian lengkap alat untuk mengelola dan mengakses sumber daya perpustakaan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Book size={24} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Katalog Digital</h3>
            <p className="text-gray-600">
              Jelajahi koleksi lengkap buku, jurnal, dan sumber daya digital kami secara online.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
              <Users size={24} className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Profil Pengguna</h3>
            <p className="text-gray-600">
              Akun yang dipersonalisasi untuk siswa dan staf dengan riwayat peminjaman dan rekomendasi.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Clock size={24} className="text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Akses 24/7</h3>
            <p className="text-gray-600">
              Akses perpustakaan kapan saja, di mana saja dengan platform yang ramah perangkat mobile kami.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
