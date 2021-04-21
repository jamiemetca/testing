const { streetFighter2_characterSelection: sfFunction, streetFighter2_characterSelection } = require( "../streetFighter2_characterSelection" );

describe( "Street fighter 2 - Character selection", () => {

    const fighters = [
        ["Ryu", "E.Honda", "Blanka", "Guile", "Balrog", "Vega"],
        ["Ken", "Chun Li", "Zangief", "Dhalsim", "Sagat", "M.Bison"]
    ];

    const startingPosition = [ 0, 0 ];
    const [ryu, eHonda, blanka, guile, balrog, vega] = fighters[ 0 ];
    const [ken, chunLi, zangief, dhalsim, sagat, mBison] = fighters[ 1 ];
    const right = "right", left = "left", up = "up", down = "down";
    
    it( "returns an array", () => {
        expect( sfFunction( fighters, startingPosition, [] ) ).toEqual( [] );
    })

    it( "returns the next name in the row to the right", () => {
        expect( sfFunction( fighters, startingPosition, [ right ] ) ).toEqual( [ eHonda ] );
    })

    it( "returns the next two names to the right", () => {
        expect( sfFunction( fighters, startingPosition, [ right, right ] ) ).toEqual( [ eHonda, blanka ])
    })

    it( "returns the next three, four or five names", () => {
        expect( sfFunction( fighters, startingPosition, [ right, right, right ] ) ).toEqual( [ eHonda, blanka, guile ] );
        expect( sfFunction( fighters, startingPosition, [ right, right, right, right ] ) ).toEqual( [ eHonda, blanka, guile, balrog ] );
        expect( sfFunction( fighters, startingPosition, [ right, right, right, right, right ] ) ).toEqual( [ eHonda, blanka, guile, balrog, vega ] );
    })

    it( "returns any number of names to the right", () => {
        expect( sfFunction( fighters, startingPosition, [ right, right, right, right, right, right ] ) ).toEqual( [ eHonda, blanka, guile, balrog, vega, ryu ] );
        expect( sfFunction( fighters, startingPosition, [ right, right, right, right, right, right, right ] ) ).toEqual( [ eHonda, blanka, guile, balrog, vega, ryu, eHonda ] );
        expect( sfFunction( fighters, startingPosition, [ right, right, right, right, right, right, right, right ] ) ).toEqual( [ eHonda, blanka, guile, balrog, vega, ryu, eHonda, blanka ] );
    })

    it( "returns the next name in the row to the left", () => {
        expect( sfFunction( fighters, startingPosition, [ left ] ) ).toEqual( [ vega ] );
    })

    it( "returns the next two names to the left", () => {
        expect( sfFunction( fighters, startingPosition, [ left, left ] ) ).toEqual( [ vega, balrog ])
    })

    it( "returns the next three, four or five names", () => {
        expect( sfFunction( fighters, startingPosition, [ left, left, left ] ) ).toEqual( [ vega, balrog, guile ] );
        expect( sfFunction( fighters, startingPosition, [ left, left, left, left ] ) ).toEqual( [ vega, balrog, guile, blanka ] );
        expect( sfFunction( fighters, startingPosition, [ left, left, left, left, left ] ) ).toEqual( [ vega, balrog, guile, blanka, eHonda ] );
    })

    it( "returns any number of names to the left", () => {
        expect( sfFunction( fighters, startingPosition, [ left, left, left, left, left, left ] ) ).toEqual( [ vega, balrog, guile, blanka, eHonda,  ryu ] );
        expect( sfFunction( fighters, startingPosition, [ left, left, left, left, left, left, left ] ) ).toEqual( [ vega, balrog, guile, blanka, eHonda,  ryu, vega ] );
        expect( sfFunction( fighters, startingPosition, [ left, left, left, left, left, left, left, left ] ) ).toEqual( [ vega, balrog, guile, blanka, eHonda,  ryu, vega, balrog ] );
    })

    it( "Handles 'down'", () => {
        expect( sfFunction( fighters, startingPosition, [ down ] ) ).toEqual( [ ken ] );
        expect( sfFunction( fighters, startingPosition, [ down, down ] ) ).toEqual( [ ken, ken ] );
        expect( sfFunction( fighters, startingPosition, [ down, down, down ] ) ).toEqual( [ ken, ken, ken ] );
        expect( sfFunction( fighters, startingPosition, [ down, down, down, down ] ) ).toEqual( [ ken, ken, ken, ken ] );
    })

    it( "Handles 'up' ", () => {
        expect( sfFunction( fighters, startingPosition, [ up ] ) ).toEqual( [  ryu ] );
        expect( sfFunction( fighters, startingPosition, [ up, up ] ) ).toEqual( [  ryu, ryu ] );
        expect( sfFunction( fighters, startingPosition, [ up, up, up ] ) ).toEqual( [  ryu, ryu, ryu ] );
    })

    it( "Handles 'down' and 'up'", () => {
        expect( sfFunction( fighters, startingPosition, [ down, up ] ) ).toEqual( [ ken,  ryu ] );
        expect( sfFunction( fighters, startingPosition, [ down, up, down, up ] ) ).toEqual( [ ken,  ryu, ken,  ryu  ] );
        expect( sfFunction( fighters, startingPosition, [ down, down, up, up ] ) ).toEqual( [ ken, ken, ryu, ryu  ] );
        expect( sfFunction( fighters, startingPosition, [ up, up, down, down ] ) ).toEqual( [  ryu, ryu, ken, ken ] );
    })

    it( "Handles any combination of diretions", () => {
        expect( sfFunction( fighters, startingPosition, [ up, down, left, right ] ) ).toEqual( [ ryu, ken, mBison, ken])
        expect( sfFunction( fighters, startingPosition, [ left, left, down, down, right, up, down, left, right ] ) ).toEqual( [ vega, balrog, sagat, sagat, mBison, vega, mBison, sagat, mBison ] );
    })

    it( "Handles any case of input", () => {
        expect( sfFunction( fighters, startingPosition, [ "Up", "DoWn", "leFt", "righT"] ) ).toEqual( [ ryu, ken, mBison, ken])
        expect( sfFunction( fighters, startingPosition, [ "UP", "DOWN", "LEFT", "RIGHT" ] ) ).toEqual( [ ryu, ken, mBison, ken])
    })

    it( "ignores anything other than up|down|left|right", () => {
        expect( sfFunction( fighters, startingPosition, [ null, 1, 2, '', [], {}, "hello World" ] ) ).toEqual( [] );
        expect( sfFunction( fighters, startingPosition, [ null, up, 1, 2, down, '', [], "lEfT", "LEFT", {}, "hello World", "uP" ] ) ).toEqual( [ ryu, ken, mBison, sagat, balrog ] );
    })

    it( "returns null if passed anything other than an array", () => {
        expect( sfFunction( fighters, startingPosition, null ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, { "up": up } ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, 123 ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, "up" ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, {} ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, Symbol( "up" ) ) ).toBeNull();
        expect( sfFunction( fighters, startingPosition, Infinity ) ).toBeNull();
    })

    it( "handles different starting point", () => {
        expect( sfFunction( fighters, [ 1,1 ], [ up, down, right, right ] ) ).toEqual( [ eHonda, chunLi, zangief, dhalsim ] );
    })

})