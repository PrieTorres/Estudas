import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth } from "firebase/auth";
import { app } from "../../../../../firebase";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const auth = getAuth(app);
          const userCredential = await auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;

          if (user) {
            const token = await user.getIdToken();
            return { id: user.uid, email: user.email, token };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.uid = token.uid;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
