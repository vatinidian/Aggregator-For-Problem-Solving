// Contains solutions to all Problems mentioned
// Each method should be independent and solve only 1 problem

// 1. https://projecteuler.net/problem=1
function calculateSumofMultiplesOfThreeAndFive(iInputNumber) {
	let i = 1, iThree= 3, iFive=5, iSum=0;
	while(iInputNumber && (iThree || iFive)){
		if(iThree && (iThree*i < iInputNumber)){
			iSum += iThree * i;
		} else {
			iThree = 0;
		}

		if(iFive && (iFive*i < iInputNumber)){
			iSum += iFive * i;
		} else {
			iFive = 0;
		}
		i++;
	}
	return iSum;
}

// 2. https://www.codewars.com/kata/sum-of-pairs
function sum_pairs(ints, s){
    let oMap = {};
    let aOutput;
    ints.some(function(iElement, iIndex){
      if(oMap[iElement]) {
        aOutput = [s-iElement, iElement];
        return aOutput;
      } else {
        oMap[s-iElement] = 1;
      }
    });
    
    return aOutput;
}
