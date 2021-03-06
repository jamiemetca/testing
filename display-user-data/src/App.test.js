import { fireEvent, render, screen, act } from "@testing-library/react";
import { toBeDisabled, toBeInTheDocument } from "@testing-library/jest-dom";
import App from './App';

describe( "Buttons", () => {

  it( "Renders the previous user button", () => {
    const { queryByTestId } = render( <App /> );
    const previousUserButton = queryByTestId( "button-previousUser" );
    expect( previousUserButton ).toBeTruthy();
  })

  it( "Renders the next user button", () => {
    const { queryByTestId } = render(<App />);
    const nextUserButton = queryByTestId( "button-nextUser" );
    expect( nextUserButton ).toBeTruthy();
  })

  test( "the previous User button is disabled until the next user button is clicked", async () => {
    const { queryByTestId } = render(<App />);
    const previousUserButton = queryByTestId( "button-previousUser" );
    const nextUserButton = queryByTestId( "button-nextUser" );

    expect( previousUserButton ).toBeTruthy();
    expect( previousUserButton ).toBeDisabled();
    await act( async () => fireEvent.click( nextUserButton ) );
    expect( previousUserButton ).not.toBeDisabled();
  })

  test( "the previous button is disabled when the user id is reduced back to 1", async () => {
    const { queryByTestId } = render( <App /> );
    const previousUserButton = queryByTestId( "button-previousUser" );
    const nextUserButton = queryByTestId( "button-nextUser" );

    expect( previousUserButton ).toBeDisabled();
    await act( async () => fireEvent.click( nextUserButton ) );
    expect( previousUserButton ).not.toBeDisabled();
    await act( async () => fireEvent.click( previousUserButton ) );
    expect( previousUserButton ).toBeDisabled();
  })

})

const mockUserData = {
  id: "1",
  name: "Jamie",
  email: "jamie@jamie.com",
  website: "jamie.com",
  phone: "07123456789"
}

const mockUserDataTwo = {
  id: "2",
  name: "Jamie",
  email: "jamie@jamie.com",
  website: "jamie.com",
  phone: "07123456789"
}

describe( "Mock fetch request", () => {
  beforeEach( () => {
    global.fetch = jest.fn( ( url ) => {

      if( url[ url.length - 1 ] == 1 ) {
        return Promise.resolve({
          json: () => Promise.resolve( mockUserData )
        })
      }
      return Promise.resolve({
        json: () => Promise.resolve( mockUserDataTwo )
      })

    })
  })

  it( "renders expected user data", async () => {
    await act( async () => render( <App /> ) );
    for( const [ key, value ] of Object.entries( mockUserData ) ) {
      expect( screen.getByText( new RegExp( `${ key }: ${ value }`,'i' ) ) ).toBeInTheDocument();
    }
  })

  it( "updates user data displayed", async () => {
    const nextUserButton = screen.getByTestId( "button-nextUser" );
    const previousUserButton = screen.getByTestId( "button-previousUser" );
    
    await act( async () => render( <App /> ) );
    for( const [ key, value ] of Object.entries( mockUserData ) ) {
      expect( screen.getByText( new RegExp( `${ key }: ${ value }`,'i' ) ) ).toBeInTheDocument();
    }

    await act( async () => fireEvent.click( nextUserButton ) );
    for( const [ key, value ] of Object.entries( mockUserDataTwo ) ) {
      expect( screen.getByText( new RegExp( `${ key }: ${ value }`,'i' ) ) ).toBeInTheDocument();
    }

    await act( async () => fireEvent.click( previousUserButton ) );
    for( const [ key, value ] of Object.entries( mockUserData ) ) {
      expect( screen.getByText( new RegExp( `${ key }: ${ value }`,'i' ) ) ).toBeInTheDocument();
    }
  })

})