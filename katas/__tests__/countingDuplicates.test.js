const { countingDuplicates } = require( "../countingDuplicates" );

describe( "countingDuplicates", () => {
    it( "returns an integer", () => {
        expect( countingDuplicates() ).toEqual( expect.any( Number ) )
        expect( countingDuplicates( 'a' ) ).toBe( 0 )
        expect( countingDuplicates( 'b' ) ).toBe( 0 )
        expect( countingDuplicates( 'c' ) ).toBe( 0 )
        expect( countingDuplicates( "abc" ) ).toBe( 0 )
    })

    it( "returns 1 if given a string with repeated character", () => {
        expect( countingDuplicates( "aa" )).toBe( 1 );
        expect( countingDuplicates( "aa" )).toBe( 1 );
        expect( countingDuplicates( "bbbbbbb" )).toBe( 1 );
    })

    it( "returns 1 if only only on charater is duplicated", () => {
        expect( countingDuplicates( "aaaac" ) ).toBe( 1 );
        expect( countingDuplicates( "aca" ) ).toBe( 1 );
    })

    it( "returns 2 if two characters are duplicated", () => {
        expect( countingDuplicates( "aabb" ) ).toBe( 2 );
        expect( countingDuplicates( "aaabbb" ) ).toBe( 2 );
        expect( countingDuplicates( "aaaaaaaaabbb" ) ).toBe( 2 );
    })

    it( "returns the number of characters repeat more then once", () => {
        expect( countingDuplicates( "aaa" ) ).toBe( 1 );
        expect( countingDuplicates( "bbbaaa" ) ).toBe( 2 );
        expect( countingDuplicates( "cccbbbaaa" ) ).toBe( 3 );
        expect( countingDuplicates( "dddcccbbbaaa" ) ).toBe( 4 );
        expect( countingDuplicates( "abcdabcdabcd" ) ).toBe( 4 );
        expect( countingDuplicates( "yabcdabcdabcdg" ) ).toBe( 4 );
    })

    it( "ignores character casing", () => {
        expect( countingDuplicates( "aaaAAA" ) ).toBe( 1 );
        expect( countingDuplicates( "BBBAAAbbbaaa" ) ).toBe( 2 );
        expect( countingDuplicates( "CCCBBBAAAcccbbbaaa" ) ).toBe( 3 );
        expect( countingDuplicates( "DDDCCCBBBAAAdddcccbbbaaa" ) ).toBe( 4 );
        expect( countingDuplicates( "ABCDABCDABCDabcdabcdabcd" ) ).toBe( 4 );
        expect( countingDuplicates( "ABCDABCDABCDyabcdabcdabcdG" ) ).toBe( 4 );
    })

    test.each`
            input      | expected
    ${ 0 }             | ${ 0 }
    ${ Infinity }      | ${ 0 }
    ${ [] }            | ${ 0 }
    ${ {} }            | ${ 0 }
    ${ null }          | ${ 0 }
    ${ [ [ [ ] ] ] }   | ${ 0 }
    ${ new Set( [] ) } | ${ 0 }
    `( "it returns $expected when given unexpected input: $input", ( { input, expected } ) => {
        expect( countingDuplicates( input ) ).toBe( expected );
    })
})
