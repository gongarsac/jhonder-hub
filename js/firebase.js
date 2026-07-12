import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    get,
    set
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDgFDgenYxelw3UUqaVYMfxHywiqQs9iws",
    authDomain: "jhonder-capital.firebaseapp.com",
    databaseURL: "https://jhonder-capital-default-rtdb.firebaseio.com",
    projectId: "jhonder-capital",
    storageBucket: "jhonder-capital.firebasestorage.app",
    messagingSenderId: "968591788510",
    appId: "1:968591788510:web:2726d4baba9b188ffb754f",
    measurementId: "G-01D37WVT6D"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
    db,
    ref,
    push,
    get,
    set
};