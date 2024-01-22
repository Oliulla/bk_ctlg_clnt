import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthEmail from "../../hooks/useAuthEmail";
import { useInsertReveiwMutation } from "../../redux/apis/booksApi";
import { toast } from "react-toastify";

interface ReviewFormData {
  comment: string;
}

interface SubmitReviewFormProps {
  bookId: string | undefined;
}

const SubmitReviewForm: React.FC<SubmitReviewFormProps> = ({ bookId }) => {
  const currentUserEmail = useAuthEmail();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>();
  const [insertReview] = useInsertReveiwMutation();

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    const reviewData = {
      bookId,
      user_email: currentUserEmail,
      comment: data.comment,
    };

    const res: any = await insertReview(reviewData);
    // console.log(res);
    if (res?.data?.success) {
      toast.success(res?.data?.message);

      // Reset the form after submission
      reset();
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Submit a Review</h3>
          <textarea
            {...register("comment", { required: "Review is required" })}
            placeholder="Your review"
            className="border rounded p-2 w-full"
            required
          />
          <div className="text-red-500">
            {/* Display validation error message */}
            {errors.comment && <span>{errors.comment.message}</span>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
          >
            Submit Review
          </button>
        </form>
      </div>
    </>
  );
};

export default SubmitReviewForm;
