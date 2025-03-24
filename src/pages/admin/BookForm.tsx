
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Upload, Barcode } from 'lucide-react';
import { toast } from 'sonner';

// Sample book for edit mode
const sampleBook = {
  id: '1',
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  isbn: '9780061120084',
  publishedYear: '1960',
  genre: 'Fiction',
  description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
  quantity: 3,
  condition: 'Good',
  coverUrl: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
};

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // Initialize form state
  const [formData, setFormData] = useState(
    isEditMode 
      ? sampleBook 
      : {
          title: '',
          author: '',
          isbn: '',
          publishedYear: '',
          genre: '',
          description: '',
          quantity: 1,
          condition: 'Good',
          coverUrl: ''
        }
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(isEditMode ? sampleBook.coverUrl : null);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData(prev => ({ ...prev, coverUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(isEditMode ? 'Book updated successfully!' : 'Book added successfully!');
      navigate('/admin/books');
    }, 1000);
  };
  
  // Handle ISBN scanner
  const handleScanISBN = () => {
    // This would normally integrate with a barcode scanner
    // For demo purposes, we'll just set a sample ISBN
    toast.success('ISBN scanned successfully!');
    setFormData(prev => ({ ...prev, isbn: '9781234567897' }));
  };
  
  return (
    <AdminLayout title={isEditMode ? 'Edit Book' : 'Add New Book'}>
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/admin/books')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Books
        </Button>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cover Image Upload */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4 overflow-hidden">
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Book cover preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <Upload size={40} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload cover image</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF</p>
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Label
                    htmlFor="coverImage"
                    className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                  >
                    {previewImage ? 'Change Image' : 'Upload Image'}
                  </Label>
                </div>
              </div>
              
              {/* Book Details Form */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ISBN Input with Scanner */}
                  <div className="col-span-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <div className="flex">
                      <Input
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        placeholder="Enter ISBN"
                        className="flex-grow"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="ml-2" 
                        onClick={handleScanISBN}
                      >
                        <Barcode size={16} className="mr-2" />
                        Scan
                      </Button>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  
                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  
                  {/* Published Year */}
                  <div>
                    <Label htmlFor="publishedYear">Published Year</Label>
                    <Input
                      id="publishedYear"
                      name="publishedYear"
                      value={formData.publishedYear}
                      onChange={handleChange}
                      placeholder="YYYY"
                    />
                  </div>
                  
                  {/* Genre */}
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select 
                      value={formData.genre} 
                      onValueChange={(value) => handleSelectChange('genre', value)}
                    >
                      <SelectTrigger id="genre">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                        <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Biography">Biography</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Poetry">Poetry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Condition */}
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select 
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange('condition', value)}
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter book description"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end mt-6 space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/books')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEditMode ? 'Update Book' : 'Add Book'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookForm;
