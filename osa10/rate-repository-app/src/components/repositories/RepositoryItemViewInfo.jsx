import {Image, Pressable, View} from 'react-native';
import * as Linking from 'expo-linking';
import CustomText from '../customComponents/CustomText';
import ItemStatistics from './ItemStatistics';
import {viewStyleSheet} from '../../styles/themes/ViewStyles';

const RepositoryItemViewInfo = ({item}) => {
	const openGitHubUrl = async (url) => {
		try {
			return await Linking.openURL(`${url}`);
		} catch (e) {
			return console.log(e);
		}
	};

	return (
		<View style={{...viewStyleSheet.darkOliveGreen, marginBottom: 5, display: 'flex', rowGap: 10}}>
			<View
				testID='repositoryItem'
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'nowrap',
					justifyContent: 'flex-start',
					columnGap: 10,
				}}
			>
				<Image source={{uri: item.ownerAvatarUrl}} style={{height: 50, width: 50, backgroundColor: '#ffffff'}} />
				<View style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', rowGap: 10}}>
					<CustomText defaultStyle={'headingWhite'}>{item.fullName}</CustomText>
					<CustomText defaultStyle={'textWhite'}>{item.description}</CustomText>
					<CustomText defaultStyle={'textWhite'}>{item.language}</CustomText>
				</View>
			</View>
			<View style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly'}}>
				<ItemStatistics statistic={item.stargazersCount} name={'Stars'} />
				<ItemStatistics statistic={item.ratingAverage} name={'Rating'} />
				<ItemStatistics statistic={item.forksCount} name={'Forks'} />
				<ItemStatistics statistic={item.reviewCount} name={'Reviews'} />
			</View>
			{item.url && (
				<Pressable
					onPress={() => openGitHubUrl(item.url)}
					style={{
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						paddingVertical: 5,
						borderRadius: 5,
						elevation: 3,
						backgroundColor: 'darkseagreen',
					}}
				>
					<CustomText defaultStyle={'textBlack'} style={{fontSize: 14, letterSpacing: 1}}>
						Open in GitHub
					</CustomText>
				</Pressable>
			)}
		</View>
	);
};

export default RepositoryItemViewInfo;
