import {StyleSheet, View} from 'react-native';
import {useField} from 'formik';

import CustomTextInput from './CustomTextInput';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	errorText: {
		//position: 'absolute',
		//top: 9,
		//right: 5,
		zIndex: 1,
		marginBottom: 5,
		marginTop: -5,
		padding: 0,
		color: 'darksalmon',
	},
});

const FormikTextInput = ({name, style, ...props}) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	const errorConditionalStyles = {
		borderWidth: 1,
		borderColor: showError ? 'darksalmon' : 'white',
	};

	return (
		<View>
			<CustomTextInput
				value={field.value}
				//error={showError}
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				style={{...style, ...errorConditionalStyles}}
				{...props}
			/>
			{showError && <CustomText style={styles.errorText}>{meta.error}</CustomText>}
		</View>
	);
};

export default FormikTextInput;
