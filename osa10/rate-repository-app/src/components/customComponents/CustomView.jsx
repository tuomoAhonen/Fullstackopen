import {View, StyleSheet} from 'react-native';
import basicTheme from '../../styles/themes/BasicStyles';

const styles = StyleSheet.create({
	darkSalmon: {
		backgroundColor: basicTheme.bgColors.darkSalmon,
	},
	darkSeaGreen: {
		backgroundColor: basicTheme.bgColors.darkSeaGreen,
	},
	darkSlateGrey: {
		backgroundColor: basicTheme.bgColors.darkSlateGrey,
	},
	floralWhite: {
		backgroundColor: basicTheme.bgColors.floralWhite,
	},
});

const CustomView = ({defaultStyle, style, ...props}) => {
	const viewStyles = [
		styles.floralWhite,
		defaultStyle === 'darkSalmon' && styles.darkSalmon,
		defaultStyle === 'darkSeaGreen' && styles.darkSeaGreen,
		defaultStyle === 'darkSlateGrey' && styles.darkSlateGrey,
		style,
	];

	return <View style={viewStyles} {...props} />;
};

export default CustomView;
