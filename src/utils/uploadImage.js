import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();

    // ✅ Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // ✅ Required for file upload
                // ✅ Optional: Authorization header (only needed if not added automatically in axiosInstance)
                // 'Authorization': `Bearer ${yourToken}`, 
            },
        });

        return response.data; // ✅ Return { imageUrl }
    } catch (error) {
        console.error('Error uploading the image:', error?.response?.data || error.message);
        throw error;
    }
};

export default uploadImage;
