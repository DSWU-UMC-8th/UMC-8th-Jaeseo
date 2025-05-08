import {insertStore} from "../repositories/store.repository.js";

export const createStoreService = async (storeData) => {
    const storeId = await insertStore(storeData);
    return storeId;
  };