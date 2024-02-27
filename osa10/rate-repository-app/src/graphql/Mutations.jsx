import {gql} from '@apollo/client';

export const createUserMutation = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			id
			username
		}
	}
`;

export const signInMutation = gql`
	mutation Authenticate($username: String!, $password: String!) {
		authenticate(credentials: {username: $username, password: $password}) {
			accessToken
		}
	}
`;

export const createReviewForRepository = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			createdAt
			repository {
				id
				fullName
				ownerName
			}
			rating
			text
			user {
				id
				username
			}
		}
	}
`;

export const deleteReviewMutation = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
