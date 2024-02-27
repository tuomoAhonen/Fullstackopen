import {View} from 'react-native';
import CustomText from '../customComponents/CustomText';

const ItemStatistics = ({statistic, name}) => {
	if (statistic > 999) {
		statistic = (statistic / 1000).toFixed(1) + 'k';
	}

	return (
		<View testID={name}>
			<CustomText defaultStyle={'textWhite'}>{statistic}</CustomText>
			<CustomText>{name}</CustomText>
		</View>
	);
};

export default ItemStatistics;
