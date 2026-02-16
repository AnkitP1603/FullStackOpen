import { isNumber } from './utils';

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (dailyhours : number[], targetAmt : number) : Result => {
    if (!Array.isArray(dailyhours)) {
        throw new Error("Daily hours must be an array");
    }

    if (!isNumber(targetAmt) || dailyhours.some(hour => !isNumber(hour))) {
        throw new Error("Provided values were not numbers!");
    }

    const periodLength = dailyhours.length;
    const trainingDays = dailyhours.filter(day => day > 0).length;
    const totalHours = dailyhours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= targetAmt;

    let rating: number;
    let ratingDescription: string;

    if (average < targetAmt * 0.5) {
        rating = 1;
        ratingDescription = "You need to work harder";
    } else if (average < targetAmt) {
        rating = 2;
        ratingDescription = "Not too bad but could be better";
    } else {
        rating = 3;
        ratingDescription = "Great job, you met your target!";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetAmt,
        average
    };
};

if (require.main === module) {
    try {
        const args = process.argv.slice(2).map(arg => Number(arg));

        if (args.length < 2) {
            throw new Error("Usage: ts-node exercise.ts <target> <day1> <day2> ...");
        }

        const target = args[0];
        const dailyHours = args.slice(1);

        const result = calculateExercises(dailyHours, target);
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
        }
    }
}