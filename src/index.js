export const firebaseConf = {
  apiKey: 'AIzaSyBuXZ008FeCVmNs7gy1qPquoFLN9ci5BaE',
  authDomain: 'tiktok-pen.firebaseapp.com',
  projectId: 'tiktok-pen',
  storageBucket: 'tiktok-pen.appspot.com',
  messagingSenderId: '835570614094',
  appId: '1:835570614094:web:307eccdf895ebe72fc681f',
  measurementId: 'G-6GDC4LXEQC',
  databaseURL: 'https://tiktok-pen-default-rtdb.europe-west1.firebasedatabase.app/',
};

import { initializeApp } from 'firebase/app';

export const firebaseApp = initializeApp(firebaseConf);
