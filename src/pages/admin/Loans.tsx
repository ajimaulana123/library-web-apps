
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Calendar, CheckCircle2, AlertCircle, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

const Loans = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLoans, setActiveLoans] = useState<any[]>([]);
  const [overdueLoans, setOverdueLoans] = useState<any[]>([]);
  const [returnedLoans, setReturnedLoans] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    // Load active loans
    const storedLoans = JSON.parse(localStorage.getItem('activeLoans') || '[]');
    
    // Separate active and overdue loans
    const today = new Date();
    const active: any[] = [];
    const overdue: any[] = [];
    
    storedLoans.forEach((loan: any) => {
      const dueDate = new Date(loan.dueDate);
      if (dueDate < today) {
        // Calculate days overdue
        const diffTime = Math.abs(today.getTime() - dueDate.getTime());
        const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        overdue.push({ ...loan, daysOverdue });
      } else {
        active.push(loan);
      }
    });
    
    setActiveLoans(active);
    setOverdueLoans(overdue);
    
    // Load returned loans
    const storedHistory = JSON.parse(localStorage.getItem('loanHistory') || '[]');
    setReturnedLoans(storedHistory);
    
    // Load pending requests
    const storedRequests = JSON.parse(localStorage.getItem('bookReservations') || '[]');
    setPendingRequests(storedRequests.filter((req: any) => req.status === 'pending'));
  };
  
  // Filter loans based on search
  const filterLoans = (loans: any[]) => {
    if (!searchQuery) return loans;
    
    return loans.filter(loan => 
      loan.student?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loan.book?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.studentName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Handle return book
  const handleReturnBook = (loanId: string) => {
    // Get the loan data
    const loan = activeLoans.find(l => l.id === loanId) || 
                overdueLoans.find(l => l.id === loanId);
    
    if (!loan) return;
    
    // Add to history with return date
    const returnedLoan = {
      ...loan,
      returnDate: new Date().toISOString().split('T')[0],
      status: 'returned',
      onTime: new Date(loan.dueDate) >= new Date()
    };
    
    // Add to history
    const history = JSON.parse(localStorage.getItem('loanHistory') || '[]');
    localStorage.setItem('loanHistory', JSON.stringify([...history, returnedLoan]));
    
    // Remove from active loans
    const activeLoansData = JSON.parse(localStorage.getItem('activeLoans') || '[]');
    const updatedActiveLoans = activeLoansData.filter((l: any) => l.id !== loanId);
    localStorage.setItem('activeLoans', JSON.stringify(updatedActiveLoans));
    
    // Update book availability
    const books = JSON.parse(localStorage.getItem('booksData') || '[]');
    const updatedBooks = books.map((book: any) => {
      if (book.id === loan.bookId) {
        const newAvailableCopies = book.availableCopies + 1;
        return {
          ...book,
          availableCopies: newAvailableCopies,
          available: newAvailableCopies > 0
        };
      }
      return book;
    });
    localStorage.setItem('booksData', JSON.stringify(updatedBooks));
    
    // Refresh data
    loadData();
    toast.success('Buku berhasil ditandai sebagai dikembalikan!');
  };
  
  // Handle extend loan
  const handleExtendLoan = (loanId: string) => {
    // Update due date
    const activeLoansData = JSON.parse(localStorage.getItem('activeLoans') || '[]');
    const updatedActiveLoans = activeLoansData.map((loan: any) => {
      if (loan.id === loanId) {
        const currentDueDate = new Date(loan.dueDate);
        currentDueDate.setDate(currentDueDate.getDate() + 7);
        
        return {
          ...loan,
          dueDate: currentDueDate.toISOString().split('T')[0],
          canRenew: false
        };
      }
      return loan;
    });
    
    localStorage.setItem('activeLoans', JSON.stringify(updatedActiveLoans));
    loadData();
    toast.success('Perpanjangan berhasil untuk 7 hari ke depan!');
  };
  
  // Handle send reminder
  const handleSendReminder = (loanId: string) => {
    toast.success('Pengingat telah dikirim ke mahasiswa!');
  };
  
  // Handle approve loan request
  const handleApproveLoan = (requestId: string) => {
    // Get the request data
    const request = pendingRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Move request to active loans
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days from now
    
    const newLoan = {
      id: request.id,
      bookId: request.bookId,
      book: request.book,
      author: request.author,
      coverUrl: request.coverUrl,
      studentId: request.studentId,
      student: request.studentName,
      studentPhoto: 'https://randomuser.me/api/portraits/men/32.jpg', // Default photo
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'active',
      canRenew: true
    };
    
    // Add to active loans
    const activeLoansData = JSON.parse(localStorage.getItem('activeLoans') || '[]');
    localStorage.setItem('activeLoans', JSON.stringify([...activeLoansData, newLoan]));
    
    // Update request status to approved
    const requests = JSON.parse(localStorage.getItem('bookReservations') || '[]');
    const updatedRequests = requests.map((req: any) => {
      if (req.id === requestId) {
        return { ...req, status: 'approved' };
      }
      return req;
    });
    localStorage.setItem('bookReservations', JSON.stringify(updatedRequests));
    
    // Refresh data
    loadData();
    toast.success('Permintaan peminjaman berhasil disetujui!');
  };
  
  // Handle reject loan request
  const handleRejectLoan = (requestId: string) => {
    // Get the request data to restore book availability
    const request = pendingRequests.find(req => req.id === requestId);
    if (!request) return;
    
    // Update book availability
    const books = JSON.parse(localStorage.getItem('booksData') || '[]');
    const updatedBooks = books.map((book: any) => {
      if (book.id === request.bookId) {
        const newAvailableCopies = book.availableCopies + 1;
        return {
          ...book,
          availableCopies: newAvailableCopies,
          available: newAvailableCopies > 0
        };
      }
      return book;
    });
    localStorage.setItem('booksData', JSON.stringify(updatedBooks));
    
    // Update request status to rejected
    const requests = JSON.parse(localStorage.getItem('bookReservations') || '[]');
    const updatedRequests = requests.map((req: any) => {
      if (req.id === requestId) {
        return { ...req, status: 'rejected' };
      }
      return req;
    });
    localStorage.setItem('bookReservations', JSON.stringify(updatedRequests));
    
    // Refresh data
    loadData();
    toast.success('Permintaan peminjaman ditolak!');
  };
  
  const filteredActiveLoans = filterLoans(activeLoans);
  const filteredOverdueLoans = filterLoans(overdueLoans);
  const filteredReturnedLoans = filterLoans(returnedLoans);
  const filteredPendingRequests = filterLoans(pendingRequests);
  
  return (
    <AdminLayout title="Loan Management">
      {/* Search Bar */}
      <div className="mb-6 flex">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search by student or book..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Tabs defaultValue="active" onValueChange={setActiveTab} value={activeTab}>
          <div className="px-4 pt-4">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="pending" className="flex">
                <Clock size={16} className="mr-2" />
                Pending
                {pendingRequests.length > 0 && (
                  <span className="ml-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {pendingRequests.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="active" className="flex">
                <CheckCircle2 size={16} className="mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger value="overdue" className="flex">
                <AlertCircle size={16} className="mr-2" />
                Overdue
              </TabsTrigger>
              <TabsTrigger value="returned" className="flex">
                <CheckCircle2 size={16} className="mr-2" />
                Returned
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Pending Requests Tab */}
          <TabsContent value="pending" className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No pending requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-800 font-medium text-xs">
                              {request.studentName?.charAt(0) || 'S'}
                            </span>
                          </div>
                          <span className="font-medium">{request.studentName || 'Student'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.book}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-blue-500" />
                          {request.requestDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                            onClick={() => handleApproveLoan(request.id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={() => handleRejectLoan(request.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Active Loans Tab */}
          <TabsContent value="active" className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActiveLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No active loans found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredActiveLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img 
                              src={loan.studentPhoto} 
                              alt={loan.student} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{loan.student}</span>
                        </div>
                      </TableCell>
                      <TableCell>{loan.book}</TableCell>
                      <TableCell>{loan.borrowDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-blue-500" />
                          {loan.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleReturnBook(loan.id)}
                          >
                            Mark Returned
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleExtendLoan(loan.id)}
                          >
                            Extend Loan
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Overdue Loans Tab */}
          <TabsContent value="overdue" className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOverdueLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No overdue loans found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOverdueLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img 
                              src={loan.studentPhoto} 
                              alt={loan.student} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{loan.student}</span>
                        </div>
                      </TableCell>
                      <TableCell>{loan.book}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-red-500">
                          <Calendar size={14} className="mr-1" />
                          {loan.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-500 font-medium">{loan.daysOverdue} days</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleReturnBook(loan.id)}
                          >
                            Mark Returned
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => handleSendReminder(loan.id)}
                          >
                            Send Reminder
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Returned Loans Tab */}
          <TabsContent value="returned" className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student</TableHead>
                  <TableHead>Book</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturnedLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No returned loans found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReturnedLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img 
                              src={loan.studentPhoto} 
                              alt={loan.student} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">{loan.student}</span>
                        </div>
                      </TableCell>
                      <TableCell>{loan.book}</TableCell>
                      <TableCell>{loan.borrowDate}</TableCell>
                      <TableCell>{loan.returnDate}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Returned
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Loans;
