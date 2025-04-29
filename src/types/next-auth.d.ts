import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: "admin" | "tenant" | "landlord";
      imageUrl: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "admin" | "tenant" | "landlord";
    imageUrl: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
    interface JWT {
      accessToken: string;
      user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: "admin" | "tenant" | "landlord";
        imageUrl: string;
      };
    }
  }
