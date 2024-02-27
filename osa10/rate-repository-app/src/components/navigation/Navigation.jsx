import {StyleSheet, View} from 'react-native';
import NavigationTab from './NavigationTab';

const Navigation = ({navDisplayed, setNavDisplayed, data}) => {
	const styles = StyleSheet.create({
		view: {
			display: navDisplayed === true ? 'flex' : 'none',
			flexDirection: 'column',
			flexWrap: 'wrap',
			gap: 5,
			//marginTop: 0,
			paddingTop: 5,
			paddingBottom: 5,
			//justifyContent: 'space-between',
			//position: 'absolute',
			//backgroundColor: 'darkslategrey',
			//zIndex: 100,
			//elevation: 1000,
			//top: 25,
			//left: 5,
		},
	});

	return (
		<View style={styles.view}>
			<NavigationTab name={'Repositories'} link={'/'} setNavDisplayed={setNavDisplayed} />
			{data && data.me !== null && (
				<>
					<NavigationTab name={'Review repository'} link={'/reviewrepository'} setNavDisplayed={setNavDisplayed} />
					<NavigationTab name={'My reviews'} link={'/myreviews'} setNavDisplayed={setNavDisplayed} />
				</>
			)}
			{data && data.me === null && (
				<NavigationTab name={'Sign up'} link={'/signup'} setNavDisplayed={setNavDisplayed} />
			)}
		</View>
	);
};

export default Navigation;
