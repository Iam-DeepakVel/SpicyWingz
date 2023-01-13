import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(false);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{foodItems},dispatch] = useStateValue();


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    // Uploading to firebase storage in images folder with unique name so that we are using Date.now()
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setFields(true);
        setMsg("Error while uploading: Try again 😓");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          window.scrollTo({ top: 0, behavior: 'smooth'})
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊!!");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);
    deleteObject(deletRef).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted Successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        window.scrollTo({ top: 0, behavior: 'smooth'})
        setMsg("Required fields cant be empty");
        setAlertStatus("danger");
        window.scrollTo({ top: 0, behavior: 'smooth'})
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        setIsLoading(true);
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL:imageAsset,
          category,
          calories,
          qty:1,
          price
        }
      
      saveItem(data)
      setIsLoading(false);
      setFields(true);
      setMsg("Data added successfully 😊!!");
      window.scrollTo({ top: 0, behavior: 'smooth'})
      clearData()
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Something went Wrong!!Try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData()
  };

 const clearData = ()=>{
   setTitle("");
   setImageAsset("");
   setCalories("")
   setPrice("")
   setCategory("Select Category")
 }
  
//  For updating the foodItems value context
 const fetchData = async () => {
  await getAllFoodItems().then((data) => {
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  });
};

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border-gray-300 border p-4 rounded-lg flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className=" bg-white">
              Select Category
            </option>
            {categories?.map((item) => (
              <option
                key={item.id}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-md">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className=" w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className=" w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className=" text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500  hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={(e) => uploadImage(e)}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded"
                      className=" w-full h-full object-cover"
                    />
                    <button
                      type=""
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-100 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      {" "}
                      <MdDelete className=" text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className=" w-full flex flex-col md:flex-row items-center gap-3">
          <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className=" text-gray-700 text-2xl" />
            <input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              type="text"
              required
              placeholder="calories"
              className=" w-full h-full text-lg bg-transparent text-textColor outline-none border-none placeholder:text-gray-400"
            />
          </div>
          <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className=" text-gray-700 text-2xl" />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              required
              placeholder="Price"
              className=" w-full h-full text-lg bg-transparent text-textColor outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg textlg text-white font-semibold hover:bg-emerald-600 duration-100 transition-all ease-in-out"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
