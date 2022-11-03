import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import provideFirebaseApp from "./firebase";

provideFirebaseApp();
const auth = getAuth();

export const authenticate = (email, password) => {
  console.log("auth request");
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  I;
};

export const signUp = (email, password) => {
  console.log("signup request");
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
