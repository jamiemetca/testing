const { scrollingTextAsync } = require( "../scrollingTextAsync" );
jest.mock( "../scrollingTextAsync" );

// Asynchronus code test
describe.skip( "Scrolling text api", () => {
    it( "returns and array", async () =>{
        const result = await scrollingTextAsync( "Hello" );
        expect( Array.isArray( result ) ).toBe( true );
    })

    it( "returns an array of strings", async () => {
        const result = await scrollingTextAsync( "Hello" );
        expect( result.every( item => typeof item === "string" ) ).toBe( true );
        expect( result.length > 0 ).toBe( true );
    })

    describe( "Returns and array the same length as the input string", () => {
        test.each`
        input        | expected
        ${ 'a' }     | ${ 1 }
        ${ "HI" }    | ${ 2 }
        ${ "Hello" } | ${ 5 }
        `( "it returns $expected when passed $input", async ( { expected, input } ) => {
            const result = await scrollingTextAsync( input );
            expect( result.length ).toBe( expected )
        })
    })

    it( "returns an array of items with length equal to the length on the input string", async () => {
        const input = "Hello";
        const result = await scrollingTextAsync( input );
        expect( result.every( item => item.length === input.length ) ).toBe( true );
    })

    test( "the last element in the array mathces the input string", async () => {
        const input = "Hello";
        const result =  await scrollingTextAsync( input );
        const lastElement = result[ result.length - 1 ];
        expect( lastElement ).toBe( input );
    })

    describe( "Returns the expected output" , () => {
        test.each`
        input | expected
        ${ 'I' } | ${ [ 'I' ] }
        ${ "Hi" } | ${ [ "iH", "Hi" ] }
        ${ "Hello" } | ${ [ "elloH", "lloHe", "loHel", "oHell", "Hello" ] }
        ${ "testing"} | ${[ "estingt", "stingte", "tingtes", "ingtest", "ngtesti", "gtestin", "testing" ] }
        `( "it returns the correct result ( $expected ) when passed a string of length $input.length", async ( { input, expected } ) => {
            const result = await scrollingTextAsync( input );
            expect( result ).toEqual( expected );
        })
    })
})