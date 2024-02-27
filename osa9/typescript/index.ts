import express from 'express';
const app = express();
app.use(express.json());

import {calculateBmi} from './bmicalculator';
import {calculateExercises, checkArguments /*, ExerciseHours*/} from './exercisecalculator';

app.get('/hello', (_request, response) => {
	return response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
	const {h, w} = request.query;

	try {
		const bmiResult = calculateBmi(Number(h), Number(w));
		return response.json(bmiResult);
	} catch (error) {
		return response.status(400).json({error: error.message});
	}
});

app.post('/exercises', (request, response) => {
	type Body = {exercises: string[]; target: string};
	const body = request.body as Body;
	//console.log(body);
	//console.log(body.exercises);
	if (body && Object.keys(body).length === 0) return response.status(400).json({error: 'All of parameters missing.'});
	if (!body.exercises || (body.exercises && body.exercises.length === 0))
		return response.status(400).json({error: 'Parameters missing. Add exercises hours.'});
	if (!body.target) return response.status(400).json({error: 'Parameters missing. Add daily target.'});
	if (isNaN(Number(body.target))) return response.status(400).json({error: 'Malformatted parameters. Check for daily target. Must be a number.'});

	//const exercises = body.exercises as ExerciseHours;

	try {
		const result = calculateExercises(checkArguments(body.exercises), Number(body.target));
		return response.json(result);
	} catch (error) {
		return response.status(400).json({error: error.message});
	}
});

const port = 3001;
app.listen(port, () => console.log(`Server is running at https://localhost:${port}`));
