import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production' || ''
const apiURL = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein'
const serverURL = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000'

const client = new GraphQLClient(apiURL)

const makeGraphQLRequest = async(query: string, variable = {}) => {
    try {
        return await client.request(query,variable)
    } catch (error) {
        throw (error)
    }
}

export const getUser=(email:string)=>{
    return makeGraphQLRequest(getUserQuery,{email})
}

export const createUser=(name:string,email:string,avatarUrl:string)=>{
    const variable={
        name,email,avatarUrl
    }

    return makeGraphQLRequest(createUserMutation,variable)
}