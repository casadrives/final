import React, { useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

interface RideReviewProps {
  rideId: string;
  driverName: string;
  driverPhoto?: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    rideId: string;
  }) => Promise<void>;
  onClose: () => void;
}

export function RideReview({ rideId, driverName, driverPhoto, onSubmit, onClose }: RideReviewProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        rating,
        comment,
        rideId
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Your Ride</h2>

        <div className="flex items-center space-x-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {driverPhoto ? (
              <img src={driverPhoto} alt={driverName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-gray-600">{driverName[0]}</span>
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">How was your ride with {driverName}?</p>
            <p className="text-sm text-gray-500">Your feedback helps improve our service</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-10 w-10 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {rating === 5 ? 'Excellent!' :
             rating === 4 ? 'Good!' :
             rating === 3 ? 'Okay' :
             rating === 2 ? 'Poor' :
             'Very Poor'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments
            </label>
            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your experience..."
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}