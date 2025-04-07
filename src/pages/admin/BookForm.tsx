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
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  
  // Initialize form state to match Prisma schema
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
    genre: '',
    status: 'Tersedia',
    condition: 'Baik',
    quantity: 1,
    description: '',
    coverUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Create book mutation
  const createBookMutation = useMutation({
    mutationFn: async (bookData: typeof formData) => {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create book');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Buku berhasil ditambahkan!');
      navigate('/admin/books');
    },
    onError: (error) => {
      console.error('Error creating book:', error);
      toast.error('Gagal menambahkan buku. Silakan coba lagi.');
    },
  });
  
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBookMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  // Handle ISBN scanner
  const handleScanISBN = () => {
    // This would normally integrate with a barcode scanner
    // For demo purposes, we'll just set a sample ISBN
    toast.success('ISBN scanned successfully!');
    setFormData(prev => ({ ...prev, isbn: '9781234567897' }));
  };
  
  return (
    <AdminLayout title={isEditMode ? 'Edit Buku' : 'Tambah Buku Baru'}>
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate('/admin/books')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Kembali ke Daftar Buku
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
                        <p className="text-sm text-gray-500">Upload sampul buku</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG atau GIF</p>
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
                    {previewImage ? 'Ganti Gambar' : 'Upload Gambar'}
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
                    <Label htmlFor="title">Judul</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Masukkan judul buku"
                      required
                    />
                  </div>
                  
                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Penulis</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Masukkan nama penulis"
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
                        <SelectValue placeholder="Pilih genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiksi">Fiksi</SelectItem>
                        <SelectItem value="Non-Fiksi">Non-Fiksi</SelectItem>
                        <SelectItem value="Fiksi Ilmiah">Fiksi Ilmiah</SelectItem>
                        <SelectItem value="Fantasi">Fantasi</SelectItem>
                        <SelectItem value="Biografi">Biografi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Condition */}
                  <div>
                    <Label htmlFor="condition">Kondisi</Label>
                    <Select 
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange('condition', value)}
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Pilih kondisi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sangat Baik">Sangat Baik</SelectItem>
                        <SelectItem value="Baik">Baik</SelectItem>
                        <SelectItem value="Cukup">Cukup</SelectItem>
                        <SelectItem value="Buruk">Buruk</SelectItem>
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
              <Button 
                type="submit" 
                className="w-full"
                disabled={createBookMutation.isPending}
              >
                {createBookMutation.isPending ? 'Menambahkan Buku...' : 'Tambah Buku'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookForm;
