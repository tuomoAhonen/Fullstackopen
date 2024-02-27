import {StyleSheet, View} from 'react-native';
import SearchWord from './SearchWord';
import Sorting from './Sorting';

const styles = StyleSheet.create({
	view: {
		backgroundColor: 'darkolivegreen',
		padding: 5,
		marginBottom: 5,
	},
});

const ListHeaderComponentArea = ({sorting, setSorting, searchWord, setSearchWord}) => {
	return (
		<View style={styles.view}>
			<SearchWord searchWord={searchWord} setSearchWord={setSearchWord} />
			<Sorting sorting={sorting} setSorting={setSorting} />
		</View>
	);
};

export default ListHeaderComponentArea;
