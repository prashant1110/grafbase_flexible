//information about logged in user

import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import { SessionInterface, UserProfile } from "@/common-types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // jwt:{
  //     encode:({secret,token})=>{

  //     },
  //     decode:async({secret,token})=>{

  //     }
  // },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
        const email=session?.user?.email

        try {
            const data=await getUser(email) as {user?:UserProfile}

            const newSession={
                ...session,
                user:{
                    ...session.user,
                    ...data?.user
                }
            }
        } catch (error) {
            console.log(error)
        }

      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      //adapter user:oauth user,User: added user
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExists) {
          await createUser(
            user?.name as string,
            user?.email as string,
            user?.image as string
          );
        }

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function curentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
