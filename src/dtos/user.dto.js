export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };
   export const responseFromUser = (user) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth?.toISOString().split('T')[0], // YYYY-MM-DD 형식
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
      preferences: user.preferences || [], // 배열 형태로 기대한다면
    };
  };
  
