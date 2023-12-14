;
var exerciseCalculator = function (arr) {
    return {
        days: arr.length,
        target: 1,
        trainingDays: arr.filter(function (a) { return a != 0; }).length,
        avgTime: arr.reduce(function (a, b) { return a + b; }) / arr.length,
        rating: 1,
        remarks: "Good"
    };
};
console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
