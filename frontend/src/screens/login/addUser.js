import { doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const addUser = async (userId, data) => {
  console.log(userId);
  return setDoc(doc(db, "users", userId), data)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
