import { gql } from "@apollo/client";

// Bad Area

export const CreateUser = gql`
	mutation CreateUser($email: String!, $password: String!, $username: String!) {
		createUser(email: $email, password: $password, username: $username)
	}
`;

export const Login = gql`
	mutation Login($type: LoginType!, $value: String!, $password: String!) {
		loginUser(type: $type, value: $value, password: $password)
	}
`;

export const GoogleLogin = gql`
	mutation GoogleLogin($token: ID!) {
		googleLogin(token: $token) {
			token
			redirectPath
		}
	}
`;

export const EditUser = gql`
	mutation EditUser(
		$name: String
		$username: String
		$avatar: String
		$email: String
		$password: String
	) {
		editUser(
			name: $name
			username: $username
			avatar: $avatar
			email: $email
			password: $password
		) {
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
