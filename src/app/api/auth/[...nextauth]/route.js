import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter, FirestoreAdapter } from "@next-auth/firebase-adapter";
import { firestore } from '@/firebaseAdmin'; // Use the Firebase Admin firestore
import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  }), // FirebaseAdapter uses the firestore instance from admin SDK
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();

        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name.toLowerCase(),
          });
        }

        return true;
      } catch (error) {
        console.error('Error checking user existence: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
