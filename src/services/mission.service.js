import {
    checkStoreExists,
    insertMission
  } from "../repositories/mission.repository.js";
  import {
    checkMissionExists,
    checkAlreadyChallenged,
    insertUserMission
  } from "../repositories/userMission.repository.js";
  
  export const createMissionService = async (missionData) => {
    const exists = await checkStoreExists(missionData.storeId);
    if (!exists) throw new Error("존재하지 않는 가게입니다.");
  
    const missionId = await insertMission(missionData);
    return { missionId };
  };

  export const challengeMissionService = async (userId, missionId) => {
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) throw new Error("존재하지 않는 미션입니다.");
  
    const already = await checkAlreadyChallenged(userId, missionId);
    if (already) throw new Error("이미 도전 중인 미션입니다.");
  
    const userMissionId = await insertUserMission(userId, missionId);
    return { userMissionId };
  };

  