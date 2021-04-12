import { fireEvent, render } from "@testing-library/react";
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

  test( "the previous User button is disabled until the next user button is clicked", () => {
    const { queryByTestId } = render(<App />);
    const previousUserButton = queryByTestId( "button-previousUser" );
    const nextUserButton = queryByTestId( "button-nextUser" );

    expect( previousUserButton ).toBeTruthy();
    expect( previousUserButton ).toBeDisabled();
    fireEvent.click( nextUserButton );
    expect( previousUserButton ).not.toBeDisabled();
  })

  test( "the previous button is disabled when the user id is reduced back to 1", () => {
    const { queryByTestId } = render( <App /> );
    const previousUserButton = queryByTestId( "button-previousUser" );
    const nextUserButton = queryByTestId( "button-nextUser" );

    expect( previousUserButton ).toBeDisabled();
    fireEvent.click( nextUserButton );
    expect( previousUserButton ).not.toBeDisabled();
    fireEvent.click( previousUserButton );
    expect( previousUserButton ).toBeDisabled();
  })

})