import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = require("./app_config.json");

// Firebase
export const firebase_app = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,

  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
});

export const db = firebase_app.firestore();
export const storage = firebase.storage();

// Auth0
export const auth0 = {
  domain: config.auth0.domain,
  clientId: config.auth0.clientID,
  redirectUri: config.auth0.redirectUri,
};

// Jwt
export const Jwt_token = config.jwt_token;
