// Contains solutions to all Problems mentioned
// Each method should be independent and solve only 1 problem

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
