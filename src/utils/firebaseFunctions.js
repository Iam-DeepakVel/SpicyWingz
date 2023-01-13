import { setDoc, doc, query, collection, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config";

//Saving new item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};


//Getall Food Items
export const getAllFoodItems = async()=>{
  try {
    const items = await getDocs(
      query(collection(firestore,"foodItems"), orderBy("id","desc"))
    )
    return items.docs.map((doc)=>doc.data())
  } catch (error) {
    console.log(error);
  }
}