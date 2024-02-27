interface ValuesCalculator {
	value1: number;
	value2: number;
	value3: any;
}

const parseArgumentsForCalculator = (args: string[]): ValuesCalculator => {
	if (args.length < 5) throw new Error('Missing arguments');
	if (args.length > 5) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3]),
			value3: args[4],
		};
	} else {
		throw new Error('Provided values were not correct');
	}
};

type Operation = 'add' | 'divide' | 'multiply';

const calculator = (a: number, b: number, op: Operation): number => {
	switch (op) {
		case 'add':
			return a + b;
		case 'divide':
			if (b === 0) throw new Error('Can not divide with 0');
			return a / b;
		case 'multiply':
			return a * b;
		default:
			throw new Error('Operation must be add, divide or multiply');
	}
};

try {
	const {value1, value2, value3} = parseArgumentsForCalculator(process.argv);
	console.log(calculator(value1, value2, value3));
} catch (error: unknown) {
	let errorMessage: string = 'Something went wrong';
	if (error instanceof Error) errorMessage = error.message;
	console.log(errorMessage);
}
