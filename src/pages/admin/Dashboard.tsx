
import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowUp, ArrowDown, Book, BookOpen, Clock, Plus, RefreshCcw,
  FileText, AlertTriangle, UserCheck, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, change, icon, color }: { 
  title: string; 
  value: string | number; 
  change?: number; 
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center">
          {change > 0 ? (
            <ArrowUp size={14} className="text-green-500 mr-1" />
          ) : (
            <ArrowDown size={14} className="text-red-500 mr-1" />
          )}
          <span className={`text-xs font-medium ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}% from last month
          </span>
        </div>
      )}
    </div>
  );
};

const ActivityItem = ({ time, description, icon }: {
  time: string;
  description: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start mb-4">
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-800">{description}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [overdueLoans] = useState([
    { id: 1, student: 'Emma Watson', book: 'The Great Gatsby', days: 7 },
    { id: 2, student: 'John Smith', book: 'To Kill a Mockingbird', days: 3 },
    { id: 3, student: 'David Johnson', book: '1984', days: 5 },
    { id: 4, student: 'Sarah Williams', book: 'Pride and Prejudice', days: 2 },
    { id: 5, student: 'Michael Brown', book: 'The Catcher in the Rye', days: 9 },
  ]);

  const [pendingApprovals] = useState([
    { id: 1, student: 'Lisa Anderson', book: 'Harry Potter', date: '2023-05-15' },
    { id: 2, student: 'Kevin Lee', book: 'The Hobbit', date: '2023-05-16' },
  ]);

  const [activities] = useState([
    { id: 1, time: '10 minutes ago', description: 'Student Jane Doe borrowed "Lord of the Rings"', icon: <BookOpen size={16} className="text-blue-600" /> },
    { id: 2, time: '1 hour ago', description: 'Book "1984" was marked as returned', icon: <RefreshCcw size={16} className="text-green-600" /> },
    { id: 3, time: '3 hours ago', description: 'Added 5 new copies of "Harry Potter"', icon: <Plus size={16} className="text-purple-600" /> },
    { id: 4, time: 'Yesterday', description: 'Generated monthly borrowing report', icon: <FileText size={16} className="text-indigo-600" /> },
  ]);

  return (
    <AdminLayout title="Dashboard">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Books" 
          value="1,249" 
          change={5.2} 
          icon={<Book size={18} className="text-white" />}
          color="bg-blue-500"
        />
        <StatCard 
          title="Active Loans" 
          value="342" 
          change={-2.5} 
          icon={<BookOpen size={18} className="text-white" />}
          color="bg-green-500"
        />
        <StatCard 
          title="Overdue Books" 
          value="24" 
          change={8.1} 
          icon={<Clock size={18} className="text-white" />}
          color="bg-red-500"
        />
        <StatCard 
          title="New Requests" 
          value="18" 
          icon={<Bell size={18} className="text-white" />}
          color="bg-yellow-500"
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-3">
        <Button>
          <Plus size={16} className="mr-2" />
          Add New Book
        </Button>
        <Button variant="outline">
          <RefreshCcw size={16} className="mr-2" />
          Process Returns
        </Button>
        <Button variant="outline">
          <FileText size={16} className="mr-2" />
          Generate Monthly Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority Alerts Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="border-b px-6 py-3">
              <h2 className="font-semibold text-gray-800 flex items-center">
                <AlertTriangle size={18} className="text-red-500 mr-2" />
                Overdue Loans
              </h2>
            </div>
            <div className="p-6">
              <div className="divide-y">
                {overdueLoans.map((loan) => (
                  <div key={loan.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{loan.student}</p>
                      <p className="text-sm text-gray-600">"{loan.book}"</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-500 font-medium mr-4">{loan.days} days</span>
                      <Button size="sm" variant="outline">Send Reminder</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-3">
              <h2 className="font-semibold text-gray-800 flex items-center">
                <UserCheck size={18} className="text-blue-500 mr-2" />
                Pending Approvals
              </h2>
            </div>
            <div className="p-6">
              <div className="divide-y">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{approval.student}</p>
                      <p className="text-sm text-gray-600">"{approval.book}" - Requested on {approval.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-50">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-3">
              <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-6">
              {activities.map((activity) => (
                <ActivityItem 
                  key={activity.id} 
                  time={activity.time} 
                  description={activity.description} 
                  icon={activity.icon} 
                />
              ))}
              <Button variant="outline" className="w-full mt-4">View All Activity</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
