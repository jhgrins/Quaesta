import { gql } from "@apollo/client";

// Bad Area

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
        editUser(userValue: $userValues) {
            name
            username
            avatar
            email
            password
        }
    }
`;

export const SendResetPasswordEmail = gql`
    mutation SendResetPasswordEmail($email: String, $username: String) {
        sendResetPasswordEmail(email: $email, username: $username)
    }
`;

export const CreateSatellite = gql`
    mutation CreateSatellite {
        createSatellite {
            id
        }
    }
`;

export const ChangeSatelliteKey = gql`
    mutation ChangeSatelliteKey($id: ID!, $publicKey: String!) {
        changeSatelliteKey(id: $id, publicKey: $publicKey) {
            id
        }
    }
`;

export const EditSatelliteHardware = gql`
    mutation EditSatelliteHardware($id: ID!) {
        editSatelliteHardware(id: $id) {
            id
        }
    }
`;

export const DeleteSatellite = gql`
    mutation DeleteSatellite($id: ID!) {
        deleteSatellite(id: $id) {
            id
        }
    }
`;

export const DeleteUser = gql`
    mutation DeleteUser {
        deleteUser
    }
`;
