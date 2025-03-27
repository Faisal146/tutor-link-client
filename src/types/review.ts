export interface IReview {
  _id: string;
  review: string;
  rating: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  tutor: string;
  isVerifiedPurchase?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
