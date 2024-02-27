import {Pressable} from 'react-native';
import CustomText from '../customComponents/CustomText';
import {Link} from 'react-router-native';

const NavigationTab = ({name, link, setNavDisplayed}) => {
	return (
		<Pressable>
			<Link to={link} onPress={() => setNavDisplayed(false)}>
				<CustomText defaultStyle={'headingWhite'}>{name}</CustomText>
			</Link>
		</Pressable>
	);
};

export default NavigationTab;
