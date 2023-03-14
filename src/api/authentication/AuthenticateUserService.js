import axiosInstance from "../customAxiosConfig/customAxiosConfig";

const AuthenticateUserService = async (username, password) => {
  // note : to access error response data in Axios,
  // access to "response" property of the error obj, the error response data
  // contained in "response.data" property
  try {
    const response = await axiosInstance.post("/authenticate", {
      username,
      password,
    });
    console.log("Res success " + response);
    return response.data;
  } catch (error) {
    console.log("error is " + JSON.stringify(error.response.data));
    return error.response;
  }
};

export const registrationService = async (payload) => {
  try {
    const res = await axiosInstance.post("/auth/register", payload);
    console.log("Register " +JSON.stringify(res));
    return res;
  } catch (error) {
    return error.response;
  }
};

export default AuthenticateUserService;
