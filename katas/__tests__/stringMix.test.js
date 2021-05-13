const { stringMix } = require( "../stringMix.js" );

describe( "String Mix", () => {

  it( "returns a string", () => {
    expect( stringMix( '', '' ) ).toBe( '' );
  })

  it( "ignores uppercase characters", () => {
    expect( stringMix( "AA", "BB" ) ).toBe( '' );
  })

  it( "ignores characters which appear less than twice", () => {
    expect( stringMix( "ab", "ab" ) ).toBe( '' );
  })

  it( "returns result in correct format", () => {
    expect(stringMix("aa", 'a')).toEqual(expect.stringMatching( /^[12=]:[a-z]{2}$/ ) );
    expect( stringMix( "aaa", 'a' ) ).toEqual( expect.stringMatching( /^[12=]:[a-z]{3}$/ ) );
    expect( stringMix( "bbb", 'a' ) ).toEqual( expect.stringMatching( /^[12=]:[a-z]{3}$/ ) );
  })

  it( "works for both input strings", () => {
    expect( stringMix( 'a', "ccc" ) ).toEqual( expect.stringMatching( /^[12=]:[a-z]{3}$/ ) );
    expect( stringMix( 'a', "ccccc" ) ).toEqual( expect.stringMatching( /^[12=]:[a-z]{5}$/ ) );
  })

  it( "returns more than one string mix", () => {
    expect( stringMix( "aaabbb", 'c' ) ).toBe( "1:aaa/1:bbb" );
    expect( stringMix( 'x', "aaabbb" ) ).toBe( "2:aaa/2:bbb" );
  })

  it( "returns results in alphabetical order", () => {
    expect( stringMix( "cccaaabbb", 'c' ) ).toBe( "1:aaa/1:bbb/1:ccc" );
    expect( stringMix( 'abcd', "dddcccaaabbb" ) ).toBe( "2:aaa/2:bbb/2:ccc/2:ddd" );
  })

  it( "returns results in size order before alphabetical", () => {
    expect( stringMix( "bbbbaaa", 'c' ) ).toBe( "1:bbbb/1:aaa" );
    expect( stringMix( "Aretheyhere", "yes,theyarehere" ) ).toBe( "2:eeeee/2:yy/=:hh/=:rr" );
  })

  it( "can handle multiple characters in both input strings", () => {
    expect( stringMix( "aaa", "bbb" ) ).toBe( "1:aaa/2:bbb" );
    expect( stringMix( "aaacccc", "bbbddddd" ) ).toBe( "2:ddddd/1:cccc/1:aaa/2:bbb" );
  })

  it( "returns =: if same character in both input strings", () => {
    expect( stringMix( "aaa", "aaa" ) ).toBe( "=:aaa" );
    expect( stringMix( "bbbbaaa", "bbbbaaa" ) ).toBe( "=:bbbb/=:aaa" );
  })

  it( "returns the greatest number of a char if found in both strings", () => {
    expect( stringMix( "aaaa", "aaa" ) ).toBe( "1:aaaa" );
    expect( stringMix( "aaa", "aaaa" ) ).toBe( "2:aaaa" );
    expect( stringMix( "bbbbbaaa", "bbaaaa" ) ).toBe( "1:bbbbb/2:aaaa" );
  })

  it( "returns the expected result", () => {
    expect( stringMix( "looping is fun but dangerous", "less dangerous than coding" ) ).toBe( "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg" );
    expect( stringMix( " In many languages", " there's a piar of functions" ) ).toBe( "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt" );
  })

})