import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [foodItems, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 ">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-600)}
            >
              <MdChevronLeft className="text-white text-lg" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  flex items-center justify-center  hover:shadow-lg "
              onClick={() => setScrollValue(600)}
            >
              <MdChevronRight className="text-white text-lg" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          flag={true}
          scrollValue={scrollValue}
          data={foodItems?.filter(
            (item) =>
              item.category === "fruits" || item.category === "Select Category"
          )}
        />
      </section>

      <section className=" w-full my-6">
        <MenuContainer />
      </section>

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
