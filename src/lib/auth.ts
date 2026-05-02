import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: { label: "Login Type", type: "text" }, // "OFFICER" or "CITIZEN"
        identifier: { label: "Identifier (Employee ID or Aadhaar)", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password || !credentials?.type) {
          return null;
        }

        if (credentials.type === "OFFICER") {
          const user = await prisma.user.findUnique({
            where: { employeeId: credentials.identifier },
          });

          if (!user) return null;
          const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!isPasswordValid) return null;

          return {
            id: user.id,
            employeeId: user.employeeId,
            name: user.name,
            role: user.role, // ADMIN or OFFICER
          };
        } else if (credentials.type === "CITIZEN") {
          const citizen = await prisma.citizen.findUnique({
            where: { aadhaar: credentials.identifier },
          });

          if (!citizen || !citizen.passwordHash) return null;
          const isPasswordValid = await bcrypt.compare(credentials.password, citizen.passwordHash);
          if (!isPasswordValid) return null;

          return {
            id: citizen.id,
            employeeId: citizen.aadhaar, // Re-use this field for NextAuth type compatibility
            name: citizen.fullName,
            role: "CITIZEN", // Force CITIZEN role
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.employeeId = (user as any).employeeId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const userId = (token.id as string) || (token.sub as string);
        session.user = {
          ...session.user,
          id: userId,
          employeeId: token.employeeId as string,
          role: token.role as string,
        } as any;
      }
      return session;
    },
  },
};
