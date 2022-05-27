import { gql } from "@apollo/client";

export const CreateUser = gql`
    mutation CreateUser($email: String!, $password: String!, $username: String!) {
        createUser(email: $email, password: $password, username: $username)
    }
`;

export const Login = gql`
    mutation Login($userValue: UserValuePayload!, $password: String!) {
        loginUser(userValue: $userValue, password: $password)
    }
`;

export const EditUser = gql`
    mutation EditUser($userValues: [UserValuePayload!]!) {
        editUser(userValues: $userValues) {
            name
            username
            avatar
            email
            password
        }
    }
`;

export const SendResetPasswordEmail = gql`
    mutation SendResetPasswordEmail($userValue: UserValuePayload!) {
        sendResetPasswordEmail(userValue: $userValue)
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser {
        deleteUser
    }
`;
