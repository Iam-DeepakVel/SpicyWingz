import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";



const CartContainer = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const closeCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      showCart: false,
    });
  };
  
  
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };



  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col fixed top-0 right-0 z-[100]"
    >
      <div className=" w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div onClick={closeCart} whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
         onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gradient-to-tr from-red-300 to-red-600 rounded-md hover:shadow-md  cursor-pointer text-white text-base"
        >
          clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* Bottom section */}

      {cartItems?.length > 0 ? (
        <div className=" w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart Items Section */}
          <div className=" w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart item*/}
            {cartItems?.map((item) => (
             <CartItem item={item}   setFlag={setFlag}
                  flag={flag}/>
            ))}
          </div>

          {/*Cart Total section  */}
          <div className=" w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className=" w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className=" textgray400 text-lg">$ {tot}</p>
            </div>

            <div className=" w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className=" textgray400 text-lg">$2.5</p>
            </div>

            <div className=" w-full border-b border-gray-600 my-2"></div>
            <div className=" w-full flex items-center justify-between">
              <p className="text-gray-400 text-xl font-semibold">Total</p>
              <p className=" textgray400 text-lg font-semibold">$ {tot + 2.5}</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className=" w-full p-2 rounded-full  bg-red-500 text-gray-50 text-lg my-2 hover:shadow-lg "
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className=" w-full p-2 rounded-full  bg-red-500 text-gray-50 text-lg my-2 hover:shadow-lg "
              >
               Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="" />
          <p className=" text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
