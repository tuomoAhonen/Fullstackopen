import {StyleSheet} from 'react-native';
import {basicTheme} from './BasicStyles';

//tässä esimerkki BasicStyles.jsx:n mietintöihin
//tämä parempi kuin, että BasicStyles.jsx:stä importataan komponentteihin suoraan tyylejä

const viewStyleSheet = StyleSheet.create({
	black: {
		backgroundColor: basicTheme.bgColors.black,
		padding: 5,
	},
	darkOliveGreen: {
		backgroundColor: basicTheme.bgColors.darkOliveGreen,
		padding: 5,
	},
	darkSalmon: {
		backgroundColor: basicTheme.bgColors.darkSalmon,
		padding: 5,
	},
	darkSeaGreen: {
		backgroundColor: basicTheme.bgColors.darkSeaGreen,
		padding: 5,
	},
	darkSlateGrey: {
		backgroundColor: basicTheme.bgColors.darkSlateGrey,
		padding: 5,
	},
	floralWhite: {
		backgroundColor: basicTheme.bgColors.floralWhite,
		padding: 5,
	},
});

export {viewStyleSheet};
