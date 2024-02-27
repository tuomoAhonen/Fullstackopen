import {useQuery} from '@apollo/client';
import {getRepositories} from '../graphql/Queries';
//import Constants from 'expo-constants';

const useRepositories = (repositoriesVariables) => {
	const {data, error, loading, fetchMore, refetch, ...result} = useQuery(getRepositories, {
		variables: repositoriesVariables,
	});

	const handleFetchMore = async () => {
		const fetchMoreAvailable = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!fetchMoreAvailable) {
			return;
		}

		return await fetchMore({
			variables: {
				first: 4,
				after: data.repositories.pageInfo.endCursor,
			},
		});
	};

	const handleReFetch = async (reFetchVariables) => {
		const reFetchAvailable = !loading;

		if (!reFetchAvailable) {
			return;
		}

		return await refetch({...reFetchVariables});
	};

	return {
		data: data?.repositories && data,
		error: error,
		loading: loading,
		refetch: handleReFetch,
		fetchMore: handleFetchMore,
		...result,
	};
};

export default useRepositories;

/*
const useRepositories = async () => {
	const [repositories, setRepositories] = useState();
	const [error, setError] = useState();
	const [isLoading, setLoading] = useState(false);

	const fetchRepositories = async () => {
		setLoading(true);

		try {
			const response = await fetch(`${Constants.expoConfig.extra.uri}api/repositories`);
			const json = await response.json();
			setRepositories(json);
			setLoading(false);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => (async () => await fetchRepositories())(), []);

	return {repositories, error, isLoading, refetch: fetchRepositories};
};


export default useRepositories;
*/
