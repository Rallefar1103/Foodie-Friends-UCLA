import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import provideFirebaseApp from "./firebase";
import { getUserInformation } from "./firestore";

provideFirebaseApp();
const auth = getAuth();

export const authenticate = (email, password) => {
  console.log("auth request");
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .then((user) => {
        console.log(user)
        return getUserInformation(user.uid);
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

export const signOut = () => {
    console.log("signout request");
    return auth.signOut()
    .then(() => {
      console.log('User signed out');
      return null;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return null;
    });
};
