import {CoursePart} from '../types';

const Total = ({courseParts}: {courseParts: CoursePart[]}): React.ReactElement => {
	return (
		<div>
			Total of exercises on this course:{' '}
			{courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)}
		</div>
	);
};

export default Total;
