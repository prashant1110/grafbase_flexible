const getUserQuery = `
query GetUser($email:String!){
    user(by:{email:$email}){
        id 
        name
        email
        avatarUrl
        description
        githubUrl
        linkedinUrl
    }
}
`;

const createUserMutation = `
mutation CreateUser($input:UserCreateInput!){
    userCreate(input:$input){
        id 
        name
        email
        description
        avatarUrl
        githubUrl
        linkedinUrl
    }
}
`;
