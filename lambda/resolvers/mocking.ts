import casual from "casual";

const mocks = {
	User: () => ({
		id: casual.uuid,
		name: casual.full_name,
		avatar: casual.url,
		email: casual.email,
		username: casual.username,
		password: casual.password
	}),
	Game: () => ({
		id: casual.uuid,
		name: casual.title,
		cover: casual.url,
		genres: casual.array_of_words(3),
		companies: casual.array_of_words(3)
	})
};

export default mocks;
