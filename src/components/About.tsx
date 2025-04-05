
import { Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Tentang Kami
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
            Perpustakaan Untuk Semua
          </h2>
          <p className="text-lg text-gray-600">
            Kami berkomitmen untuk menyediakan akses ke pendidikan dan pengetahuan bagi semua siswa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Misi Kami</h3>
            <p className="text-gray-700 mb-4">
              Menyediakan akses mudah dan cepat ke berbagai sumber daya pendidikan dan literatur untuk mendukung pembelajaran dan penelitian di sekolah kami.
            </p>
            <p className="text-gray-700 mb-4">
              Kami percaya bahwa perpustakaan modern harus dapat diakses oleh semua orang, di mana saja dan kapan saja.
            </p>
            
            <h3 className="text-2xl font-semibold mb-4 mt-8">Tim Kami</h3>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium">Tim Pustakawan Profesional</h4>
                <p className="text-sm text-gray-600">Selalu siap membantu Anda menemukan buku yang tepat</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Statistik Perpustakaan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">10,000+</p>
                <p className="text-sm text-gray-600">Judul Buku</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">5,000+</p>
                <p className="text-sm text-gray-600">Pengguna Aktif</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">1,000+</p>
                <p className="text-sm text-gray-600">E-book</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">24/7</p>
                <p className="text-sm text-gray-600">Akses Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
