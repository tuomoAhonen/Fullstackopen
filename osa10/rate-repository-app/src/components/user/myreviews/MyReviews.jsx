import {FlatList, StyleSheet, View} from 'react-native';
import CustomText from '../../customComponents/CustomText';
import {useQuery} from '@apollo/client';
import {getMe, getMyReviews} from '../../../graphql/Queries';
import MyReviewView from './MyReviewView';

const styles = StyleSheet.create({
	container: {
		margin: 0,
		padding: 0,
		//height: '100%',
	},
});

const MyReviews = () => {
	const {data, error, loading, fetchMore} = useQuery(/*getMyReviews*/ getMe, {
		variables: {includeReviews: true, first: 7},
		//fetchPolicy: 'network-only',
	});

	const onEndReached = async () => {
		//console.log('onEndReached activated');
		const fetchabilityCheck = !loading && data?.me.reviews.pageInfo.hasNextPage;

		if (!fetchabilityCheck) {
			return;
		}

		return await fetchMore({
			variables: {after: data.me.reviews.pageInfo.endCursor},
		});
	};

	if (loading) {
		return <CustomText defaultStyle={'textWhite'}>Loading...</CustomText>;
	}

	if (error) {
		<CustomText defaultStyle={'textWhite'}>{error.message}</CustomText>;
	}

	/*
	if (data) {
		console.log(data);
	}
	*/

	return (
		<View style={styles.container}>
			{data && data.me && data.me.reviews && data.me.reviews.edges && data.me.reviews.edges.length !== 0 ? (
				<FlatList
					data={data.me.reviews.edges}
					onEndReachedThreshold={0.5}
					onEndReached={async () => await onEndReached()}
					renderItem={({item, index}) => <MyReviewView key={index} item={item} />}
					//keyExtractor={(item) => item.id}
					//style={{elevation: 0}}
				/>
			) : (
				<CustomText defaultStyle={'textWhite'} style={{marginLeft: 5}}>
					Reviews not found...
				</CustomText>
			)}
		</View>
	);
};

export default MyReviews;
