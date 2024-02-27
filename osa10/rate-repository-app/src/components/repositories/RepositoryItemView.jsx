import {useCallback, useEffect, useState} from 'react';
import {FlatList /*, Image*/, Pressable, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {/*useLocation, */ useNavigate} from 'react-router-native';

import {getRepository} from '../../graphql/Queries';
import CustomText from '../customComponents/CustomText';
import SvgAnglesLeft from '../customComponents/SvgAnglesLeft';
//import {viewStyleSheet} from '../../styles/themes/ViewStyles';
import Review from './review/Review';
//import ItemStatistics from './ItemStatistics';
import RepositoryItemViewInfo from './RepositoryItemViewInfo';

const RepositoryItemView = ({id}) => {
	const [sortedReviews, setSortedReviews] = useState();
	//console.log(id);
	const navigate = useNavigate();
	//const {state} = useLocation();
	//console.log(state);
	const {data, error, loading, fetchMore} = useQuery(getRepository, {
		variables: {repositoryId: id, firstReviews: 5 /*, state.repositoryId*/},
	});

	const onEndReached = async () => {
		//console.log('onEndReached');
		const fetchabilityCheck = !loading && data?.repository.reviews.pageInfo.hasNextPage;
		//console.log(fetchabilityCheck);
		if (!fetchabilityCheck) {
			return;
		}

		//console.log(data.repository.reviews.pageInfo.endCursor);
		return await fetchMore({
			variables: {
				//repositoryId: id,
				//first: 3,
				afterReviews: data.repository.reviews.pageInfo.endCursor,
			},
		});
	};

	const renderItem = useCallback(({item, index}) => <Review key={index} item={item} />, []);

	//this would be better to be done at backend/api or at db
	//sorting not working anymore with pagination, because the sorting should be done before on API/backend-level
	useEffect(() => {
		if (
			data &&
			data.repository &&
			data.repository.reviews &&
			data.repository.reviews.edges &&
			data.repository.reviews.edges.length > 0
		) {
			const sorted = data.repository.reviews.edges;
			/*
				.map((review) => review)
				.sort((a, b) => new Date(b.node.createdAt) - new Date(a.node.createdAt));
			//console.log(sorted);
			//console.log('sortattu');
			*/
			setSortedReviews(sorted);
		}
	}, [data]);

	if (loading) {
		return <CustomText defaultStyle={'textWhite'}>Loading repository's information...</CustomText>;
	}

	if (error) {
		return <CustomText defaultStyle={'textWhite'}>{error.message}</CustomText>;
	}

	/*
	if (data) {
		console.log(data);
	}
	*/

	return (
		<View style={{height: '100%'}}>
			<Pressable
				onPress={() => navigate('/')}
				style={{
					//height: 26,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'nowrap',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginBottom: 5,
					padding: 0,
				}}
			>
				<SvgAnglesLeft
					style={{height: 18, width: 18, color: '#ffffff', margin: 0, marginLeft: 5, marginRight: 5, padding: 0}}
					fill={'#ffffff'}
				/>
				<CustomText defaultStyle={'textWhite'} style={{letterSpacing: 1.25, margin: 0, padding: 0}}>
					Back to repositories
				</CustomText>
			</Pressable>
			{data && data.repository && <RepositoryItemViewInfo item={data.repository} />}
			{
				/*data &&
				data.repository &&
				data.repository.reviews &&
				data.repository.reviews.edges &&
				data.repository.reviews.edges.length > 0 && */
				sortedReviews && sortedReviews.length > 0 && (
					<FlatList
						data={sortedReviews}
						onEndReachedThreshold={0.5}
						onEndReached={async () => await onEndReached()}
						renderItem={renderItem}
						//keyExtractor={(item) => item.id}
						style={{elevation: 0}}
					/>
				)
			}
		</View>
	);
};

export default RepositoryItemView;
