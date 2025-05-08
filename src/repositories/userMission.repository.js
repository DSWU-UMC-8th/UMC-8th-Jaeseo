import { pool } from "../config/dbconfig.js";

export const checkMissionExists = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id FROM mission WHERE id = ?", [missionId]);
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const checkAlreadyChallenged = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      "SELECT id FROM user_mission WHERE user_id = ? AND mission_id = ?",
      [userId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const insertUserMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, status)
       VALUES (?, ?, 'in_progress')`,
      [userId, missionId]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};
