import NextAuth from 'next-auth';
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [],
  adapter: FirestoreAdapter({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  }),
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ user, credentials }) {
      try {
        await connectToDB();

        const userCredential = await signInWithEmailAndPassword(auth, user.email, credentials.password);
        const userExists = await User.findOne({ email: userCredential.user.email });

        if (!userExists) {
          await User.create({
            email: userCredential.user.email,
            name: userCredential.user.displayName.toLowerCase(),
          });
        }

        return true;
      } catch (error) {
        console.error('Error signing in: ', error.message);
        return false;
      }
    },
    async signUp({ user, credentials }) {
      try {
        await connectToDB();

        const userCredential = await createUserWithEmailAndPassword(auth, user.email, credentials.password);

        await User.create({
          email: userCredential.user.email,
          name: userCredential.user.displayName.toLowerCase(),
        });

        return true;
      } catch (error) {
        console.error('Error signing up: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
