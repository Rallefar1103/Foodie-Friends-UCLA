import { GoogleAuthProvider, getAuth, signInWithPopup, getFirestore, signOut} from "firebase/auth";
import { initFirebaseApp } from "./firebase";
import { getDocs, getDocs, addDoc } from "firebase/firestore";

const app = initFirebaseApp();
const auth = getAuth(app);
const database = getFirestore(app);
const provider = new GoogleAuthProvider();
//provider.setCustomParameters({'login_hint' : 'user@gmail.com'});

export const authenticate = async () => {
   const result = await signInWithPopup(auth, provider);
   const user = result.user;
   const lookupuser = query(collection(database, "users"), where ("uid", "==", user.uid));
   const documents = await getDocs(lookupuser);
   if (documents.docs.length === 0){
    await addDoc(colleciton(database, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email });
   }

}

export const logout = () => {
    signOut(auth);
};