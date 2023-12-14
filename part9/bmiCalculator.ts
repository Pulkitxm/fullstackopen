export const bmiCalculator = (mass: number, height: number):string => {
    const bmi = mass / (height * height);
    if(bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

const mass: number= Number(process.argv[2]);
const height: number = Number(process.argv[3]);
console.log(bmiCalculator(mass, height));
