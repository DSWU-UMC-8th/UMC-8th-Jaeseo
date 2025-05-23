import { pool } from "../config/dbconfig.js";
import prisma from "../config/dbconfig.js";

export const checkStoreExists = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM store WHERE id = ?", [storeId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const insertMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, content, point, is_active)
       VALUES (?, ?, ?, ?)`,
      [data.storeId, data.content, data.point, data.isActive]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const getMissionsByStoreId = async (storeId) => {
    return await prisma.mission.findMany({
      where: {
        storeId: storeId,
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        point: true,
        content: true,
        isActive: true,
        createdAt: true
      }
    });
  };