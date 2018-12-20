// Contains solutions to all Problems mentioned

// 1. https://projecteuler.net/problem=1
function calculateSumofMultiplesOfThreeAndFive(iInputNumber) {
	let iSum=0;
	let iNumberLimit = iInputNumber - 1;
	iSum = 3*calculateSumOfN(parseInt(iNumberLimit/3, 10)) + 5*calculateSumOfN(parseInt(iNumberLimit/5, 10)) - 15*calculateSumOfN(parseInt(iNumberLimit/15, 10));
	return iSum;
}

function calculateSumOfN(iNumber){
	return parseInt(((iNumber)*(iNumber + 1)/2), 10);
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

// 5. https://www.codewars.com/kata/whats-a-perfect-power-anyway/
function isPP(n){
 if(n<4  || isPrime(n)) {
   return null;
 }
 let iMyBase = 2;
 let iMyPower = 0;
 let iTempNum = n;
 while(iTempNum !== 1){
   if(iTempNum%iMyBase === 0) {
     iTempNum = iTempNum/iMyBase;
     iMyPower += 1;
   } else {
     iTempNum = n;
     iMyBase += 1;
     iMyPower = 0;
   }
 }
 return iMyPower > 1 ? [iMyBase, iMyPower] : null;
}

function isPrime(num) {
  let iCondition = Math.sqrt(num)+1 ;
  for(let i =2; i < iCondition; i++) {
    if(num%i === 0){
      return false;
    }
  } 
  return num !== 1;
}

// 6. https://www.codewars.com/kata/primes-in-numbers/
function primeFactors(n){
    let iPrime = 2;
    let sOutput = "";
    let oMap = {};
    
    while(n > 1){
      if(n%iPrime === 0){
        n = n / iPrime;
        if(oMap[iPrime]) {
          oMap[iPrime] += 1;
        } else {
          oMap[iPrime] = 1;
        }
      } else {
        iPrime = findNextPrime(iPrime);
      }
    }
    
    for(let sKey in oMap){
      if(oMap[sKey] > 1) {
        sOutput += "(" + sKey + "**"+ oMap[sKey] + ")";
      } else {
        sOutput += "("+sKey+")"
      }
    };
    return sOutput;
}

function findNextPrime(num) {
  num = num + 1;
  while(!isPrime(num)) {
    num++;
  }
  
  return num;
}

// 7. https://www.codewars.com/kata/moving-zeros-to-the-end/
function moveZeros(arr) {
  let iLength = arr.length;
  let iCount = 0;
  for(let i =iLength-1; i >= 0; i--) {
    if(arr[i] === 0) {
      arr.splice(i,1);
      iCount++;
    }
  }
  
  for(let i =0; i < iCount; i++) {
    arr.push(0);
  }
  
  return arr;
}
