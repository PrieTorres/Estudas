import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import firebase from "firebase/app"
import "firebase/firestore";
import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import {clientConfig, serverConfig} from "../../../../config";

const firestore = (
  firebase?.apps?.[0] ?? firebase.initializeApp({...clientConfig, ...serverConfig})
).firestore();

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  adapter: FirebaseAdapter(firestore),
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name.toLowerCase(),
          });
        }

        return true
      } catch (error) {
        console.error("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }