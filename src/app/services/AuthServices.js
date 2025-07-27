import axios from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const loginAdmin = async (loginData) => {
    const response = await axios.post(`${apiUrl}/auth/login`, loginData);
    return response.data;
}

export const registerCompany = async (registerationData) => {
    const response = await axios.post(`${apiUrl}/auth/signup`, registerationData);
    
    return response.data;
}

export const forgotPassword = async (email) => {
    const response = await axios.post(`${apiUrl}/auth/forgot-password`, email);
    return response.data;
}
export const verifyOtp = async ({email,otp}) => {
    if (!email || !otp) {
        console.error("Missing email or OTP");
        throw new Error("Email and OTP are required");
      }
    
      try {
        const response = await axios.post(`${apiUrl}/auth/verify-otp`, { email, otp });
        return response.data;
      } catch (error) {
        console.error("OTP verification failed:", error.response?.data || error.message);
        throw error;
      }
}

export const resetPassword = async (newPassword) => {
    const response = await axios.post(`${apiUrl}/auth/reset-password`);
    return response.data;
}

export const hrInvite = async(hrData) =>{
  const response = await axios.post(`${apiUrl}/auth/invite`, hrData);
  
  return response.data;
}

export const activateHrAccount = async (activationData) => {
  const response = await axios.post(`${apiUrl}/auth/activate`, activationData);
  return response.data;
};
