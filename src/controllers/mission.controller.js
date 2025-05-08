import { createMissionService } from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";
import { challengeMissionService } from "../services/mission.service.js";

export const createMission = async (req, res) => {
  const storeId = parseInt(req.params.storeId);
  const missionData = bodyToMission(req.body, storeId);

  try {
    const result = await createMissionService(missionData);
    res.status(201).json({
      isSuccess: true,
      code: 201,
      message: "미션 등록 성공",
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

export const challengeMission = async (req, res) => {
    const missionId = parseInt(req.params.missionId);
    const userId = parseInt(req.body.userId);
  
    if (isNaN(missionId) || isNaN(userId)) {
      return res.status(400).json({
        isSuccess: false,
        code: 400,
        message: "잘못된 userId 또는 missionId입니다.",
        result: null
      });
    }
  
    try {
      const result = await challengeMissionService(userId, missionId);
      res.status(201).json({
        isSuccess: true,
        code: 201,
        message: "미션 도전 성공",
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