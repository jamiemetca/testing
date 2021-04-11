/*
https://www.codewars.com/kata/5b73fe9fb3d9776fbf00009e

Your task is to sum the differences between consecutive pairs in the array in descending order.

For example:

sumOfDifferences([2, 1, 10])
Returns 9

Descending order: [10, 2, 1]

Sum: (10 - 2) + (2 - 1) = 8 + 1 = 9

If the array is empty or the array has only one element the result should be 0 (Nothing in Haskell).
*/
const sumOfDifferences = array => {
    if( !array || !Array.isArray( array ) ) return 0;
    let total = 0;
    
    const arr = array.filter( curr => {
        return !(
            typeof curr === 'symbol' ||
            typeof curr === 'object' ||
            ( !curr && curr !== 0) ||
            isNaN( curr * curr )
            );
    })

    arr.sort( ( a, b ) => b - a);

    for( let i = 1; i < arr.length; i++ ) {
        total += arr[ i - 1 ] - arr[ i ];
    }
    return total;
}

module.exports = {
    sumOfDifferences
};