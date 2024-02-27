interface ExerciseInformation {
	periodLength: number;
	trainingDays: number;
	activityLevel: string;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

//type Rating = {value: 1, description: 'bad'} | {value: 2, description: 'good'} | {value: 3, description: 'excellent'};
//export type ExerciseHours = string[];

export const calculateExercises = (hours: number[], dailyTarget: number): ExerciseInformation => {
	const periodLength = hours.length;
	const trainingDays = hours.filter((value) => value !== 0).length;
	const activity =
		trainingDays / periodLength >= 1
			? 'Amazing. You might need to rest more.'
			: trainingDays / periodLength > 0.71
			? 'Nice, keep up the pace.'
			: trainingDays / periodLength > 0.42
			? 'Good job, this is very acceptable level.'
			: trainingDays / periodLength > 0.28
			? 'You might want to start exercise more often.'
			: 'You need to exercise more often to keep the health benefits.';
	const average = Number((hours.reduce((summary, value) => summary + value, 0) / periodLength).toFixed(2));

	switch (true) {
		case average >= dailyTarget:
			return {
				periodLength: periodLength,
				trainingDays: trainingDays,
				activityLevel: activity,
				success: true,
				rating: 5,
				ratingDescription: 'Inhuman! You reached your goal. Make sure you rest more.',
				target: dailyTarget,
				average: average,
			};
		case average > dailyTarget * 0.71:
			return {
				periodLength: periodLength,
				trainingDays: trainingDays,
				activityLevel: activity,
				success: false,
				rating: 4,
				ratingDescription: 'Excellent! I would call this success.',
				target: dailyTarget,
				average: average,
			};
		case average > dailyTarget * 0.53:
			return {
				periodLength: periodLength,
				trainingDays: trainingDays,
				activityLevel: activity,
				success: false,
				rating: 3,
				ratingDescription: 'Good.',
				target: dailyTarget,
				average: average,
			};
		case average > dailyTarget * 0.35:
			return {
				periodLength: periodLength,
				trainingDays: trainingDays,
				activityLevel: activity,
				success: false,
				rating: 2,
				ratingDescription: 'Mediocre.',
				target: dailyTarget,
				average: average,
			};
		default:
			return {
				periodLength: periodLength,
				trainingDays: trainingDays,
				activityLevel: activity,
				success: false,
				rating: 1,
				ratingDescription: 'Atleast you did something. Better than nothing',
				target: dailyTarget,
				average: average,
			};
	}
};

//const args = process.argv.slice(3);
//console.log(args);

export const checkArguments = (argsToCheck: string[]): number[] => {
	const dailyHours = argsToCheck.map((value) => {
		if (isNaN(Number(value)) || value === null) throw new Error('Malformatted parameters. Check your daily exercise hours. All must be numbers');
		return Number(value);
	});

	return dailyHours;
};

/*
	.filter((value, index) => {
		if (index > 2) {
			return value;
		} else {
			return;
		}
	})
*/

//console.log(dailyHours);

/*
	if (dailyHours.length === 0) {
		throw new Error('Parameters missing. There were no arguments for daily excercise hours.');
	}
*/

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
/*
try {
	console.log(calculateExercises(checkArguments(args), Number(process.argv[2])));
} catch (error: unknown) {
	let errorMessage: string = 'Something went wrong';
	if (error instanceof Error) errorMessage = error.message;
	console.log(errorMessage);
}
*/
