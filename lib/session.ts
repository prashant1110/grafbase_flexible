//information about logged in user

import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { AdapterUser } from "next-auth/adapters";
import { SessionInterface } from "@/common-types";

export const authOptions:NextAuthOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // jwt:{
    //     encode:({secret,token})=>{

    //     },
    //     decode:async({secret,token})=>{

    //     }
    // },
    theme:{
        colorScheme:'light',
        logo:'/logo.svg'
    },
    callbacks:{
        async session({session}){
            return session;
        },
        async signIn({user}:{user:AdapterUser|User}){
            try {
                return true
            } catch (error:any) {
                console.log(error)
                return false
            }
        },
    }
}

export async function curentUser(){
    const session=await getServerSession(authOptions) as SessionInterface;

    return session
}