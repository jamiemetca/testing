const movingZerosToTheEnd = arr => {
    if( !Array.isArray( arr ) ) return [];
    const zeros = [];
    const nonZeros = []
    arr.forEach( element => {
        if( element === 0 ) {
            zeros.push( element );
        }
        else {
            nonZeros.push( element );
        }
    });
    return nonZeros.concat( zeros );
}

module.exports = {
    movingZerosToTheEnd
}