import { BookForm } from '@/components/BookForm'

export default function NewBookPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <BookForm mode="create" />
    </div>
  )
} 