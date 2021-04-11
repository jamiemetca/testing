const { ideasWell } = require( "../ideasWell" );

describe( "ideasWell", () => {

    it( "returns a string", () => {
        expect( ideasWell( [ "good", "good", "bad" ] ) ).toEqual( expect.any( String ) )
    })

    it( "returns either 'Fail', 'Publish!' or 'I smell a series!'", () => {
        expect( ideasWell( [ "good", "good", "bad" ] ) ).toMatch(new RegExp( /Fail!|Publish!|I smell a series!/ ) )
    })

    describe( "it returns 'Fail!' when passed no instances of 'good'", () => {

        test.each`
                        input                 | expected
            ${ [ [ "bad" ] ] }                | ${ "Fail!" }
            ${ [ [ "bad", "bad" ] ] }         | ${ "Fail!" }
            ${ [ [ "bad", "bad", "bad"  ] ] } | ${ "Fail!" }
        `( "it returns $expected when given a single nested array $input", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

        test.each`
                        input                                           | expected
            ${ [ [ "bad" ], [ "bad" ] ] }                               | ${ "Fail!" }
            ${ [ [ "bad", "bad" ], [ "bad", "bad" ] ] }                 | ${ "Fail!" }
            ${ [ [ "bad", "bad", "bad"  ], [ "bad", "bad", "bad"  ] ] } | ${ "Fail!" }
        `( "it returns $expected when given a two nested array $input", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

        test.each`
                        input                  | expected
            ${ [
                [ "bad" ], [ "bad" ],
                [ "bad" ], [ "bad" ]
            ] }                                | ${ "Fail!" }
            ${ [
                [ "bad", "bad" ],
                [ "bad", "bad" ],
                [ "bad", "bad" ],
                [ "bad", "bad" ]
            ] }                                | ${ "Fail!" }
            ${ [
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ]
            ] }                                | ${ "Fail!" }
        `( "it returns $expected when given any number of nested arrays", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

    })

    describe( "it returns 'Publish!' when passed less than three instances of 'good'", () => {

        test.each`
                        input           | expected
            ${ [ [ "good" ] ] }         | ${ "Publish!" }
            ${ [ [ "good", "good" ] ] } | ${ "Publish!" }
        `( "it returns $expected when given a single nested array $input", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

        test.each`
                        input                   | expected
            ${ [ [ "good" ], [ "good" ] ] }     | ${ "Publish!" }
            ${ [ [ "good" ], [ "good" ] ] } | ${ "Publish!" }
        `( "it returns $expected when given two nested array $input", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

        test.each`
                        input                   | expected
            ${ [
                [ "good" ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "good" ]
            ] }                                 | ${ "Publish!" }
        `( "it returns $expected when given any number of nested array $input", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        });

    })

    describe( "it returns 'I smell a series!' when passed more than two instances of 'good'", () => {
        it( "returns $expected when given a single nested array", () => {
            expect( ideasWell( [ [ "good", "good", "good"  ] ] ) ).toBe( "I smell a series!" );
        })

        it( "returns $expected when given a two nested arrays", () => {
            expect( ideasWell( [  [ "good", "good"] , [ "good" ]  ] ) ).toBe( "I smell a series!" );
        })

        it( "returns $expected when given a any number of nested arrays", () => {
            expect( ideasWell( [
                [ "good" ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "bad", "bad", "bad"  ],
                [ "good" ],
                [ "good", "good"],
                [ "good" ]
            ] ) ).toBe( "I smell a series!" );
        })

    })

    test.each`
    input | expected
    ${ [['bad', 'bAd', 'bad'], ['bad', 'bAd', 'bad'], ['bad', 'bAd', 'bad']] } | ${ "Fail!" }
    ${ [['gOOd', 'bad', 'BAD', 'bad', 'bad'], ['bad', 'bAd', 'bad'], ['GOOD', 'bad', 'bad', 'bAd']] } | ${ "Publish!" }
    ${ [['gOOd', 'bAd', 'BAD', 'bad', 'bad', 'GOOD'], ['bad'], ['gOOd', 'BAD']] } | ${ "I smell a series!" }
    `( "it return $expected when given any case of words", ( { input, expected } ) => {
        expect( ideasWell( input ) ).toBe( expected );
    })

    describe( "Random inputs", () => {

        test.each`
                    input                          | expected
        ${ [
            [ 'RAD', 'bad', 'bad', 'bAd', 16 ],
            [ 6, 'CoNcenTraTe', 'bad' ],
            [ 'CAPS', 'bAd', 'TEST' ]
        ] }                                        | ${ "Fail!" }
        ${ [
            [ 6, 'gOOd', 'bAd' ],
            [ 8, 'bAd', 'bAd', '8' ],
            [ 'bad', 'GOOD' ]
        ] }                                        | ${ "Publish!" }
        ${ [
            [ 'GOOD', 'cheat', 'BAD' ],
            [ 16, 'CAPS', 'GOOD' ],
            [ 3, 'good', 'bad', 'GOOD' ]
        ] }                                        | ${ "I smell a series!" }
        `( "it returns $expected when given test other than 'good' or 'bad'", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        })

        test.each`
              input        | expected
        ${ [] }            | ${ "Fail!" }
        ${ {} }            | ${ "Fail!" }
        ${ null }          | ${ "Fail!" }
        ${ [ [ [ ] ] ] }   | ${ "Fail!" }
        ${ new Set( [] ) } | ${ "Fail!" }
        `( "it returns $expected when given unexpected inputs", ( { input, expected } ) => {
            expect( ideasWell( input ) ).toBe( expected );
        })

    })
    
})