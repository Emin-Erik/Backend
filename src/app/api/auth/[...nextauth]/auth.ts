import prisma from "@/app/lib/prisma";
import {Account, NextAuthOptions, Profile, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "your@email.com",
                },
                passwordHash: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null;
                }

                const { email, passwordHash } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return null;
                }

                const userPassword = user.passwordHash;

                const isValidPassword = bcrypt.compareSync(passwordHash, userPassword);

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
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({ secret, token }) {
            if (!token) {
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
                const email = params.user.email!;
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                params.token.email = params.user.email;
                if (user) {
                    params.token.name = user.name;
                }
            }
            cookies().set("LoggedIn", "true", { maxAge: 30 * 24 * 60 * 60 });
            return params.token;
        },
    },
};
