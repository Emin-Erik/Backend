import prisma from "@/app/lib/prisma";
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };