import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {useMutation} from '@apollo/client';
import format from 'date-fns/format';

import {viewStyleSheet} from '../../../styles/themes/ViewStyles';
import CustomText from '../../customComponents/CustomText';
import {deleteReviewMutation} from '../../../graphql/Mutations';
import {getMe, getRepositories, getRepositoryIdsOfReviews} from '../../../graphql/Queries';

const styles = StyleSheet.create({
	container: {
		...viewStyleSheet.darkOliveGreen,
		margin: 0,
		marginBottom: 5,
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		flexShrink: 1,
		rowGap: 10,
	},
	review: {
		display: 'flex',
		flexDirection: 'row',
		//flexWrap: 'wrap',
		//justifyContent: 'flex-start',
		//alignContent: 'flex-start',
		columnGap: 10,
		rowGap: 10,
	},
	leftView: {
		//height: '100%',
	},
	ratingCircle: {
		width: 48,
		height: 48,
		borderWidth: 2,
		borderColor: 'darkseagreen',
		borderRadius: 24,
		//alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightView: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		//justifyContent: 'flex-start',
		//alignContent: 'flex-start',
		//columnGap: 10,
		rowGap: 10,
	},
	buttonsRow: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'center',
		columnGap: 10,
	},
	buttonLeft: {
		width: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: 'darkseagreen',
	},
	buttonRight: {
		width: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: 'darksalmon',
	},
	buttonText: {
		letterSpacing: 1,
	},
});

const MyReviewView = ({item}) => {
	const [mutation] = useMutation(deleteReviewMutation, {
		refetchQueries: [{query: getMe}, {query: getRepositories}, {query: getRepositoryIdsOfReviews}],
	});

	const navigate = useNavigate();

	const handleDeleteReview = async (reviewId) => {
		//console.log(reviewId);
		try {
			const result = await mutation({variables: {deleteReviewId: reviewId}});
			console.log(result);
		} catch (e) {
			console.log(e);
			return Alert.alert('Error', 'Something went wrong...');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.review}>
				<View style={styles.leftView}>
					<View style={styles.ratingCircle}>
						<CustomText defaultStyle={'headingWhite'}>{item.node.rating}</CustomText>
					</View>
				</View>
				<View style={styles.rightView}>
					<CustomText defaultStyle={'headingWhite'}>{item.node.repository.fullName}</CustomText>
					{item.node.createdAt && (
						<CustomText defaultStyle={'textWhite'}>{format(new Date(item.node.createdAt), 'dd.MM.yyyy')}</CustomText>
					)}
					{item.node.text && <CustomText defaultStyle={'textWhite'}>{item.node.text}</CustomText>}
				</View>
			</View>
			<View style={styles.buttonsRow}>
				<Pressable onPress={() => navigate(`/repository/:${item.node.repository.id}`)} style={styles.buttonLeft}>
					<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
						View repository
					</CustomText>
				</Pressable>
				<Pressable
					onPress={() =>
						Alert.alert(
							'Delete review',
							'Are you sure, that you want to delete this review?',
							[
								{
									text: 'Cancel',
									style: 'cancel',
								},
								{
									text: 'Delete',
									onPress: () => handleDeleteReview(item.node.id),
									style: 'destructive',
								},
							],
							{cancelable: true}
						)
					}
					style={styles.buttonRight}
				>
					<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
						Delete review
					</CustomText>
				</Pressable>
			</View>
		</View>
	);
};

export default MyReviewView;
