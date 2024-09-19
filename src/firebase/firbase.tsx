import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { collection, getDocs, getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBuLbcM0TXsnnGOp1glIOLW2yhKVvnMuzs",
  authDomain: "olx-clone-e1ab8.firebaseapp.com",
  projectId: "olx-clone-e1ab8",
  storageBucket: "olx-clone-e1ab8.appspot.com",
  messagingSenderId: "895542235446",
  appId: "1:895542235446:web:2fdf7babf860799b256397"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage(app);
const firestore = getFirestore(app); 

const fetchItemsFromFireSrote = async () => {
  try {
      const productsCollection = collection(firestore, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));
      return productsList
  } catch (error) {
      console.error("Error fetching products: ", error);
  }
}

export { 
    auth,
    provider,
    storage,
    firestore,
    fetchItemsFromFireSrote
}