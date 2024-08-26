// __tests__/api.test.ts

import axiosApi from "@/utils/Api";

export const getUser = async () => {
  try {
    const response = await axiosApi.get('/users/get');
    if (response?.data === undefined) {
      throw new Error('Undefined error in response');
    }
    return response.data;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};
