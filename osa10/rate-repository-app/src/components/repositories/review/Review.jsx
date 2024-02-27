import {View} from 'react-native';
import format from 'date-fns/format';
import {viewStyleSheet} from '../../../styles/themes/ViewStyles';
import CustomText from '../../customComponents/CustomText';

const Review = ({item}) => {
	//console.log('item', item);
	return (
		<View
			style={{
				...viewStyleSheet.darkOliveGreen,
				marginBottom: 5,
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'nowrap',
				//justifyContent: 'flex-start',
				columnGap: 10,
			}}
		>
			<View
				style={{
					width: 48,
					height: 48,
					borderWidth: 2,
					borderColor: 'darkseagreen',
					borderRadius: 24,
					//alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CustomText defaultStyle={'headingWhite'}>{item.node.rating}</CustomText>
			</View>
			<View style={{display: 'flex', flexDirection: 'column', flexShrink: 1, flexWrap: 'wrap', rowGap: 10}}>
				<CustomText defaultStyle={'headingWhite'} style={{width: '100%', flexShrink: 1, flexWrap: 'wrap'}}>
					{item.node.user.username}
				</CustomText>
				{item.node.createdAt && (
					<CustomText defaultStyle={'textWhite'} style={{width: '100%', flexShrink: 1, flexWrap: 'wrap'}}>
						{format(new Date(item.node.createdAt), 'dd.MM.yyyy')}
					</CustomText>
				)}
				{item.node.text && (
					<CustomText defaultStyle={'textWhite'} style={{width: '100%', flexShrink: 1, flexWrap: 'wrap'}}>
						{item.node.text}
					</CustomText>
				)}
			</View>
		</View>
	);
};

export default Review;
