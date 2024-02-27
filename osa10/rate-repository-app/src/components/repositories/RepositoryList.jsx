import {useCallback, useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {useQuery} from '@apollo/client';

import RepositoryItem from './RepositoryItem';
//import useRepositories from '../../hooks/useRepositories';
import {getRepositories} from '../../graphql/Queries';
import CustomText from '../customComponents/CustomText';
import ListHeaderComponentArea from './ListHeaderComponentArea';
import {useDebounce} from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 5,
	},
	listHeaderComponent: {
		//backgroundColor: viewStyleSheet.darkOliveGreen,
	},
});

//const ItemSeparator = () => <View style={styles.separator}></View>;

export const RepositoryListContainer = ({
	repositories,
	sorting,
	setSorting,
	searchWord,
	setSearchWord,
	fetchMore,
	//endCursor,
}) => {
	const [repositoryNodes, setRepositoryNodes] = useState([]);

	//console.log(repositoryNodes.length, repositories.length);

	useEffect(() => {
		//localStoragella voisi tehdä repositoreille storagen, niin ei tarvitse joka kerta selata uudelleen läpi mihin jäänyt
		//tai jos mahdollista hakea sitä apollo clientin cachesta, niin ei välttämättä tarvitse
		//silloin verrattaisiin ekana if-lauseessa localstoragen pituutta repositoreihin, mistä pääteltäisiin, mitä käytetään
		//entäs useCallback?
		setRepositoryNodes(repositories ? repositories.map((edge) => edge.node) : repositoryNodes);
	}, [repositories]);

	//console.log(repositories);
	//Sortings and other similar logical coding are better to do at backend/api/db in most cases.
	//Less code/logic for front-end is almost allways more performant solution & experience.
	//const repositoryNodes = repositories ? repositories.map((edge) => edge.node) : [];
	/* repositories ? repositories.map((edge) => edge.node).sort((a, b) => a.fullName.localeCompare(b.fullName))
		: []; */

	//if (repositoryNodes) {
	//console.log(repositoryNodes.length);
	//}

	/*
	data && data.repositories && data.repositories.pageInfo && data.repositories.pageInfo.endCursor
		? data.repositories.pageInfo.endCursor
		: '',
	*/

	/*
	if (endCursor) {
		console.log(endCursor);
	}
	*/

	const onEndReached = () => {
		return fetchMore();
	};

	const renderItem = useCallback(({item, index}) => <RepositoryItem key={index} item={item} />, []);

	return (
		<FlatList
			data={repositoryNodes}
			onEndReachedThreshold={0.5}
			onEndReached={onEndReached}
			ListHeaderComponent={
				<ListHeaderComponentArea
					sorting={sorting}
					setSorting={setSorting}
					searchWord={searchWord}
					setSearchWord={setSearchWord}
				/>
			}
			ListHeaderComponentStyle={styles.listHeaderComponent}
			//ItemSeparatorComponent={ItemSeparator}
			renderItem={renderItem /*({item, index}) => <RepositoryItem key={index} item={item} />*/}
			//keyExtractor={(item) => item.id}
			style={{elevation: 0}}
		/>
	);
};

//RepositoryList is separated to two components, because it will make testing much easier.
//In tests, we will use just the container-component for component testing,
//so you can mock-up the data for repositories only.
//And you do not need to worry about useQueries or useHooks, if there was any.
const RepositoryList = () => {
	//const {repositories, error, isLoading} = useRepositories();
	//useStaten sijaan voitaisiin käyttää mahdollisesti Reactin reduceria, contextia ja hookkeja
	//nämä useStatet ovat laiskan miehen ratkaisuja, mutta toimivia
	const [searchWord, setSearchWord] = useState('');
	const [debounceValue] = useDebounce(searchWord, 500);
	const [sorting, setSorting] = useState('latestCreated');
	//console.log(sorting);
	const {data, error, loading, refetch, fetchMore} = useRepositories({
		first: 4,
	});
	/*const {data, error, loading, refetch, fetchMore} = useQuery(
		getRepositories,
		{variables: {first: 4}} /*, {fetchPolicy: 'cache-and-network'}*/
	//);
	//console.log(data, error, loading);
	//console.log(repositories);

	/*
	const handleFetchMore = async () => {
		const fetchabilityCheck = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!fetchabilityCheck) {
			return;
		}

		return await fetchMore({/*first: 2,*/ /* after: data.repositories.pageInfo.endCursor */ /*, ...variables*/ /*});*/
	//};

	useEffect(() => {
		(async () => {
			try {
				return await refetch({
					orderBy:
						sorting === 'highestRated' ? 'RATING_AVERAGE' : sorting === 'lowestRated' ? 'RATING_AVERAGE' : 'CREATED_AT',
					orderDirection: sorting === 'highestRated' ? 'DESC' : sorting === 'lowestRated' ? 'ASC' : 'DESC',
					searchKeyword: debounceValue /*searchWord*/,
				});
			} catch (e) {
				return console.log(e);
			}
		})();
	}, [sorting, debounceValue /*searchWord*/]);

	if (loading) {
		return <CustomText defaultStyle={'textWhite'}>Loading repositories...</CustomText>;
	}

	if (error) {
		return <CustomText defaultStyle={'textWhite'}>{error.message}</CustomText>;
	}

	/*
	if (data) {
		console.log(data);
	}
	*/

	//You might need to change .env apollo_uri for matching ip
	//to your project's emulator's ip or it could be network error also
	//or there is no data in your database/backend/apollo/api.
	//Check http://localhost:5000/api/repositories or http://localhost:4000/graphql/
	//Emulator ip is http://localhost:4000/graphql/ but the localhost is replaced by physical ip,
	//which is found when you start your project on android emulator

	return (
		<RepositoryListContainer
			repositories={data.repositories.edges}
			sorting={sorting}
			setSorting={setSorting}
			searchWord={searchWord}
			setSearchWord={setSearchWord}
			fetchMore={fetchMore}
			/*
			endCursor={
				data && data.repositories && data.repositories.pageInfo && data.repositories.pageInfo.endCursor
					? data.repositories.pageInfo.endCursor
					: ''
			}
			*/
		/>
	);
};

export default RepositoryList;

/*
const repositories = [
	{
		id: 'jaredpalmer.formik',
		fullName: 'jaredpalmer/formik',
		description: 'Build forms in React, without the tears',
		language: 'TypeScript',
		forksCount: 1589,
		stargazersCount: 21553,
		ratingAverage: 88,
		reviewCount: 4,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
	},
	{
		id: 'rails.rails',
		fullName: 'rails/rails',
		description: 'Ruby on Rails',
		language: 'Ruby',
		forksCount: 18349,
		stargazersCount: 45377,
		ratingAverage: 100,
		reviewCount: 2,
		ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
	},
	{
		id: 'django.django',
		fullName: 'django/django',
		description: 'The Web framework for perfectionists with deadlines.',
		language: 'Python',
		forksCount: 21015,
		stargazersCount: 48496,
		ratingAverage: 73,
		reviewCount: 5,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
	},
	{
		id: 'reduxjs.redux',
		fullName: 'reduxjs/redux',
		description: 'Predictable state container for JavaScript apps',
		language: 'TypeScript',
		forksCount: 13902,
		stargazersCount: 52869,
		ratingAverage: 0,
		reviewCount: 0,
		ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
	},
];
*/
