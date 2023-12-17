import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string;
    role?: Role;
  }
}
