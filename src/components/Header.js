import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { navLinks } from "../utils/data";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user ,cartItems}, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  // Login functionality - Google login- firebase
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: true,
    });
  };

  return (
    <header className="fixed bg-primary z-50 w-screen p-3 px-4 md:p-6 md:px-16 ">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex h-full w-full items-center justify-between">
        {/* Left Section */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">
            Spicy<span className="text-red-500">W</span>ingz
          </p>
        </Link>
        {/* Left Section End*/}

        {/* Right Section */}
        <div className="flex items-center gap-8 ">
          {/* Nav Links */}
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-4"
          >
            {navLinks.map((link) => (
              <li
                key={link}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              >
                {link}
              </li>
            ))}
          </motion.ul>

          {/* Basket */}
          <div
            onClick={showCart}
            className="relative flex items-center justify-center"
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems?.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userProfile"
              onClick={login}
            />
            {/* Dropdown Menu */}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute flex flex-col w-40  top-12 right-0 bg-gray-50 shadow-xl rounded-lg"
              >
                {user?.email === "deepakvel82@gmail.com" && (
                  <Link
                    to={"/createItem"}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
        {/* Right Section End*/}
      </div>

      {/* Mobile View */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        {/* Basket */}
        <div
          onClick={showCart}
          className="relative flex items-center justify-center"
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems?.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            )}
        </div>

        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">
            Spicy<span className="text-red-500">W</span>ingz
          </p>
        </Link>

        <div className="relative">
          {/* Avatar */}
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {/* Dropdown Menu */}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute flex flex-col w-40 top-12 right-0 bg-gray-50 shadow-xl rounded-lg"
            >
              {user?.email === "deepakvel82@gmail.com" && (
                <Link
                  to={"/createItem"}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base 
                  "
                  onClick={() => setIsMenu(false)}
                >
                  New Item <MdAdd />
                </Link>
              )}
              {/* Nav Links */}
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li
                    key={link}
                    className="text-base  px-4 py-2 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                    onClick={() => setIsMenu(false)}
                  >
                    {link}
                  </li>
                ))}
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
