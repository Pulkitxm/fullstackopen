interface result {
	days:number,
	trainingDays:number,
	target:number,
	avgTime:number,
	rating: 1 | 2 | 3,
	remarks: string
};



const exerciseCalculator = ( arr:Array<number>):result	=> {
	try{
		const target:number = Number(process.argv[2]);

		if(isNaN(target)){
			throw new Error("Target should be a number");
		}
		return {
			days:arr.length,
			target,
			trainingDays:arr.filter(a=>a!=0).length,
			avgTime:arr.reduce((a,b)=>a+b)/arr.length,
			rating:1,
			remarks:"Good"
		}
	}catch(err){
		console.log(err.message);
	}

}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
