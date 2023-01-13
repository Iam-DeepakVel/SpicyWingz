import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

// This fetchUser function fetches the value of user from localStorage
const userInfo = fetchUser();

// This fetchUser function fetches the value of cartItems from localStorage
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
