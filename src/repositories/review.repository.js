import { pool } from "../config/dbconfig.js";
import prisma from "../config/dbconfig.js";

export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM store WHERE id = ?",
      [storeId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const insertReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO review (store_id, title, content, rating)
       VALUES (?, ?, ?, ?)`,
      [
        data.storeId,
        data.title,
        data.content,
        data.rating
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const insertReviewImages = async (reviewId, imageUrls) => {
  const conn = await pool.getConnection();
  try {
    const values = imageUrls.map((url) => [reviewId, url]);
    await conn.query(
      `INSERT INTO review_image (review_id, image_url) VALUES ?`,
      [values]
    );
  } finally {
    conn.release();
  }
};

export const getUserReviews = async (userId, cursor, take = 5) => {
    return await prisma.review.findMany({
      where: { userId },
      include: {
        store: {
          select: { id: true, name: true }
        },
        images: {
          select: { imageUrl: true }
        }
      },
      orderBy: { id: "desc" },
      take,
      ...(cursor && { cursor: { id: cursor }, skip: 1 })
    });
  };
  