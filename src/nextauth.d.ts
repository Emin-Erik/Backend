import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    role?: Role;
  }
}
