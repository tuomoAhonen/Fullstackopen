import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import {useMutation, useQuery} from '@apollo/client';
import {Formik} from 'formik';
import {object, string, number} from 'yup';

import {viewStyleSheet} from '../../styles/themes/ViewStyles';
import CustomText from '../customComponents/CustomText';
import FormikTextInput from '../customComponents/FormikTextInput';
import FormikSelectRepository from './FormikSelectRepository';
import {getRepositoryIdsOfReviews, getRepositories, getMe} from '../../graphql/Queries';
import {createReviewForRepository} from '../../graphql/Mutations';

//Most of the StyleSheets could be imported from same styling-file, but this is just an excercise
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
		fontSize: 20,
	},
	select: {
		width: '100%',
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 5,
		borderRadius: 5,
		backgroundColor: '#ffffff',
		fontSize: 20,
	},
	button: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: 'darkseagreen',
	},
	buttonText: {
		//fontSize: 14,
		letterSpacing: 1,
	},
});

const initialValues = {
	name: '',
	ownerName: '',
	rating: '',
	text: '',
};

const validationSchema = object({
	name: string().required(),
	ownerName: string().required(),
	rating: number().min(0).max(100).positive().integer().required(),
	text: string().optional(),
});

export const ReviewForm = ({handleSubmit /*, data*/}) => {
	return (
		<View style={{...viewStyleSheet.darkOliveGreen, height: '100%'}}>
			<FormikSelectRepository style={styles.select} />
			<FormikTextInput name='rating' placeholder='Rating between 0-100...' style={styles.textInputFields} />
			<FormikTextInput name='text' placeholder='Review, optional...' style={styles.textInputFields} />
			<Pressable onPress={handleSubmit} style={styles.button}>
				<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
					Submit
				</CustomText>
			</Pressable>
		</View>
	);
	/*
	const [mutationCreateReview] = useMutation(createReviewForRepository, {
		refetchQueries: [{query: getRepositories}, {query: getRepositoryIdsOfReviews}, {query: getMe}],
	});
	//console.log(handleSubmit);
	const navigate = useNavigate();

	const handleSubmit = async (values, actions) => {
		//console.log(values, actions);
		const {name, ownerName, rating, text} = values;
		//console.log(name, ownerName, rating, text);

		//console.log(data);
		if (
			data &&
			data.me &&
			data.me.reviews &&
			data.me.reviews.edges &&
			data.me.reviews.edges.length > 0 &&
			data.me.reviews.edges[0] &&
			//data.me.reviews.edges[0].node &&
			data.me.reviews.edges.find((edge) => edge.node.repository.name === name)
		) {
			//return console.log('found old review');
			return Alert.alert('You have already reviewed this repository.', 'Contact administration for removal.');
		}

		//(async () => {
		try {
			//console.log('meneekö try catchiin');
			const result = await mutationCreateReview({
				variables: {review: {repositoryName: name, ownerName, rating: Number(rating), text}},
			});
			//console.log(actions);
			//actions.setValues({rating: '', text: ''});
			console.log(result);
			navigate(`/repository/:${result.data.createReview.repository.id}`);
			return Alert.alert(
				'Success',
				`Review was successfully added for repository: ${result.data.createReview.repository.fullName}`
			);
			//return actions.resetForm();
		} catch (e) {
			console.log(e);
			return Alert.alert('Error', 'Something went wrong');
		}
		//})();
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({handleSubmit}) => (
				<View style={{...viewStyleSheet.darkOliveGreen, height: '100%'}}>
					<FormikSelectRepository style={styles.select} />
					<FormikTextInput name='rating' placeholder='Rating between 0-100...' style={styles.textInputFields} />
					<FormikTextInput name='text' placeholder='Review, optional...' style={styles.textInputFields} />
					<Pressable onPress={handleSubmit} style={styles.button}>
						<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
							Submit
						</CustomText>
					</Pressable>
				</View>
			)}
		</Formik>
	);
	*/
};

const ReviewRepository = () => {
	const {data, error, loading} = useQuery(getRepositoryIdsOfReviews);
	const [mutationCreateReview] = useMutation(createReviewForRepository, {
		refetchQueries: [{query: getRepositories}, {query: getRepositoryIdsOfReviews}, {query: getMe}],
	});

	const navigate = useNavigate();

	const handleSubmit = async (values, actions) => {
		//console.log(values, actions);
		const {name, ownerName, rating, text} = values;
		//console.log(name, ownerName, rating, text);

		//console.log(data);
		if (
			data &&
			data.me &&
			data.me.reviews &&
			data.me.reviews.edges &&
			data.me.reviews.edges.length > 0 &&
			data.me.reviews.edges[0] &&
			data.me.reviews.edges[0].node &&
			data.me.reviews.edges.find((edge) => edge.node.repository.name === name)
		) {
			//return console.log('found old review');
			return Alert.alert('You have already reviewed this repository.', 'Contact administration for removal.');
		}

		//(async () => {
		try {
			//console.log('meneekö try catchiin');
			const result = await mutationCreateReview({
				variables: {review: {repositoryName: name, ownerName, rating: Number(rating), text}},
			});
			//console.log(actions);
			//actions.setValues({rating: '', text: ''});
			console.log(result);
			navigate(`/repository/:${result.data.createReview.repository.id}`);
			return Alert.alert(
				'Success',
				`Review was successfully added for repository: ${result.data.createReview.repository.fullName}`
			);
			//return actions.resetForm();
		} catch (e) {
			console.log(e);
			return Alert.alert('Error', 'Something went wrong');
		}
		//})();
	};

	if (loading) {
		return null;
	}

	if (error) {
		return <CustomText defaultStyle={'textWhite'}>{error.message}</CustomText>;
	}

	//return <>{data && <ReviewForm data={data} />}</>;
	return (
		<>
			{data && (
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
					{({handleSubmit}) => <ReviewForm handleSubmit={handleSubmit} />}
				</Formik>
			)}
		</>
	);
};

export default ReviewRepository;
