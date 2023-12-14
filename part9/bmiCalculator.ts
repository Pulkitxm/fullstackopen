const bmiCalculator = (mass: number, height: number):string => {
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

const mass: number= 76;
const height: number = 1.69;
console.log(bmiCalculator(mass, height));