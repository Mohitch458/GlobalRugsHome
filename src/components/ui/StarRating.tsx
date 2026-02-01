import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ rating, onChange, readonly = false, size = 'md' }: StarRatingProps) => {
  const sizes = {
    sm: 14,
    md: 20,
    lg: 24
  };

  const iconSize = sizes[size];

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            size={iconSize}
            className={`${
              star <= rating
                ? 'fill-gold text-gold'
                : 'fill-transparent text-muted-foreground/30'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
