const streetFighter2_characterSelection = ( fighters, startingPosition, instructions ) => {
    if( !Array.isArray( instructions ) ) return null;
    let [ x, y ] = startingPosition;
    
    return instructions.reduce( ( acc, direction ) => {
        if( !/up|down|left|right/i.test( direction ) ) return acc;

        direction = direction.toLowerCase();
        const handle = {
            "right": () => x = ++x % fighters[ y ].length,
            "left": () => x = x === 0 ? fighters[ y ].length - 1 : --x,
            "down": () => y = y ? y : 1,
            "up": () => y = y ? 0 : y
        }
        handle[ direction ]();

        acc.push( fighters[ y ][ x ] );       

        return acc;
    }, [])

};

module.exports = {
    streetFighter2_characterSelection
}