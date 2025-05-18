import { createStoreService } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";
import {listStoreReviews} from "../services/store.service.js";

export const createStore = async (req, res) => {
  try {
    const storeData = bodyToStore(req.body);
    const storeId = await createStoreService(storeData);

    res.status(201).json({ message: "가게 등록 성공", storeId });
  } catch (err) {
    console.error("❌ 가게 등록 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
    const reviews = await listStoreReviews(
      req.params.storeId
    );
    res.status(StatusCodes.OK).json(reviews);
  };
