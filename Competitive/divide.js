let testCases = [
    { dividend: 10, divisor: 3, result: 3 },
    { dividend: 7, divisor: -3, result: -2 },
    { dividend: 0, divisor: 1, result: 0 },
    { dividend: 1, divisor: 1, result: 1 },
    { dividend: 1, divisor: 1, result: 1 },
    { dividend: -1, divisor: 1, result: -1 },
    { dividend: 2147483647, divisor: 1, result: 2147483647 },
    { dividend: -2147483648, divisor: 2, result: -1073741824 },
    { dividend: -4, divisor: 2, result: -2 },
    
];

let allSuccess = true;
testCases.forEach((tc, index) => {
    let res = divide(tc.dividend, tc.divisor);
    let resStr = ``;
    if ( res == tc.result) {
        console.log(`Test case #${index+1}/${testCases.length}\t Expected: ${tc.result} \t Actual: ${res}\t Result: Success`);
    }
    else {
        allSuccess = false;
        console.log(`Test case #${index+1}/${testCases.length}\t Expected: ${tc.result} \t Actual: ${res}\t Result: Failed`);
    }
});
console.log('All Test cases completed');
console.log(allSuccess ? 'All are Success!': 'Some are failed!');


function divide(dividend, divisor) {

    if(dividend == 0){
        return 0;
    }
    if(divisor == 1){
        return dividend;
    }

    // handle negative numbers
    let sign = 1;
    if(dividend < 0){
        sign *= -1;
        dividend *= -1;
    }
    if(divisor < 0){
        sign *= -1;
        divisor *= -1;
    }


    let count = 0;
    let d = divisor;
    if (dividend < divisor) {
        return 0;
    }
    else if (dividend == divisor) {
        return sign;
    }
    else {
        do {
            // console.log(count);
            d += divisor;
            ++count;
        } while (dividend >= d);
    }
    return count * sign;


};