import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import provideFirebaseApp from "./firebase";

provideFirebaseApp();
const auth = getAuth();

export const authenticate = (email, password) => {
  console.log("auth request");
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  )
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return null;
    });
  I;
};

export const signUp = (email, password) => {
    console.log("signup request");
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return user;
    })
    .catch((error) => {
        return null;
    })
}
