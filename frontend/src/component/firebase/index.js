import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHI_OpcLLuxT_Jg4qeXPsqZekqYpyGYrU",
  authDomain: "click-store-tecnoinf.firebaseapp.com",
  projectId: "click-store-tecnoinf",
  storageBucket: "click-store-tecnoinf.appspot.com",
  messagingSenderId: "81368056763",
  appId: "1:81368056763:web:05dde8053b23859a74ba9e",
  measurementId: "G-DJVCPYCJPB"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
