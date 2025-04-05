import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Clock, CheckCircle2, ArrowRight, BookCheck, X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { booksData, Book } from '@/data/booksData';

// Sample loans data
const loansDataSample = [
  {
    id: '1',
    bookId: '5',
    book: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://images.unsplash.com/photo-1587583875445-14c0d37659b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-04-15',
    dueDate: '2023-05-15',
    status: 'active',
    canRenew: true
  },
  {
    id: '2',
    bookId: '6',
    book: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-04-20',
    dueDate: '2023-05-04',
    status: 'overdue',
    daysOverdue: 11,
    canRenew: false
  }
];

const historyDataSample = [
  {
    id: '3',
    bookId: '1',
    book: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-02-10',
    dueDate: '2023-03-10',
    returnDate: '2023-03-08',
    status: 'returned',
    onTime: true
  },
  {
    id: '4',
    bookId: '2',
    book: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-03-01',
    dueDate: '2023-03-29',
    returnDate: '2023-04-02',
    status: 'returned',
    onTime: false,
    daysLate: 4
  }
];

const Loans = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [activeLoansList, setActiveLoansList] = useState<any[]>([]);
  const [reservationsList, setReservationsList] = useState<any[]>([]);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<{[key: string]: boolean}>({});
  
  // Load data from localStorage on component mount
  useEffect(() => {
    // Load books data to localStorage if not present
    if (!localStorage.getItem('booksData')) {
      localStorage.setItem('booksData', JSON.stringify(booksData));
    }
    
    // Load active loans
    const storedLoans = JSON.parse(localStorage.getItem('activeLoans') || '[]');
    setActiveLoansList(storedLoans.filter((loan: any) => loan.studentId === user?.id));
    
    // Load reservation requests
    const storedReservations = JSON.parse(localStorage.getItem('bookReservations') || '[]');
    setReservationsList(storedReservations.filter((res: any) => res.studentId === user?.id));
    
    // Load history
    const storedHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
    setHistoryList(storedHistory.filter((hist: any) => hist.studentId === user?.id));
    
    if (storedLoans.length === 0) {
      // For demo purposes, add sample data if empty
      localStorage.setItem('activeLoans', JSON.stringify(loansDataSample));
    }
    
    if (storedHistory.length === 0) {
      // For demo purposes, add sample data if empty
      localStorage.setItem('loanHistory', JSON.stringify(historyDataSample));
    }
  }, [user?.id]);
  
  // Calculate days remaining before due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Handle renew book
  const handleRenewBook = (loanId: string) => {
    setIsProcessing(prev => ({ ...prev, [loanId]: true }));
    
    setTimeout(() => {
      // Update the loan with new due date (extend by 14 days)
      const storedLoans = JSON.parse(localStorage.getItem('activeLoans') || '[]');
      const updatedLoans = storedLoans.map((loan: any) => {
        if (loan.id === loanId) {
          const currentDueDate = new Date(loan.dueDate);
          currentDueDate.setDate(currentDueDate.getDate() + 14);
          
          return {
            ...loan,
            dueDate: currentDueDate.toISOString().split('T')[0],
            canRenew: false // Can't renew again after this
          };
        }
        return loan;
      });
      
      localStorage.setItem('activeLoans', JSON.stringify(updatedLoans));
      setActiveLoansList(updatedLoans.filter((loan: any) => loan.studentId === user?.id));
      setIsProcessing(prev => ({ ...prev, [loanId]: false }));
      toast.success("Perpanjangan peminjaman buku berhasil untuk 14 hari lagi!");
    }, 1000);
  };
  
  // Handle cancel reservation
  const handleCancelReservation = (reservationId: string) => {
    setIsProcessing(prev => ({ ...prev, [reservationId]: true }));
    
    setTimeout(() => {
      // Get reservation data
      const storedReservations = JSON.parse(localStorage.getItem('bookReservations') || '[]');
      const reservation = storedReservations.find((r: any) => r.id === reservationId);
      
      // Update book availability if reservation is being canceled
      if (reservation) {
        const storedBooks = JSON.parse(localStorage.getItem('booksData') || '[]');
        const updatedBooks = storedBooks.map((book: any) => {
          if (book.id === reservation.bookId) {
            return {
              ...book,
              availableCopies: book.availableCopies + 1,
              available: true
            };
          }
          return book;
        });
        localStorage.setItem('booksData', JSON.stringify(updatedBooks));
      }
      
      // Remove the reservation from list
      const updatedReservations = storedReservations.filter(
        (res: any) => res.id !== reservationId
      );
      
      localStorage.setItem('bookReservations', JSON.stringify(updatedReservations));
      setReservationsList(updatedReservations.filter((res: any) => res.studentId === user?.id));
      setIsProcessing(prev => ({ ...prev, [reservationId]: false }));
      toast.success("Reservasi berhasil dibatalkan!");
    }, 1000);
  };
  
  return (
    <StudentLayout title="Peminjaman Saya">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="active" className="flex">
            <BookOpen size={16} className="mr-2" />
            Peminjaman Aktif
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex">
            <Clock size={16} className="mr-2" />
            Reservasi
          </TabsTrigger>
          <TabsTrigger value="history" className="flex">
            <CheckCircle2 size={16} className="mr-2" />
            Riwayat
          </TabsTrigger>
        </TabsList>
        
        {/* Current Loans Tab */}
        <TabsContent value="active">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Peminjaman Aktif Anda</h2>
            <p className="text-gray-600 text-sm">Buku yang saat ini Anda pinjam dari perpustakaan.</p>
          </div>
          
          {activeLoansList.length === 0 ? (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Tidak ada peminjaman aktif</h3>
              <p className="mt-2 text-gray-500">Anda belum meminjam buku saat ini.</p>
              <Link to="/student/catalog">
                <Button className="mt-4">
                  Jelajahi Katalog
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {activeLoansList.map(loan => {
                const daysRemaining = getDaysRemaining(loan.dueDate);
                const isOverdue = daysRemaining < 0;
                
                return (
                  <Card key={loan.id} className={`${isOverdue ? 'border-red-300' : ''}`}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center">
                        {/* Book Info */}
                        <div className="flex p-4 flex-1">
                          <div className="w-16 h-24 min-w-16 rounded bg-gray-200 overflow-hidden mr-4">
                            <img src={loan.coverUrl} alt={loan.book} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <Link to={`/student/books/${loan.bookId}`} className="hover:underline">
                              <h3 className="font-semibold">{loan.book}</h3>
                            </Link>
                            <p className="text-sm text-gray-600">{loan.author}</p>
                            
                            <div className="mt-2 text-xs text-gray-500">
                              Dipinjam: {loan.borrowDate}
                            </div>
                            
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">Tenggat: </span>
                              <span className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                                {loan.dueDate}
                                {isOverdue 
                                  ? ` (Terlambat ${Math.abs(daysRemaining)} hari)` 
                                  : ` (${daysRemaining} hari lagi)`}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="border-t md:border-t-0 md:border-l border-gray-100 p-4 md:min-w-48 flex flex-col items-start gap-2">
                          <Button 
                            variant="outline" 
                            className="w-full justify-between"
                            disabled={!loan.canRenew || isProcessing[loan.id]} 
                            onClick={() => handleRenewBook(loan.id)}
                          >
                            {isProcessing[loan.id] ? (
                              <span>Memproses...</span>
                            ) : (
                              <>
                                <RefreshCw size={14} className="mr-2" /> 
                                Perpanjang Pinjaman
                              </>
                            )}
                            <ArrowRight size={14} />
                          </Button>
                          
                          <Link to={`/student/books/${loan.bookId}`} className="w-full">
                            <Button variant="ghost" className="w-full justify-between">
                              <span className="flex items-center">
                                <BookCheck size={14} className="mr-2" />
                                Detail Buku
                              </span>
                              <ArrowRight size={14} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* Reservations Tab */}
        <TabsContent value="reservations">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Reservasi Anda</h2>
            <p className="text-gray-600 text-sm">Buku yang telah Anda pesan untuk dipinjam saat tersedia.</p>
          </div>
          
          {reservationsList.length === 0 ? (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Tidak ada reservasi aktif</h3>
              <p className="mt-2 text-gray-500">Anda belum memiliki permintaan buku tertunda.</p>
              <Link to="/student/catalog">
                <Button className="mt-4">
                  Jelajahi Katalog
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {reservationsList.map(reservation => (
                <Card key={reservation.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Book Info */}
                      <div className="flex p-4 flex-1">
                        <div className="w-16 h-24 min-w-16 rounded bg-gray-200 overflow-hidden mr-4">
                          <img src={reservation.coverUrl} alt={reservation.book} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link to={`/student/books/${reservation.bookId}`} className="hover:underline">
                            <h3 className="font-semibold">{reservation.book}</h3>
                          </Link>
                          <p className="text-sm text-gray-600">{reservation.author}</p>
                          
                          <div className="mt-2 text-xs text-gray-500">
                            Diminta: {reservation.requestDate}
                          </div>
                          
                          <div className="mt-1">
                            <span className={`text-xs px-2 py-1 rounded ${
                              reservation.status === 'pending' 
                                ? 'bg-blue-100 text-blue-800' 
                                : reservation.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {reservation.status === 'pending' 
                                ? 'Menunggu Persetujuan' 
                                : reservation.status === 'approved'
                                ? 'Disetujui' 
                                : 'Ditolak'}
                            </span>
                          </div>
                          
                          {reservation.estimatedAvailability && (
                            <div className="mt-2 text-sm">
                              <span className="text-xs text-gray-500">Est. Ketersediaan: </span>
                              <span className="font-medium">{reservation.estimatedAvailability}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="border-t md:border-t-0 md:border-l border-gray-100 p-4 md:min-w-48 flex flex-col items-start gap-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-between text-red-500 hover:text-red-700 hover:bg-red-50"
                          disabled={isProcessing[reservation.id] || reservation.status === 'approved'}
                          onClick={() => handleCancelReservation(reservation.id)}
                        >
                          {isProcessing[reservation.id] ? (
                            <span>Memproses...</span>
                          ) : (
                            <>
                              <X size={14} className="mr-2" /> 
                              Batalkan Permintaan
                            </>
                          )}
                          <ArrowRight size={14} />
                        </Button>
                        
                        <Link to={`/student/books/${reservation.bookId}`} className="w-full">
                          <Button variant="ghost" className="w-full justify-between">
                            <span className="flex items-center">
                              <BookCheck size={14} className="mr-2" />
                              Detail Buku
                            </span>
                            <ArrowRight size={14} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Riwayat Peminjaman Anda</h2>
            <p className="text-gray-600 text-sm">Buku yang pernah Anda pinjam dari perpustakaan.</p>
          </div>
          
          {historyList.length === 0 ? (
            <div className="bg-gray-50 p-12 rounded-lg text-center">
              <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Tidak ada riwayat peminjaman</h3>
              <p className="mt-2 text-gray-500">Anda belum pernah meminjam buku sebelumnya.</p>
              <Link to="/student/catalog">
                <Button className="mt-4">
                  Jelajahi Katalog
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {historyList.map(history => (
                <Card key={history.id}>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Book Info */}
                      <div className="flex p-4 flex-1">
                        <div className="w-16 h-24 min-w-16 rounded bg-gray-200 overflow-hidden mr-4">
                          <img src={history.coverUrl} alt={history.book} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <Link to={`/student/books/${history.bookId}`} className="hover:underline">
                            <h3 className="font-semibold">{history.book}</h3>
                          </Link>
                          <p className="text-sm text-gray-600">{history.author}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="text-xs text-gray-500">
                              Dipinjam: {history.borrowDate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tenggat: {history.dueDate}
                            </div>
                            <div className="text-xs text-gray-500">
                              Dikembalikan: {history.returnDate}
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            {history.onTime ? (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Dikembalikan tepat waktu
                              </span>
                            ) : (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Terlambat {history.daysLate} hari
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="border-t md:border-t-0 md:border-l border-gray-100 p-4 md:min-w-48 flex flex-col items-start gap-2">
                        <Link to={`/student/books/${history.bookId}`} className="w-full">
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center">
                              <BookCheck size={14} className="mr-2" />
                              Detail Buku
                            </span>
                            <ArrowRight size={14} />
                          </Button>
                        </Link>
                        
                        <Button variant="ghost" className="w-full justify-between">
                          <span className="flex items-center">
                            <RefreshCw size={14} className="mr-2" />
                            Pinjam Lagi
                          </span>
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </StudentLayout>
  );
};

export default Loans;
