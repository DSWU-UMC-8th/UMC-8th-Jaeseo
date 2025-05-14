import {insertStore} from "../repositories/store.repository.js";
import { getAllStoreReviews } from "../repositories/user.repository.js";

export const createStoreService = async (storeData) => {
    const storeId = await insertStore(storeData);
    return storeId;
  };

  export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
  };