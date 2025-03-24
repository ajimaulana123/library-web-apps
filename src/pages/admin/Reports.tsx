
import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download, ArrowDownToDot, BookOpen, BarChart, PieChart } from 'lucide-react';
import { toast } from 'sonner';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data for Monthly Borrowing Chart
const monthlyBorrowingData = [
  { name: 'Jan', borrowed: 65, returned: 55 },
  { name: 'Feb', borrowed: 59, returned: 52 },
  { name: 'Mar', borrowed: 80, returned: 72 },
  { name: 'Apr', borrowed: 81, returned: 74 },
  { name: 'May', borrowed: 56, returned: 48 },
  { name: 'Jun', borrowed: 55, returned: 50 },
  { name: 'Jul', borrowed: 40, returned: 37 },
];

// Sample data for Genre Distribution Chart
const genreDistributionData = [
  { name: 'Fiction', value: 35 },
  { name: 'Non-Fiction', value: 20 },
  { name: 'Fantasy', value: 15 },
  { name: 'Science Fiction', value: 10 },
  { name: 'Biography', value: 10 },
  { name: 'History', value: 5 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Reports = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2023, 0, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  
  // Handle export reports
  const handleExportReport = (type: string) => {
    toast.success(`Exporting ${type} report...`);
    setTimeout(() => {
      toast.success(`${type} report exported successfully!`);
    }, 1500);
  };
  
  return (
    <AdminLayout title="Reports">
      {/* Date Range Selector and Export Options */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button className="md:ml-auto">
            Apply Date Range
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Export Reports</h3>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleExportReport('Overdue Books')}
            >
              <Download size={16} className="mr-2" />
              Overdue Books (PDF)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExportReport('Borrowing Trends')}
            >
              <ArrowDownToDot size={16} className="mr-2" />
              Borrowing Trends (CSV)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExportReport('Popular Books')}
            >
              <BookOpen size={16} className="mr-2" />
              Popular Books (Excel)
            </Button>
          </div>
        </div>
      </div>
      
      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Borrowing Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <BarChart size={20} className="text-blue-500 mr-2" />
              Monthly Borrowing Volume
            </h3>
            <Button variant="ghost" size="sm">
              <Download size={16} />
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                width={500}
                height={300}
                data={monthlyBorrowingData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="borrowed" fill="#3b82f6" name="Books Borrowed" />
                <Bar dataKey="returned" fill="#10b981" name="Books Returned" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Genre Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <PieChart size={20} className="text-blue-500 mr-2" />
              Book Genre Distribution
            </h3>
            <Button variant="ghost" size="sm">
              <Download size={16} />
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart width={400} height={400}>
                <Pie
                  data={genreDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Most Borrowed Books */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Most Borrowed Books</h3>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Borrows
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Harry Potter and the Philosopher's Stone</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">J.K. Rowling</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fantasy</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">To Kill a Mockingbird</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Harper Lee</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fiction</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1984</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">George Orwell</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Science Fiction</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The Great Gatsby</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">F. Scott Fitzgerald</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fiction</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">29</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">The Hobbit</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">J.R.R. Tolkien</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fantasy</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">26</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
