import {
    checkStoreExists,
    insertReview,
    insertReviewImages
  } from "../repositories/review.repository.js";
  
  export const createReviewService = async (reviewData) => {
    const exists = await checkStoreExists(reviewData.storeId);
    if (!exists) throw new Error("존재하지 않는 가게입니다.");
  
    const reviewId = await insertReview(reviewData);
  
    if (reviewData.images.length > 0) {
      await insertReviewImages(reviewId, reviewData.images);
    }
  
    return { reviewId };
  };
  