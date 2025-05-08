export const bodyToStore = (body) => {
    return {
      name: body.name,
      description: body.description,
      regionId: body.regionId,
      foodCategoryId: body.foodCategoryId,
      address: body.address,
      phoneNumber: body.phoneNumber,
    };
  };
  