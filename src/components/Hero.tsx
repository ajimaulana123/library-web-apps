
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-16 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="section-container pt-16 pb-12">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-slow">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            Perpustakaan Sekolah Online
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Perpustakaan Sekolah Online Anda
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Akses sumber daya perpustakaan sekolah Anda kapan saja, di mana saja. Jelajahi, pinjam, dan belajar dengan platform perpustakaan digital kami yang komprehensif.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary animate-fade-in" style={{ animationDelay: '200ms' }}>
              Mulai Sekarang
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors animate-fade-in" style={{ animationDelay: '400ms' }}>
              Pelajari Lebih Lanjut <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
