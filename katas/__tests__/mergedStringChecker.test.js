const { TestScheduler } = require("@jest/core");
const  { mergedStringChecker } = require( "../mergedStringChecker" );

describe.skip( "Merged String Checker", () => {
  const codewars = "codewars";
  it( "it returns a boolean", () => {
    expect( mergedStringChecker( codewars, "code", "wars" ) ).toBe( true );
    expect( mergedStringChecker( codewars, "cod", "wars" ) ).toBe( false );
  })

  test.each`
        a       |       b        | expected
  ${ 'c' }      | ${ "odewars" } | ${ true }
  ${ "co" }     | ${ "dewars" }  | ${ true }
  ${ "cod" }    | ${ "ewars" }   | ${ true }
  ${ "code" }   | ${ "wars" }    | ${ true }
  ${ "dewars" } | ${ "co" }      | ${ true }
  `( "returns $expected when passed $a and $b", ( { a, b, expected } ) => {
    expect( mergedStringChecker( codewars, a, b ) ).toBe( expected );
  })

  it( "can handle strings with alternatig inputs", () => {
    expect( mergedStringChecker( codewars, "cdwr", "oeas" ) ).toBe( true );
  })

  it( "returns false if no string passed", () => {
    const empty = null;
    expect( mergedStringChecker( empty, "part1", "part2" ) ).toBe( false );
  })

  it( "returns false if parts passed do not equal length of comparison string" , () => {
    expect( mergedStringChecker( codewars, "code", "warss" ) ).toBe( false );
  })

  it( "returns true if string and parts are empty", () => {
    expect( mergedStringChecker( '', '', '' ) ).toBe( true );
  })

  test.each`
        s       |    part1   |    part2   | expected
  ${ "onof" } | ${ "of" } | ${ "on" } | ${ true }
  ${ "onoff" } | ${ "off" } | ${ "on" } | ${ true }
  ${ "bananas bahamas"} | ${"bahamas"} | ${ "bananas " } | ${ true }
  ${ "Bananas from Bahamas"} | ${"Bahas"} | ${ "Bananas from am" } | ${ true }
  `( "returns $expected when passed $s, $part1 and $part2", ( { s, part1, part2, expected } ) => {
    expect( mergedStringChecker( s, part1, part2 ) ).toBe( expected );
  })

  it( "can handle non charater inputs", () => {
    expect( mergedStringChecker( "abc123([{", "a12[{", "bc3(" ) ).toBe( true );
  })

  it( "returns false for non string inputs", () => {
    expect( mergedStringChecker( 123, 12, 3 ) ).toBe( false );
    expect( mergedStringChecker( [], '[', ']' ) ).toBe( false );
    expect( mergedStringChecker( {length: 2}, {length: 1}, {length: 1} ) ).toBe( false );
  })

})