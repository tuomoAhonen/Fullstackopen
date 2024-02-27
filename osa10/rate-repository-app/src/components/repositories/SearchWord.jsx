import {StyleSheet} from 'react-native';
import CustomTextInput from '../customComponents/CustomTextInput';

const styles = StyleSheet.create({
	textInputStyles: {
		padding: 15,
		marginBottom: 5,
		color: 'black',
		backgroundColor: 'white',
		fontSize: 20,
		fontStyle: 'normal',
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
	},
});

const SearchWord = ({searchWord, setSearchWord}) => {
	//console.log('searchWord vaihtuu: ' + searchWord);

	return (
		<CustomTextInput
			name={'searchWordInput'}
			value={searchWord}
			onChangeText={(text) => {
				//console.log(text);
				return setSearchWord(text);
			}}
			placeholder='Search...'
			style={styles.textInputStyles}
		/>
	);
};

export default SearchWord;
