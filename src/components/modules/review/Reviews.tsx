import { IReview } from "@/types";

const Reviews = ({ reviews }: { reviews: IReview[] }) => {
  console.log(reviews);

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="mb-4 p-4 border rounded-lg">
            <p className="text-gray-700">
              <strong>{review.user.name}</strong>
            </p>
            <p className="text-yellow-500">
              {"⭐".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-gray-500">{review.review}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

export default Reviews;
