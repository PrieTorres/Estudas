import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { app } from '../../../../../firebase';

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: 'firebase-email-password',
      name: 'Email and Password',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        console.log(credentials)
        const auth = getAuth(app);
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;

          console.log(user);
          return {
            id: user.uid,
            email: user.email,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("toke", token);

      if (account?.provider === 'firebase') {
        const firebaseToken = account.id_token;

        try {
          const decodedToken = await getAdminAuth().verifyIdToken(firebaseToken);
          token.uid = decodedToken.uid;
          token.email = decodedToken.email;
        } catch (error) {
          console.error('Erro ao verificar o token do Firebase', error);
        }
      }

      console.log("toke", token);
      return token;
    },
    async session({ session, token }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.anotherId = token.uid;
      session.user.email = token.email;

      console.log("session _----.>", session);

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        console.log({ account, profile, user, credentials });
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