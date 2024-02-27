import {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {Picker} from '@react-native-picker/picker';
import {useField} from 'formik';

import {getRepositoriesNamesOwners} from '../../graphql/Queries';
import CustomText from '../customComponents/CustomText';
import FieldOwnerName from './FieldOwnerName';
import PickerSelectView from './PickerSelectView';

/*
const styles = StyleSheet.create({
	errorText: {
		position: 'absolute',
		top: 9,
		right: 5,
		zIndex: 1,
		margin: 0,
		padding: 0,
		color: 'darksalmon',
	},
	item: {
		fontSize: 20,
	},
});
*/

const FormikSelectRepository = ({/*name,*/ style, ...props}) => {
	//const [repositories, setRepositories] = useState('');
	const {data, error, loading} = useQuery(getRepositoriesNamesOwners, {fetchPolicy: 'no-cache'});

	/*
	const [ownerNameValue, setOwnerNameValue] = useState('');
	const [field, meta, helpers] = useField('name');
	const showError = meta.touched && meta.error;

	const errorConditionalStyles = {
		borderWidth: 1,
		borderColor: showError ? 'darksalmon' : 'white',
	};

	useEffect(() => {
		if (
			!loading &&
			!error &&
			data &&
			data.repositories &&
			data.repositories.edges &&
			data.repositories.edges.length > 0 &&
			data.repositories.edges[0]
			//data.repositories.edges[0].node
		) {
			//console.log('eka', data.repositories.edges.length);
			//setRepositories(data.repositories);
			const first = data.repositories.edges[0] && data.repositories.edges[0];
			//console.log(first.node.name);
			//console.log(first);
			helpers.setValue(first.node.name);
		}
		//console.log('eka meni läpi');
	}, [data]);

	//voisi ehkä kokeilla hakea oikeita tietoja Queryllä repositories input valueilla
	//tämän sijaan, jolloin ei tarvitsisi käyttää arrayn findia
	useEffect(() => {
		if (
			!loading &&
			!error &&
			data &&
			data.repositories &&
			data.repositories.edges &&
			data.repositories.edges.length > 0 &&
			data.repositories.edges[0]
			//data.repositories.edges[0].node
		) {
			//console.log('toka', data.repositories.edges.length);
			const ownerNameFound =
				data.repositories.edges[0] && data.repositories.edges.find((edge) => edge.node.name === field.value);
			//console.log('ownerNameFound läpi');
			//console.log(ownerNameFound);
			setOwnerNameValue(ownerNameFound.node.ownerName);
			//console.log('setOwnerNameValue läpi');
		}
		//console.log('toka meni läpi');
	}, [field.value]);
	*/

	if (loading) {
		return null;
	}

	if (error) {
		return <CustomText defaultStyle={'textWhite'}>{error.message}</CustomText>;
	}

	return <>{data && <PickerSelectView data={data} style={style} props={props} />}</>;

	/*
	return (
		<>
			{
				 data && (
					<Picker
						//as='select'
						//mode='dropdown'
						selectedValue={field.value}
						onValueChange={(value) => {
							//console.log(value);
							return helpers.setValue(value);
						}}
						//itemStyle={{backgroundColor: 'darksalmon'}}
						style={{...style, ...errorConditionalStyles}}
						{...props}
						itemStyle={styles.item}
					>
						{
						//data &&
						//data.repositories &&
						//data.repositories.edges &&
						//data.repositories.edges.length > 0 &&
						//data.repositories.edges[0] &&
						//data.repositories.edges[0].node &&
							data.repositories.edges.map((repository, index) => (
								<Picker.Item
									key={index}
									label={repository.node.name}
									value={repository.node.name}
									//style={{backgroundColor: 'darksalmon'}}
								/>
							))
						}
					</Picker>
				)
			}
			{showError && <CustomText style={styles.errorText}>{meta.error}</CustomText>}
			<FieldOwnerName value={ownerNameValue} />
		</>
	);
	*/
};

export default FormikSelectRepository;
