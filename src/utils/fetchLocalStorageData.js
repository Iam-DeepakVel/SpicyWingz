export const fetchUser = () => {
  // First get the value from localStorage , if it is not undefined then parse the value and store in userInfo, suppose the value is undefined then clear the localstorage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};

export const fetchCart = () => {
  // First get the value from localStorage , if it is not undefined then parse the value and store in cartInfo, suppose the value is undefined then clear the localstorage
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();
  return cartInfo ? cartInfo : []
};
