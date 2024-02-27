import {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
//import {within} from '@testing-library/dom';
import {MockedProvider} from '@apollo/client/testing';

import RepositoryList, {RepositoryListContainer} from '../../components/repositories/RepositoryList';
import {getRepositories} from '../../graphql/Queries';
import {GraphQLError} from 'graphql';

const repositoriesMock = {
	edges: [
		{
			node: {
				fullName: 'Test repo 1',
				description: 'just a test repository, number 1',
				language: 'no language',
				ownerAvatarUrl: 'http://justanexampleurl1.com',
				stargazersCount: 0,
				ratingAverage: 0,
				forksCount: 0,
				reviewCount: 0,
			},
		},
		{
			node: {
				fullName: 'Test repo 2',
				description: 'just a test repository, number 2',
				language: 'no language',
				ownerAvatarUrl: 'http://justanexampleurl2.com',
				stargazersCount: 100,
				ratingAverage: 80,
				forksCount: 2000,
				reviewCount: 101,
			},
		},
	],
};

const mocks = [
	{
		request: {
			query: getRepositories,
		},
		result: {
			data: {
				repositories: {
					edges: [
						{
							node: {
								fullName: 'Test repo 1',
								description: 'just a test repository, number 1',
								language: 'no language',
								ownerAvatarUrl: 'http://justanexampleurl1.com',
								stargazersCount: 0,
								ratingAverage: 0,
								forksCount: 0,
								reviewCount: 0,
							},
						},
						{
							node: {
								fullName: 'Test repo 2',
								description: 'just a test repository, number 2',
								language: 'no language',
								ownerAvatarUrl: 'http://justanexampleurl2.com',
								stargazersCount: 100,
								ratingAverage: 80,
								forksCount: 2000,
								reviewCount: 101,
							},
						},
					],
				},
			},
		},
		errors: [new GraphQLError('Error!')],
	},
];

describe('testing RepositoryList', () => {
	it('mockup some data for RL', () => {
		render(<RepositoryListContainer repositories={repositoriesMock.edges} />);

		screen.debug();

		//searching items informations without testId
		expect(screen.getByText('Test repo 1')).toBeDefined();
		expect(screen.getByText('just a test repository, number 1')).toBeDefined();

		expect(screen.getByText('Test repo 2')).toBeDefined();
		expect(screen.getByText('just a test repository, number 2')).toBeDefined();

		const noLanguageTexts = screen.getAllByText('no language');
		//console.log(noLanguageTexts)
		expect(noLanguageTexts.length).toBe(2);
		const zeros = screen.getAllByText('0');
		expect(zeros.length).toBe(4);
	});

	it('async await', async () => {
		render(
			<MockedProvider mocks={mocks}>
				<RepositoryList />
			</MockedProvider>
		);

		screen.debug();

		expect(await screen.findByText('Loading repositories...')).toBeDefined();

		//searching items informations with testId
		const items = await screen.findAllByTestId('repositoryItem');
		const [testRepository1, testRepository2] = items;
		//console.log(testRepository1);

		expect(testRepository1).toHaveTextContent('Test repo 1');
		expect(testRepository1).toHaveTextContent('just a test repository, number 1');
		expect(testRepository1).toHaveTextContent('no language');

		expect(testRepository2).toHaveTextContent('Test repo 2');
		expect(testRepository2).toHaveTextContent('just a test repository, number 2');
		expect(testRepository2).toHaveTextContent('no language');

		const stars = await screen.findAllByTestId('Stars');
		expect(stars.length).toBe(2);
		expect(stars[0]).toHaveTextContent('0');
		expect(stars[0]).toHaveTextContent('Stars');
		expect(stars[1]).toHaveTextContent('100');
		expect(stars[1]).toHaveTextContent('Stars');

		const rating = await screen.findAllByTestId('Rating');
		expect(rating.length).toBe(2);
		expect(rating[0]).toHaveTextContent('0');
		expect(rating[0]).toHaveTextContent('Rating');
		expect(rating[1]).toHaveTextContent('80');
		expect(rating[1]).toHaveTextContent('Rating');

		const forks = await screen.findAllByTestId('Forks');
		expect(forks.length).toBe(2);
		expect(forks[0]).toHaveTextContent('0');
		expect(forks[0]).toHaveTextContent('Forks');
		expect(forks[1]).toHaveTextContent('2.0kForks');
		expect(forks[1]).toHaveTextContent('Forks');

		const reviews = await screen.findAllByTestId('Reviews');
		expect(reviews.length).toBe(2);
		expect(reviews[0]).toHaveTextContent('0');
		expect(reviews[0]).toHaveTextContent('Reviews');
		expect(reviews[1]).toHaveTextContent('101');
		expect(reviews[1]).toHaveTextContent('Reviews');
	});
});
