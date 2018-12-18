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

// 3. https://www.codewars.com/kata/pick-peaks/
function pickPeaks(arr){
  let oOutput = {pos:[],peaks:[]};
  let iArrayLength = arr.length;
  if(!iArrayLength) {
    return oOutput;
  }
 
  let iCurrentPeak=0, iCurrentPosition=1;
  for(let i =1; i < iArrayLength-1; i++){
    if(arr[i] < arr[i+1]){
      iCurrentPeak = arr[i+1];
      iCurrentPosition = i+1;
    } else if(arr[i] > arr[i+1] && iCurrentPeak){
      oOutput["peaks"].push(iCurrentPeak);
      oOutput["pos"].push(iCurrentPosition);
      iCurrentPeak = 0;
    }
  }
  return oOutput;
}

// 4. https://www.codewars.com/kata/simple-pig-latin/
function pigIt(str){
  let aStrings = str.split(" ");
  for(var i =0; i < aStrings.length; i++) {
    if(/\w/.test(aStrings[i])) {
      aStrings[i] = aStrings[i].replace(aStrings[i][0], "") + aStrings[i][0] + "ay";
    }
  }
  
  return aStrings.join(" ");
}