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

export const preguntarPermisos = async () => {
  try {
    const messaging = firebase.messaging();

    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker
        .getRegistration("/service-worker.js")
        .then(async (registration) => {
          messaging.useServiceWorker(registration);

          // await messaging.requestPermission();
          await Notification.requestPermission().then(async (permission) => {
            if (permission === "denied") {
              return null;
            } else if (permission === "default") {
              return null;
            }
            const token = await messaging.getToken();
            return token;
          });
        });
    });
  } catch (error) {
    console.error(error);
  }
};

export const Analytics = () => {
  try {
    const analytics = firebase.analytics();
    analytics.logEvent("User_connected");
  } catch (err) {
    console.error(err);
  }
};
