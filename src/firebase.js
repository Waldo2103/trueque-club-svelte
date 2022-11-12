import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyCXiax0JCkQcHR5efdTHa57dyEFk7mLJLU',
	authDomain: 'el-club-del-trueque-f911a.firebaseapp.com',
	projectId: 'el-club-del-trueque-f911a',
	storageBucket: 'el-club-del-trueque-f911a.appspot.com',
	messagingSenderId: '440923603237',
	appId: '1:440923603237:web:9d1b5320e9999130fd5acc',
	measurementId: 'G-JLSFTTYM0P'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
