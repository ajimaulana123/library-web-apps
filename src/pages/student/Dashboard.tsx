
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentLayout from '../../components/student/StudentLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, CalendarClock, BookMarked, BookPlus } from 'lucide-react';

// Sample recently added books
const recentBooks = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    available: true
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Science Fiction',
    available: true
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Romance',
    available: false
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    genre: 'Fiction',
    available: true
  }
];

// Sample current loans
const currentLoans = [
  {
    id: '1',
    book: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://images.unsplash.com/photo-1587583875445-14c0d37659b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-04-15',
    dueDate: '2023-05-15',
    status: 'active'
  },
  {
    id: '2',
    book: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    coverUrl: 'https://images.unsplash.com/photo-1609866138210-84bb689f3c61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    borrowDate: '2023-04-20',
    dueDate: '2023-05-04',
    status: 'overdue'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <StudentLayout title="Student Dashboard">
      <div className="grid gap-6">
        {/* Welcome Message */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name || 'Student'}!</h2>
          <p className="text-gray-600">
            Here's an overview of your library activities. You currently have {currentLoans.length} books borrowed.
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">{currentLoans.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Overdue Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-red-500 mr-2" />
                <span className="text-2xl font-bold">{currentLoans.filter(loan => loan.status === 'overdue').length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Reading History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookMarked className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-2xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Days Until Next Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarClock className="h-6 w-6 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">7</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Current Loans Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Current Loans</h2>
            <Link to="/student/loans">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLoans.length === 0 ? (
              <div className="col-span-2 bg-gray-50 p-8 rounded-lg text-center">
                <p className="text-gray-500">You don't have any books borrowed at the moment.</p>
                <Link to="/student/catalog">
                  <Button className="mt-4">Browse Catalog</Button>
                </Link>
              </div>
            ) : (
              currentLoans.map(loan => (
                <Card key={loan.id} className={`${loan.status === 'overdue' ? 'border-red-300' : ''}`}>
                  <div className="flex p-4">
                    <div className="w-16 h-24 min-w-16 rounded bg-gray-200 overflow-hidden mr-4">
                      <img src={loan.coverUrl} alt={loan.book} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{loan.book}</h3>
                      <p className="text-sm text-gray-600">{loan.author}</p>
                      <div className="flex flex-col mt-2">
                        <span className="text-xs text-gray-500">Due Date:</span>
                        <span className={`text-sm ${loan.status === 'overdue' ? 'text-red-600 font-medium' : ''}`}>
                          {loan.dueDate} {loan.status === 'overdue' && '(Overdue)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
        
        {/* Recently Added Books */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recently Added to Library</h2>
            <Link to="/student/catalog">
              <Button variant="outline" size="sm">View Catalog</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recentBooks.map(book => (
              <Link key={book.id} to={`/student/books/${book.id}`}>
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-gray-600">{book.author}</p>
                    <div className="flex justify-between items-center mt-2">
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
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/student/catalog">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <BookPlus className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <h3 className="font-semibold">Browse Catalog</h3>
                  <p className="text-sm text-gray-600">Discover new books to borrow</p>
                </div>
              </div>
            </Link>
            
            <Link to="/student/loans">
              <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <BookOpen className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <h3 className="font-semibold">Manage Loans</h3>
                  <p className="text-sm text-gray-600">View and manage your borrowed books</p>
                </div>
              </div>
            </Link>
            
            <div className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <BookMarked className="h-10 w-10 text-purple-500 mr-4" />
              <div>
                <h3 className="font-semibold">Reading History</h3>
                <p className="text-sm text-gray-600">View your past reading activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
