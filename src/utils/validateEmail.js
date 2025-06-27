import axiosInstance from './axiosinstance';
import { API_PATHS } from './apiPaths';

const validateEmail = async (email) => {
  try {
    const response = await axiosInstance.post(API_PATHS.VALIDATE_EMAIL, { email });
    return response.data;
  } catch (error) {
    console.error('Email validation API error:', error.message);
    return {
      isValid: false,
      isDisposable: false,
      isFreeProvider: false,
      qualityScore: 0,
      raw: null,
    };
  }
};

export default validateEmail;
