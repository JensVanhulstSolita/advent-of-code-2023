import { Day } from '../day';

class Day1 extends Day {
	NUMBERS_AS_STRING: Record<string, string> = {
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
	};

	constructor() {
		super(1);
	}

	solveForPartOne(input: string): string {
		const lines = input.split('\n');
		let totalSum = 0;

		lines.forEach((line: string) => {
			const matchFound = line.match(new RegExp(/\d+/g))?.toString();
			if (matchFound) {
				totalSum += Number(matchFound![0] + matchFound![matchFound!.length - 1]);
			}
		});

		return totalSum.toString();
	}

	processLine(line: string): Array<string> {
		const digits = [];
		let isFirstDigit = true;
		let isLastDigit = false;

		while (isFirstDigit) {
			const matchFound = line.match(new RegExp(/^(one|two|three|four|five|six|seven|eight|nine|\d)/));
			if (!matchFound) {
				line = line.substring(1);
			} else {
				digits.push(this.NUMBERS_AS_STRING[matchFound![0]] ?? matchFound![0]);
				isLastDigit = true;
				break;
			}
		}

		while (isLastDigit) {
			const matchFound = line.match(new RegExp(/(one|two|three|four|five|six|seven|eight|nine|\d)$/));
			if (!matchFound) {
				line = line.substring(0, line.length - 1);
			} else {
				digits.push(this.NUMBERS_AS_STRING[matchFound![0]] ?? matchFound![0]);
				break;
			}
		}

		isFirstDigit = false;
		isLastDigit = false;

		return digits;
	}

	solveForPartTwo(input: string): string {
		const lines = input.split('\n');
		let totalSum = 0;

		lines.forEach((line: string) => {
			const digits = this.processLine(line);
			totalSum += Number(digits[0] + digits[1]);
		});

		return totalSum.toString();
	}
}

export default new Day1();
