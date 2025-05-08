import { createReviewService } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const createReview = async (req, res) => {
  const storeId = parseInt(req.params.storeId);
  const reviewData = bodyToReview(req.body, storeId);

  try {
    const result = await createReviewService(reviewData);
    res.status(201).json({
      isSuccess: true,
      code: 201,
      message: "리뷰 등록 성공",
      result
    });
  } catch (err) {
    res.status(400).json({
      isSuccess: false,
      code: 400,
      message: err.message,
      result: null
    });
  }
};
