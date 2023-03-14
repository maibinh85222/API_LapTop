import axiosInstance from "../customAxiosConfig/customAxiosConfig";
const GetAllCartItems = async (jwtToken) => {
  console.log("Value in get all cart item " + jwtToken);
  try {
    console.log("Da vao try " + jwtToken);
    const response = await axiosInstance.get("/cart/all_cart_items", {
      headers: {
        Authorization: jwtToken,
      },
    });
    return response.data;
  } catch (error) {

    // it would run into catch exception if the rest api has try catch exception handler
    console.log("error is " + JSON.stringify(error.response.data));
    throw error;
  }
};

export const updateCartQuantity = async (productId, token, type) => {
    try {
        const response = await axiosInstance.put(`/cart/update/${productId}/${type === "INCREASE" ? "increase" : "decrease"}`, null, {
            headers: { Authorization: token }
          }).then(res => res.data);
    
          return response;
    } catch(error) {
        throw error;
    }
    

}

export const removeItem = async (productId, token) => {
    try {
        console.log("Product id trong remove " + productId);
        const response = await axiosInstance.delete(`/cart/delete/${productId}`, {
            headers: { Authorization: token }
          }).then(res => res.data);
    
          return response;
    } catch(error) {
        throw error;
    }
    

}

export default GetAllCartItems;
