const { sumOfDifferences } = require( "../sumOfDifferences" );

describe.skip( "sumOfDifferences", () => {
    
    test( "it returns a number", () => {
        expect( sumOfDifferences( [ 1,2 ] ) ).toEqual( expect.any( Number ) );
    })

    test( "it returns the difference between two numbers", () => {
        expect( sumOfDifferences( [ 2,1 ] ) ).toBe( 1 );
        expect( sumOfDifferences( [ 5,2 ] ) ).toBe( 3 );
    })

    test( "it returns the difference between two numbers no matter the order or the array", () => {
        expect( sumOfDifferences( [ 2,5 ] ) ).toBe( 3 );
    })

    test( "it return 0 when given one element", () => {
        expect( sumOfDifferences( [ 1 ] ) ).toBe( 0 );
    })

    test( "it returns 0 when given an empty array", () => {
        expect( sumOfDifferences( [] ) ).toBe( 0 );
    })

    test( "it returns 0 when given no arguments", () => {
        expect( sumOfDifferences() ).toBe( 0 );
    })

    test( "it return the difference between 3 numbers", () => {
        expect( sumOfDifferences( [ 2,4,6 ] ) ).toBe( 4 );
        expect( sumOfDifferences( [ 4,2,6 ] ) ).toBe( 4 );
    })

    describe( "it returns 0 when passed anything other than an array", () => {
        test.each`
                     input           | expected
            ${ { 'a': 5, 'b': 2 } }  | ${ 0 }
            ${ null }                | ${ 0 }
            ${ 'hello' }             | ${ 0 }
            ${ new Set( [1,2,3 ] ) } | ${ 0 }
            ${ new Array() }         | ${ 0 }
            ${ Symbol( "id" ) }      | ${ 0 }
            ${ () => {} }            | ${ 0 }
        `( "returns $expected when given $input", ( { input, expected } ) => {
            expect( sumOfDifferences( input ) ).toBe( 0 );
        })
    })

    test( "it returns the total difference for an array of any length", () => {
        expect( sumOfDifferences( [ 1,2,3,5,6,4,3,3,5,5,9 ] ) ).toBe( 8 );
    })

    test( "it implicitly converts strings to numbers", () => {
        expect( sumOfDifferences( [ '1', '2', '3' ] ) ).toBe( 2 );
        expect( sumOfDifferences( [ 1, '2', '3' ] ) ).toBe( 2 );
    })

    describe( "it ignores any elements which are not numbers or numbers wrapped in quotes ( strings )", () => {
        test.each`
                        input             | expected
            ${ [ 1, 2, null ] }           | ${ 1 }
            ${ [ 1, 2, 'abc' ] }          | ${ 1 }
            ${ [ 1, 2, undefined ] }      | ${ 1 }
            ${ [ 1, 2, NaN ] }            | ${ 1 }
            ${ [ 1, 2, [] ] }             | ${ 1 }
            ${ [ 1, 2, () => {} ] }       | ${ 1 }
            ${ [ 1, 2, Symbol( "id" ) ] } | ${ 1 }
            ${ [ 2, null ] }              | ${ 0 }
            ${ [ 2, 'abc' ] }             | ${ 0 }
            ${ [ 2, undefined ] }         | ${ 0 }
            ${ [ 2, NaN ] }               | ${ 0 }
            ${ [ 2, [] ] }                | ${ 0 }
            ${ [ 2, () => {} ] }          | ${ 0 }
            `('returns $expected when given $input', ( { input, expected } ) => {
                expect( sumOfDifferences( input ) ).toBe( expected );
            });
    })
})