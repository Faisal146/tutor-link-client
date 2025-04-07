import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ITutor } from "@/types";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/services/review";

const CreateReviewModel = ({ tutor }: { tutor: ITutor }) => {
  const reviewSchema = z.object({
    rating: z
      .string()
      .min(1, "Rating is required")
      .refine(
        (value) => {
          const num = Number(value);
          return num >= 1 && num <= 5;
        },
        { message: "Rate between 1-5" }
      ),
    review: z.string().min(1, "review is required"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "",
      review: "",
    },
  });

  // const {
  //   formState: { isSubmitting },
  // } = form || {};

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      data.tutorId = tutor._id;
      console.log(data);
      data.tutor = tutor._id;

      const res = await createReview(data);

      console.log(res);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Give A Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write Your Review</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-4 border border-gray-200 p-6 rounded-lg shadow-sm"
        >
          <div>
            <label className="block font-medium mb-1">Rating</label>
            <Input type="number" {...register("rating")} />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className="block font-medium mb-1">Review</label>
            <Textarea {...register("review")} />
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add Review
          </Button>
        </form>

        {/* Submit Button */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateReviewModel;

// <Button type="submit" className="w-full rounded-sm">
// {isSubmitting ? "Creating...." : "Create"}
// </Button>
