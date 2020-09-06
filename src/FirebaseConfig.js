// @ts-check

import * as firebase from "firebase/app";
import "firebase/messaging";
import "firebase/analytics";

// Initialize Firebase
export const app = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyCyRJ3IcRz7KNCkwAYp0EdlHbK7cZmCI0o",
    authDomain: "denialcode.firebaseapp.com",
    databaseURL: "https://denialcode.firebaseio.com",
    projectId: "denialcode",
    storageBucket: "denialcode.appspot.com",
    messagingSenderId: "337646377846",
    appId: "1:337646377846:web:16b613177ebf31001a7857",
    measurementId: "G-VKGEGC7FQ8",
  });
};

export const Analytics = () => {
  try {
    const analytics = firebase.analytics();
    analytics.logEvent("User_connected");
  } catch (err) {
    console.error(err);
  }
};
