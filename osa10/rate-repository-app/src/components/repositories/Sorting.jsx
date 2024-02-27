import {Picker} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
	pickerStyle: {
		//zIndex: 10,
		//elevation: 10,
		fontSize: 20,
		margin: 0,
		padding: 0,
		backgroundColor: 'white',
		color: 'black',
	},
	item: {
		fontSize: 20,
	},
});

const Sorting = ({sorting, setSorting}) => {
	//console.log('sorting vaihtuu: ', sorting);
	return (
		<Picker
			//mode='dropdown'
			selectedValue={sorting}
			onValueChange={(value) => {
				//console.log(value);
				return setSorting(value);
			}}
			style={styles.pickerStyle}
			itemStyle={styles.item}
		>
			<Picker.Item label={'Latest repositories'} value={'latestCreated'} />
			<Picker.Item label={'Highest rated repositories'} value={'highestRated'} />
			<Picker.Item label={'Lowest rated repositories'} value={'lowestRated'} />
		</Picker>
	);
};

export default Sorting;
