
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

interface RelatedBooksTabProps {
  relatedBooks: RelatedBook[];
}

const RelatedBooksTab = ({ relatedBooks }: RelatedBooksTabProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Similar Books You Might Enjoy</h3>
      </CardHeader>
      <CardContent>
        {relatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedBooks.map(relBook => (
              <Link key={relBook.id} to={`/student/books/${relBook.id}`}>
                <div className="flex border rounded-lg overflow-hidden hover:bg-gray-50 transition-colors">
                  <div className="w-20 h-28 min-w-20 bg-gray-200">
                    <img src={relBook.coverUrl} alt={relBook.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium line-clamp-1">{relBook.title}</h4>
                    <p className="text-sm text-gray-600">{relBook.author}</p>
                    <div className="flex items-center mt-1">
                      <Star size={12} className="text-yellow-500 mr-1" />
                      <span className="text-xs">{relBook.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No related books found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedBooksTab;
