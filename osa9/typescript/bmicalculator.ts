interface Valuesbmi {
	height: number;
	weight: number;
	bmiIndex: number;
	bmi: string;
}

const fixResult = (number: number): number => {
	return Number(number.toFixed(1));
};

export const calculateBmi = (h: number, w: number): Valuesbmi => {
	if (!h || !w || isNaN(h) || isNaN(w)) throw new Error('malformatted parameters');
	const result: number = (w / h / h) * 100 * 100;
	//const bmi: string = `. Your bmi was: ${result.toFixed(1)}`;

	switch (true) {
		case result < 18.5:
			return {
				height: h,
				weight: w,
				bmiIndex: fixResult(result),
				bmi: `Underweight`,
			};
		case result < 25:
			return {
				height: h,
				weight: w,
				bmiIndex: fixResult(result),
				bmi: `Normal weight`,
			};
		case result < 30:
			return {
				height: h,
				weight: w,
				bmiIndex: fixResult(result),
				bmi: `Overweight`,
			};
		case result > 30:
			return {
				height: h,
				weight: w,
				bmiIndex: fixResult(result),
				bmi: `Obesity`,
			};
		default:
			return {
				height: h,
				weight: w,
				bmiIndex: 0,
				bmi: `Something went wrong with the values`,
			};
	}
};

//console.log(calculateBmi(180, 70));
//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

//module.exports = {calculateBmi};
