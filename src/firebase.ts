import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { clientConfig } from '@/config';
import User from './models/user';
import { connectToDB } from './utils/database';
import { mongo } from 'mongoose';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(clientConfig);
} else {
  app = getApps()[0];
}

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    let mongoUserId = null;

    const userExists = await User.findOne({ email: user.email });

    if (!userExists && user) {
      try {
        const { email, photoURL: image, displayName: name, uid: firebaseUserId  } = user;
        console.info("creatinng user", { email, photoURL: image, displayName: name, uid: firebaseUserId  });
        await connectToDB();
        const generateUser = () => ((name?.replace(/\s/g, "")?.toLowerCase() ?? "") + `${Math.floor(Math.random() * 10000000000000000)}`).substring(0, 20);
        let userName = generateUser();

        const existingUser = await User.findOne({ $or: [{ email }, { firebaseUserId }] });
        if (existingUser) return new Response(JSON.stringify(existingUser), { status: 200 });

        let existingUserWithSameName = await User.findOne({ name: userName });
        while (existingUserWithSameName?._id) {
          userName = generateUser();
          existingUserWithSameName = await User.findOne({ name: userName });
        }

        const userMongo = await new User({ firebaseUserId, email, image, name: userName });
        userMongo.save();

        mongoUserId = userMongo._id;
        Object.assign(user, { _id: userMongo._id });
      } catch (error) {
        console.error("error by creating new user", error);
        return new Response("Failed to create a new user", { status: 500 });
      }
    } else {
      mongoUserId = userExists._id;
      Object.assign(user, { _id: userExists._id });
    }


    return { user, idToken, mongoUserId };
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};


export const auth = getAuth(app);
export const firestore = getFirestore(app);
export { app, signInWithGoogle, signOut };
