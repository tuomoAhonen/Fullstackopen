interface ValuesMultiplicator {
	value1: number;
	value2: number;
}

const parseArguments = (args: string[]): ValuesMultiplicator => {
	if (args.length < 4) throw new Error('Missing arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers');
	}
};

const multiplicator = (a: number, b: number) => {
	return console.log(`Multiplied ${a} and ${b}. The result is:`, a * b);
};

//const a: number = Number(process.argv[2]);
//const b: number = Number(process.argv[3]);

try {
	const {value1, value2} = parseArguments(process.argv);
	multiplicator(value1, value2);
} catch (error: unknown) {
	let errorMessage: string = 'Something bad happened';
	if (error instanceof Error) errorMessage = error.message;
	console.log(errorMessage);
}
