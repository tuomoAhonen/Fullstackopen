import {View, Image, StyleSheet, Pressable} from 'react-native';
import CustomText from '../customComponents/CustomText';
import {viewStyleSheet} from '../../styles/themes/ViewStyles';
import ItemStatistics from './ItemStatistics';
import {useNavigate} from 'react-router-native';
import RepositoryItemViewInfo from './RepositoryItemViewInfo';

const styles = StyleSheet.create({
	statisticsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-evenly',
	},
	basicContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		gap: 20,
		flexShrink: 1,
		marginBottom: 20,
	},
	informationContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		gap: 10,
		flexShrink: 1,
	},
	image: {
		height: 50,
		width: 50,
		backgroundColor: '#ffffff',
	},
});

const RepositoryItem = ({item}) => {
	//console.log(item);
	const navigate = useNavigate();
	//const authStorage = useAuthStorage();
	//console.log(`/itemview:${item.id}`);
	return (
		<Pressable onPress={() => navigate(`/repository/:${item.id}` /*, {state: {repositoryId: item.id}}*/)}>
			<RepositoryItemViewInfo item={item} />
			{/* <View
				testID='repositoryItem'
				style={{
					...viewStyleSheet.darkOliveGreen,
				}}
			>
				<View style={{...styles.basicContainer, elevation: 0, zIndex: 0}}>
					<Image source={{uri: item.ownerAvatarUrl}} style={styles.image} />
					<View style={styles.informationContainer}>
						<CustomText defaultStyle={'headingWhite'}>{item.fullName}</CustomText>
						<CustomText defaultStyle={'textWhite'}>{item.description}</CustomText>
						<CustomText defaultStyle={'textWhite'}>{item.language}</CustomText>
					</View>
				</View>
				<View style={styles.statisticsContainer}>
					<ItemStatistics statistic={item.stargazersCount} name={'Stars'} />
					<ItemStatistics statistic={item.ratingAverage} name={'Rating'} />
					<ItemStatistics statistic={item.forksCount} name={'Forks'} />
					<ItemStatistics statistic={item.reviewCount} name={'Reviews'} />
				</View>
			</View>
			*/}
		</Pressable>
	);
};

export default RepositoryItem;
