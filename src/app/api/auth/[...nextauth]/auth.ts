import prisma from "@/app/lib/prisma";
import {Account, NextAuthOptions, Profile, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "your@email.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return null;
                }

                const userPassword = user.passwordHash;

                const isValidPassword = bcrypt.compareSync(password, userPassword);

                if (!isValidPassword) {
                    return null;
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    jwt: {
        async encode({ secret = process.env.NEXTAUTH_SECRET , token }) {
            if (!token || !secret) {
                throw new Error("No token to encode");
            }
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error("No token to decode");
            }
            const decodedToken = jwt.verify(token, secret);
            if (typeof decodedToken === "string") {
                return JSON.parse(decodedToken);
            } else {
                return decodedToken;
            }
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async session(params: { session: Session; token: JWT; user: User }) {
            if (params.session.user) {
                params.session.user.email = params.token.email;
                params.session.user.name = params.token.name;
                params.session.user.role = params.token.role
            }

            return params.session;
        },
        async jwt(params: {
            token: JWT;
            user?: User | undefined;
            account?: Account | null | undefined;
            profile?: Profile | undefined;
            isNewUser?: boolean | undefined;
        }) {
            if (params.user) {
                params.token.email = params.user.email;
                params.token.name = params.user.name;
                params.token.role = params.user.role
            }

            return params.token;
        },
    },
};