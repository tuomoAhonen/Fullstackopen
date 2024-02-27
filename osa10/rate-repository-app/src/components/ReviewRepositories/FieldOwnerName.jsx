import {StyleSheet, View} from 'react-native';
import {useField} from 'formik';
import FormikTextInput from '../customComponents/FormikTextInput';
import {useEffect} from 'react';
import CustomText from '../customComponents/CustomText';

const styles = StyleSheet.create({
	textInputFields: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: '#ffffff',
		color: '#000000',
		fontSize: 20,
	},
	errorText: {
		position: 'absolute',
		top: 9,
		right: 5,
		zIndex: 1,
		margin: 0,
		padding: 0,
		color: 'darksalmon',
	},
});

const FieldOwnerName = ({value}) => {
	const [field, meta, helpers] = useField('ownerName');
	const showError = meta.touched && meta.error;

	const errorConditionalStyles = {
		borderWidth: 1,
		borderColor: showError ? 'darksalmon' : 'white',
	};

	useEffect(() => {
		helpers.setValue(value);
	}, [value]);

	return (
		<View>
			<FormikTextInput
				name='ownerName'
				style={{...styles.textInputFields, ...errorConditionalStyles}}
				editable={false}
			/>
			{showError && <CustomText style={styles.errorText}>{meta.error}</CustomText>}
		</View>
	);
};

export default FieldOwnerName;
