import {TextInput, StyleSheet} from 'react-native';

//const styles = StyleSheet.create({});

const CustomTextInput = ({style, /*error, */ ...props}) => {
	//const textInputStyle = [styles];
	//console.log(style);
	//console.log(error);
	return <TextInput style={style} {...props} />;
};

export default CustomTextInput;
