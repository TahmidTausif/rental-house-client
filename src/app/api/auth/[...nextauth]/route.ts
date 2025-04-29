import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User, Session } from "@/types/types"; 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("📥 Received credentials:", credentials);
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          console.log("Login response:", res.data);

          const { accessToken, user } = res.data.data;

          if (accessToken && user) {
            console.log(user.id)
            return {
              ...user,
              id: user.id,
              accessToken, 
            } as User;
          }
        
          console.log("❌ No accessToken or user found in response");
          return null;
        } catch (error) {
          console.error("❌ Login error in authorize():", error);
            if (axios.isAxiosError(error)) {
              console.error("Login error:", error.response?.data || error.message);
            } else if (error instanceof Error) {
              console.error("Login error:", error.message);
            } else {
              console.error("Unknown error:", error);
            }
            return null;
          }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure that user is of type User
        const userData = user as User; // Type assertion
        token.accessToken = userData.accessToken;
        token.email = userData.email;
        token.user = userData; // Cast user to User
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session:', session);
      if (token) {
        // Ensure the token user is of type User
        const userData = token.user as User;
        session.accessToken = token.accessToken as string;
        session.user = {
          id: userData.id,
          name: userData.name,
          email: token.email || "",
          phone: userData.phone,
          role: userData.role,
          imageUrl: userData.imageUrl,
        }; // Cast token.user to User type
      }
      return session as Session; // Return the custom Session type
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
  },
});

export { handler as GET, handler as POST, };
