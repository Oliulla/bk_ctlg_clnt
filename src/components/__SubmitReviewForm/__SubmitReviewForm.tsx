import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuthEmail from "../../hooks/useAuthEmail";

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

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    // Handle form submission here
    console.log("Submitted review:", data.comment);

    const reviewData = {
      book_id: bookId,
      user_id: currentUserEmail,
      comment: data.comment,
    };

    console.log(reviewData);

    // Reset the form after submission
    reset();
  };

  return (
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
  );
};

export default SubmitReviewForm;
