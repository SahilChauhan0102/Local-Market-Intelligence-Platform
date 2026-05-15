'use client';

import { useState } from 'react';

interface MockReview {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

const MOCK_REVIEWS: MockReview[] = [
  {
    id: 1,
    author: 'Rajesh Kumar',
    avatar: 'RK',
    rating: 5,
    date: '2 days ago',
    text: 'Absolutely love this market! Great variety, friendly shopkeepers and amazing prices. Go in the morning for the best experience.',
  },
  {
    id: 2,
    author: 'Priya Sharma',
    avatar: 'PS',
    rating: 4,
    date: '1 week ago',
    text: 'Good selection but gets very crowded in evenings. The street food nearby is incredible — don\'t miss the chaat corner!',
  },
  {
    id: 3,
    author: 'Amit Singh',
    avatar: 'AS',
    rating: 4,
    date: '2 weeks ago',
    text: 'Nice market overall. Parking can be tricky. Bargaining works well here — always negotiate before buying.',
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating > 0 && reviewText.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setNewRating(0);
        setReviewText('');
      }, 3000);
    }
  };

  return (
    <section className="card p-6" aria-label="Reviews">
      <h2 className="text-lg font-bold text-[#0F172A] mb-1 flex items-center gap-2">
        <span className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center">⭐</span>
        Community Reviews
      </h2>
      <p className="text-xs text-[#6B7280] mb-5">What visitors are saying</p>

      {/* Reviews list */}
      <div className="space-y-4 mb-6">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
            <div className="w-9 h-9 bg-[#0F172A] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {review.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#0F172A]">{review.author}</span>
                <span className="text-xs text-[#6B7280]">{review.date}</span>
              </div>
              <StarRow rating={review.rating} />
              <p className="text-sm text-[#374151] mt-2 leading-relaxed">{review.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Write a review */}
      <div className="border-t border-slate-100 pt-5">
        <h3 className="text-sm font-bold text-[#0F172A] mb-3">Write a Review</h3>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-green-700">✅ Thanks for your review!</p>
            <p className="text-xs text-green-600 mt-1">Your feedback helps the community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3" id="review-form">
            {/* Star selector */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                return (
                  <button
                    key={val}
                    type="button"
                    id={`review-star-${val}`}
                    onMouseEnter={() => setHoverRating(val)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setNewRating(val)}
                    className="transition-transform hover:scale-110"
                    aria-label={`Rate ${val} star${val > 1 ? 's' : ''}`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        val <= (hoverRating || newRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'
                      } transition-colors`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                );
              })}
              {newRating > 0 && (
                <span className="text-xs text-[#6B7280] ml-2">
                  {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][newRating]}
                </span>
              )}
            </div>

            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              placeholder="Share your experience at this market..."
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] resize-none transition-colors"
              required
            />

            <button
              type="submit"
              id="submit-review-btn"
              disabled={newRating === 0}
              className="btn-primary w-full py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
