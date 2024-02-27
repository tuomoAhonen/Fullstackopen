import {gql} from '@apollo/client';

export const getRepository = gql`
	query Repository($repositoryId: ID!, $firstReviews: Int, $afterReviews: String) {
		repository(id: $repositoryId) {
			id
			fullName
			description
			language
			ownerAvatarUrl
			stargazersCount
			ratingAverage
			forksCount
			reviewCount
			url
			reviews(first: $firstReviews, after: $afterReviews) {
				edges {
					node {
						id
						createdAt
						rating
						text
						user {
							username
						}
					}
				}
				pageInfo {
					hasPreviousPage
					hasNextPage
					startCursor
					endCursor
				}
			}
		}
	}
`;

export const getRepositories = gql`
	query Repositories(
		$first: Int
		$after: String
		$orderDirection: OrderDirection
		$orderBy: AllRepositoriesOrderBy
		$searchKeyword: String
	) {
		repositories(
			first: $first
			after: $after
			orderDirection: $orderDirection
			orderBy: $orderBy
			searchKeyword: $searchKeyword
		) {
			edges {
				node {
					id
					fullName
					description
					language
					ownerAvatarUrl
					stargazersCount
					ratingAverage
					forksCount
					reviewCount
				}
				cursor
			}
			pageInfo {
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
`;

export const getRepositoriesNamesOwners = gql`
	query Repositories {
		repositories {
			edges {
				node {
					id
					fullName
					name
					ownerName
				}
			}
		}
	}
`;

export const getMe = gql`
	query Me($includeReviews: Boolean = false, $first: Int, $after: String) {
		me {
			id
			username
			reviews(first: $first, after: $after) @include(if: $includeReviews) {
				edges {
					node {
						id
						createdAt
						rating
						text
						repository {
							id
							fullName
						}
					}
					cursor
				}
				pageInfo {
					hasPreviousPage
					hasNextPage
					startCursor
					endCursor
				}
			}
		}
	}
`;

export const getMyReviews = gql`
	query Me {
		me {
			id
			username
			reviews {
				edges {
					node {
						id
						createdAt
						rating
						text
						repository {
							id
							fullName
						}
					}
				}
			}
		}
	}
`;

export const getRepositoryIdsOfReviews = gql`
	query UsersReviewsRepositoryIds {
		me {
			id
			username
			reviews {
				edges {
					node {
						id
						repositoryId
						repository {
							id
							fullName
							name
							userHasReviewed
						}
					}
				}
			}
		}
	}
`;
