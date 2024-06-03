// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';


// Cấu hình Firebase của ứng dụng web bạn
const firebaseConfig = {
  apiKey: "AIzaSyC0YtLZrt4rEka-4nrLFsd2nvKgLeIbcHQ",
  authDomain: "vuechat-76f05.firebaseapp.com",
  projectId: "vuechat-76f05",
  storageBucket: "vuechat-76f05.appspot.com",
  messagingSenderId: "828650812541",
  appId: "1:828650812541:web:e4acb64f414355bddbad14"
};

// Khởi tạo Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);


export default {firebase};
export { firestore, storage };


