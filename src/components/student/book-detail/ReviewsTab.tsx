
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsTabProps {
  reviews: Review[];
}

const ReviewsTab = ({ reviews }: ReviewsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Reader Reviews</h3>
      </CardHeader>
      <CardContent>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{review.user}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet for this book.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Write a Review</Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewsTab;
