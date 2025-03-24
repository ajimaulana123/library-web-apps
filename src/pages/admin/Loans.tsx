
import { useState } from 'react';
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
import { Search, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Sample loan data
const activeLoansSample = [
  {
    id: '1',
    student: 'Emma Watson',
    studentPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
    book: 'To Kill a Mockingbird',
    bookId: '1',
    borrowDate: '2023-05-01',
    dueDate: '2023-05-15',
    status: 'active'
  },
  {
    id: '2',
    student: 'John Smith',
    studentPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
    book: 'The Great Gatsby',
    bookId: '3',
    borrowDate: '2023-05-03',
    dueDate: '2023-05-17',
    status: 'active'
  },
  {
    id: '3',
    student: 'Sarah Williams',
    studentPhoto: 'https://randomuser.me/api/portraits/women/67.jpg',
    book: 'Pride and Prejudice',
    bookId: '5',
    borrowDate: '2023-05-05',
    dueDate: '2023-05-19',
    status: 'active'
  }
];

const overdueLoansSample = [
  {
    id: '4',
    student: 'David Johnson',
    studentPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
    book: '1984',
    bookId: '2',
    borrowDate: '2023-04-20',
    dueDate: '2023-05-04',
    daysOverdue: 11,
    status: 'overdue'
  },
  {
    id: '5',
    student: 'Michael Brown',
    studentPhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
    book: 'The Catcher in the Rye',
    bookId: '6',
    borrowDate: '2023-04-22',
    dueDate: '2023-05-06',
    daysOverdue: 9,
    status: 'overdue'
  }
];

const returnedLoansSample = [
  {
    id: '6',
    student: 'Jennifer Lopez',
    studentPhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
    book: 'Harry Potter',
    bookId: '7',
    borrowDate: '2023-04-15',
    dueDate: '2023-04-29',
    returnDate: '2023-04-27',
    status: 'returned'
  },
  {
    id: '7',
    student: 'Robert Davis',
    studentPhoto: 'https://randomuser.me/api/portraits/men/41.jpg',
    book: 'The Hobbit',
    bookId: '8',
    borrowDate: '2023-04-18',
    dueDate: '2023-05-02',
    returnDate: '2023-05-01',
    status: 'returned'
  }
];

const Loans = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter loans based on search
  const filterLoans = (loans: any[]) => {
    if (!searchQuery) return loans;
    
    return loans.filter(loan => 
      loan.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loan.book.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filteredActiveLoans = filterLoans(activeLoansSample);
  const filteredOverdueLoans = filterLoans(overdueLoansSample);
  const filteredReturnedLoans = filterLoans(returnedLoansSample);
  
  // Handle return book
  const handleReturnBook = (loanId: string) => {
    toast.success('Book marked as returned successfully!');
    // In a real app, you would update the loan status here
  };
  
  // Handle extend loan
  const handleExtendLoan = (loanId: string) => {
    toast.success('Loan extended for 7 more days!');
    // In a real app, you would update the due date here
  };
  
  // Handle send reminder
  const handleSendReminder = (loanId: string) => {
    toast.success('Reminder sent to the student!');
    // In a real app, you would send a notification to the student
  };
  
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
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active" className="flex">
                <CheckCircle2 size={16} className="mr-2" />
                Active Loans
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
