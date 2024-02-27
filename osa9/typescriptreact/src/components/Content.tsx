import {CoursePart} from '../types';
import Part from './Part';

const Content = ({courseParts}: {courseParts: CoursePart[]}): React.ReactElement => {
	return (
		<div>
			{courseParts.map((part, index) => (
				<Part key={index} coursePart={part} />
			))}
		</div>
	);
};

export default Content;
