import {Text, StyleSheet} from 'react-native';
import {basicTheme} from '../../styles/themes/BasicStyles';

const styles = StyleSheet.create({
	textBlack: {
		color: basicTheme.colors.black,
		fontSize: basicTheme.fontSizes.body,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.normal,
	},
	textDimGrey: {
		color: basicTheme.colors.dimGrey,
		fontSize: basicTheme.fontSizes.body,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.normal,
	},
	textGainsboro: {
		color: basicTheme.colors.gainsboro,
		fontSize: basicTheme.fontSizes.body,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.normal,
	},
	textWhite: {
		color: basicTheme.colors.white,
		fontSize: basicTheme.fontSizes.body,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.normal,
	},
	headingBlack: {
		color: basicTheme.colors.black,
		fontSize: basicTheme.fontSizes.heading,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.bold,
	},
	headingDimGrey: {
		color: basicTheme.colors.dimGrey,
		fontSize: basicTheme.fontSizes.heading,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.bold,
	},
	headingGainsboro: {
		color: basicTheme.colors.gainsboro,
		fontSize: basicTheme.fontSizes.heading,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.bold,
	},
	headingWhite: {
		color: basicTheme.colors.white,
		fontSize: basicTheme.fontSizes.heading,
		fontFamily: basicTheme.fonts.main,
		fontWeight: basicTheme.fontWeights.bold,
	},
});

const CustomText = ({defaultStyle, style, ...props}) => {
	const textStyles = [
		styles.textBlack,
		defaultStyle === 'textDimGrey' && styles.textDimGrey,
		defaultStyle === 'textGainsboro' && styles.textGainsboro,
		defaultStyle === 'textWhite' && styles.textWhite,
		defaultStyle === 'headingBlack' && styles.headingBlack,
		defaultStyle === 'headingDimGrey' && styles.headingDimGrey,
		defaultStyle === 'headingGainsboro' && styles.headingGainsboro,
		defaultStyle === 'headingWhite' && styles.headingWhite,

		style,
	];

	return <Text style={textStyles} {...props} />;
};

export default CustomText;
