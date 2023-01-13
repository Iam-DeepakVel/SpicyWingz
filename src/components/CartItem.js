import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
let items=[]

const CartItem = ({ item,setFlag,flag }) => {
  const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      // increasing quantity of product in cartItems page instantly
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag+1)
        }
      });
      // Applying the changes happend to product quantity in both localstorage and context
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag+1)
        cartDispatch()
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
           setFlag(flag+1)
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty,items]);

  return (
    <div
      key={item?.id}
      className=" w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 "
    >
      <img
        src={item?.imageURL}
        alt=""
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className=" text-base text-gray-50 ">{item?.title}</p>
        <p className=" text-sm text-gray-300 font-semibold">
          $ {item?.price * qty}
        </p>
      </div>
      {/* Button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => updateQty("remove", item?.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className=" w-5 h-5 rounded-sm p-4 bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div
          onClick={() => updateQty("add", item?.id)}
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
