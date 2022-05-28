import { gql } from "@apollo/client";

export const CreateUser = gql`
    mutation CreateUser($email: String!, $username: String!, $password: String!) {
        createUser(email: $email, username: $username, password: $password)
    }
`;

export const Login = gql`
    mutation Login($userPair: KeyValuePair!, $password: String!) {
        loginUser(userPair: $userPair, password: $password)
    }
`;

export const EditUser = gql`
    mutation EditUser($userPairs: [KeyValuePair!]!) {
        editUser(userPairs: $userPairs) {
            name
            username
            avatar
            email
            password
        }
    }
`;

export const SendResetPasswordEmail = gql`
    mutation SendResetPasswordEmail($userPair: KeyValuePair!) {
        sendResetPasswordEmail(userPair: $userPair)
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser {
        deleteUser
    }
`;
