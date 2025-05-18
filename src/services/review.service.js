import {
    checkStoreExists,
    insertReview,
    insertReviewImages,
    getUserReviews
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
  
  export const listUserReviews = async (userId, cursor) => {
    const reviews = await getUserReviews(userId, cursor);
  
    return {
      reviews: reviews.map(r => ({
        reviewId: r.id,
        store: r.store,
        rating: Number(r.rating),
        content: r.content,
        images: r.images.map(img => img.imageUrl),
        createdAt: r.createdAt.toISOString().split("T")[0]
      })),
      nextCursor: reviews.length === 5 ? reviews[4].id : null
    };
  };