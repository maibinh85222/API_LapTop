import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";
import GetAllCartItems, { updateCartQuantity } from "../api/cart/CartService";
import axiosInstance from "../api/customAxiosConfig/customAxiosConfig";
import useAuth from "../hooks/useAuth";
import { cartReducer } from "../reducer/cartReducer";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [state, cartDispatch] = useReducer(cartReducer, { cartList: [] });

  const { auth, setAuth } = useAuth();

  const jwtToken = auth.accessToken;

  useEffect(() => {
    console.log("Da vao useEffect cartcontext token " + jwtToken);
    const getCartItems = async () => {
      try {
        console.log("Token 2  is " + jwtToken);
        const data = await GetAllCartItems(jwtToken);

        console.log("Value cart from api " + JSON.stringify(data));

        cartDispatch({
          type: "SET_CART",
          payload: data,
        });
      } catch (err) {
        console.log("Eror fetching cart items " + err);
      }
    };

    getCartItems();
  }, []);

  const addToCart = async (productId, token, quantity = 1) => {
    console.log("Value is " + productId + " " + token + " " + quantity);

    const data = await axiosInstance
      .post(
        "/cart/add_to_cart",
        { productId, quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => res.data);

    cartDispatch({
      type: "SET_CART",
      payload: data,
    });
  };

  const updateCartItem = async (productId, token, type) => {
    const response = await updateCartQuantity(productId, token, type);

    console.log("Value update quantity " + response);
    cartDispatch({
        type: "SET_CART",
        payload: response
      });
  };

  

const value = {
    addToCart,
    cartDispatch,
    updateCartItem,
    cartList: state.cartList,
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };
