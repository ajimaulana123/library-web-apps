
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface DetailsTabProps {
  book: {
    description: string;
    isbn: string;
    publisher: string;
    language: string;
    totalCopies: number;
    availableCopies: number;
  };
}

const DetailsTab = ({ book }: DetailsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Description</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Additional Information</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">ISBN</h4>
              <p>{book.isbn}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Publisher</h4>
              <p>{book.publisher}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Language</h4>
              <p>{book.language}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Total Copies</h4>
              <p>{book.totalCopies}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Availability</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${book.availableCopies > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium">
              {book.availableCopies} of {book.totalCopies} available
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsTab;
