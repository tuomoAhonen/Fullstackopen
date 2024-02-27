import {CoursePart} from '../types';

const assertNever = (coursePart: CoursePart): string => {
	return `This course is unhandled correctly at interface or at switch case level: ${JSON.stringify(
		coursePart
	)}`;
};

const styles = {
	//padding: '5px',
	marginBottom: '10px',
};

const stylesP = {
	margin: 0,
	padding: 0,
};

const Part = ({coursePart}: {coursePart: CoursePart}): React.ReactElement | null => {
	switch (coursePart.kind) {
		case 'basic':
			return (
				<div style={styles}>
					<p style={stylesP}>Name: {coursePart.name}</p>
					<p style={stylesP}>Description: {coursePart.description}</p>
					<p style={stylesP}>Exercises: {coursePart.exerciseCount}</p>
				</div>
			);
		case 'group':
			return (
				<div style={styles}>
					<p style={stylesP}>Name: {coursePart.name}</p>
					<p style={stylesP}>Group projects: {coursePart.groupProjectCount}</p>
					<p style={stylesP}>Exercises: {coursePart.exerciseCount}</p>
				</div>
			);
		case 'background':
			return (
				<div style={styles}>
					<p style={stylesP}>Name: {coursePart.name}</p>
					<p style={stylesP}>Description: {coursePart.description}</p>
					<p style={stylesP}>Material: {coursePart.backgroundMaterial}</p>
					<p style={stylesP}>Exercises: {coursePart.exerciseCount}</p>
				</div>
			);
		case 'special':
			return (
				<div style={styles}>
					<p style={stylesP}>Name: {coursePart.name}</p>
					<p style={stylesP}>Description: {coursePart.description}</p>
					<p style={stylesP}>Exercises: {coursePart.exerciseCount}</p>
					<div style={stylesP}>
						Requirements:{' '}
						{coursePart.requirements
							.map((requirement) => requirement)
							.join(', ')
							.trim()}
					</div>
				</div>
			);
		default:
			console.log(assertNever(coursePart));
			return null;
	}
};

export default Part;
