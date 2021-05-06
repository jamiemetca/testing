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
    expect(stringMix("aa", 'a')).toEqual(expect.stringMatching( /^[s=][12]{0,1}:[a-z]{2}$/ ) );
    expect( stringMix( "aaa", 'a' ) ).toEqual( expect.stringMatching( /^[s=][12]{0,1}:[a-z]{3}$/ ) );
    expect( stringMix( "bbb", 'a' ) ).toEqual( expect.stringMatching( /^[s=][12]{0,1}:[a-z]{3}$/ ) );
  })

  it( "works for both input strings", () => {
    expect( stringMix( 'a', "ccc" ) ).toEqual( expect.stringMatching( /^[s=][12]{0,1}:[a-z]{3}$/ ) );
    expect( stringMix( 'a', "ccccc" ) ).toEqual( expect.stringMatching( /^[s=][12]{0,1}:[a-z]{5}$/ ) );
  })

})