import { isNumber } from "./utils";

export const calculateBmi = (height : number,weight : number) : string => {
    if(!isNumber(height) || !isNumber(weight)){
        throw new Error("Height and weight must be numbers");
    }

    const hm = height/100;
    const bmi = weight/(hm*hm);

    if(bmi < 18.5){
        return "Underweight";
    } else if(bmi >= 18.5 && bmi < 25){
        return "Normal range";
    } else if(bmi >= 25 && bmi < 30){
        return "Overweight";
    } else {
        return "Obese";
    }
};

if(require.main === module){
    try {
        if (process.argv.length < 4) {
            throw new Error("Usage: ts-node bmiCalculator.ts <height> <weight>");
        }

        const height = Number(process.argv[2]);
        const weight = Number(process.argv[3]);

        const result = calculateBmi(height, weight);
        console.log(result);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error:", error.message);
        }
    }
}

