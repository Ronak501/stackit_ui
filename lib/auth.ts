import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        console.log("Credentials received:", credentials);

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            console.error("No user found with this email:", credentials.email);
            throw new Error("No user found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            console.error("Invalid password for user:", credentials.password);
            throw new Error("Invalid password");
          }

          console.log("User authenticated successfully:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error: ", error);
          return null; //You MUST return null here on error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/signup",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
