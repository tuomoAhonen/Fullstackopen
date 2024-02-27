import {Platform, StyleSheet} from 'react-native';

//tämän basicThemen lisäksi voisi tehdä toisen tai useamman StyleSheetin,
//johon tehdä tämän perusteelta valmistyylejä eri elementeille tai komponenteille,
//joita voisi sitten käyttää appissä importaamalla. Tämä johtaisi siihen, että
//tyylit pysyvät yhtenäisinä helpommin vain tiettyä StyleSheetiä muokkaamalla.
//lisäksi olisi vähemmän koodia, kuin se että jokaiseen komponenttiin kirjoitetaan
//erikseen omat tyylit StyleSheetille

const basicTheme = StyleSheet.create({
	colors: {
		black: '#000000',
		white: '#ffffff',
		dimGrey: '#696969',
		gainsboro: '#DCDCDC',
	},
	bgColors: {
		black: '#000000',
		floralWhite: '#FFFAF0',
		darkOliveGreen: '#556B2F',
		darkSeaGreen: '#8FBC8F',
		darkSalmon: '#E9967A',
		darkSlateGrey: '#2F4F4F',
	},
	fonts: {
		//main: 'System',
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
		}),
	},
	fontSizes: {
		body: 20,
		heading: 24,
	},
	fontWeights: {
		normal: 400,
		bold: 600,
	},
});

export {basicTheme};
