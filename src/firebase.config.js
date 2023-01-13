import {getApp,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA6WsjgXdjNljYAkoibtYyb0Y3GyhTZKVk",
  authDomain: "spicywingz-35761.firebaseapp.com",
  databaseURL: "https://spicywingz-35761-default-rtdb.firebaseio.com",
  projectId: "spicywingz-35761",
  storageBucket: "spicywingz-35761.appspot.com",
  messagingSenderId: "372642755128",
  appId: "1:372642755128:web:687b90b67683f5c3fa2ccd",
};

const app = getApp.Length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app,firestore,storage}