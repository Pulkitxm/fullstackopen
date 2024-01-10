export interface result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  success: boolean;
};



export const exerciseCalculator = (arr: Array<number>, target:number): result | void => {
  try {
    if (isNaN(target)) {
      throw new Error("Target should be a number");
    }
    const trainingDays = arr.filter((a) => a != 0).length;
    return {
      periodLength: arr.length,
      target,
      trainingDays,
      average: arr.reduce((a, b) => a + b) / arr.length,
      rating: 1,
      ratingDescription: "Good",
      success:trainingDays>=target,
    };
  } catch (err) {
	  console.log(err.message);
  }
};