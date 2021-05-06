const { TestScheduler } = require("@jest/core");
const { movingZerosToTheEnd } = require( "../movingZerosToTheEnd" );

describe.skip( "movingZerosToTheEnd", () => {
    it( "returns an array", () => {
        expect( movingZerosToTheEnd( [] ) ).toEqual( [] );
    })

    it( "returns an array of equal length", () => {
        expect( movingZerosToTheEnd( [] ).length ).toBe( 0 );
        expect( movingZerosToTheEnd( [ 0 ] ).length ).toBe( 1 );
        expect( movingZerosToTheEnd( [ 0, 0 ] ).length ).toBe( 2 );
        expect( movingZerosToTheEnd( [ 0, 0, 0 ] ).length ).toBe( 3 );
    })

    it( "returns the same content", () => {
        let testInputs = [ [], [ 0 ], [ 1, 0 ] ];
        testInputs.forEach( input => {
            expect( movingZerosToTheEnd( [] ).every( item => input.includes( item ) ) );
        })
    })

    test.each`
         input       |   expected
    ${ [ 1, 0 ] }    | ${ [ 1, 0 ] }
    ${ [ 0, 1 ] }    | ${ [ 1, 0 ] }
    ${ [ 0, 0, 1 ] } | ${ [ 1, 0, 0 ] }
    ${ [ 1, 0, 1 ] } | ${ [ 1, 1, 0 ] }
    ${ [ 0, 3, 2, 1 ] } | ${ [ 3,2,1,0 ] }
    `( "moves all zeros to the end when passed numbers: input: $input -> expected: $expected", ( { input, expected } ) => {
        expect( movingZerosToTheEnd( input ) ).toEqual( expected );
    })

    test.each`
         input                     |   expected
    ${ [ 0,1,2,3 ] }               | ${ [ 1,2,3,0 ] }
    ${ [ 0,0,0,3,4,5] }            | ${ [ 3,4,5,0,0,0 ] }
    ${ [ 0, 'hi', 1, 2, 0, [] ] }  | ${ [ 'hi', 1, 2, [], 0, 0 ]}
    ${ [false,1,0,1,2,0,1,3,"a"] } | ${ [false,1,1,2,1,3,"a",0,0]}
    `( "maintains the order of none zero items: input: $input -> expected: $expected", ( { input, expected } ) => {
        expect( movingZerosToTheEnd( input ) ).toEqual( expected );
    })

    test.each`
         input          |   expected
    ${ {} }             | ${ [] }
    ${ true }           | ${ [] }
    ${ 123 }            | ${ [] }
    ${ 'hello' }        | ${ [] }
    ${ Symbol( "id" ) } | ${ [] }
    ${ null }           | ${ [] }
    `( "It handles unexpected inputs: input: $input -> expected: $expected", ( { input, expected } ) => {
        expect( movingZerosToTheEnd( input ) ).toEqual( expected );
    })

})