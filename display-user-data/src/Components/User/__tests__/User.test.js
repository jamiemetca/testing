import { render } from '@testing-library/react';

import User from "./../User";

it( "User renders", () => {
    const { queryByTestId, getByText } = render( <User /> );
    const userComponent = queryByTestId( "user" );
    expect( userComponent ).toBeTruthy();
})

it( "Renders prop info passed in", () => {
    const propsInfo = {
        id: 1,
        name: "Jamie",
        email: "jamie@jamie.com",
        website: "www.google.com",
        phone: "07521360532"
    }

    const { getByText } = render( <User info={ propsInfo } /> );
    const userId = getByText( "ID: " + propsInfo.id );
    const userName = getByText(  "Name: " + propsInfo.name );
    const userEmail = getByText(  "Email: " + propsInfo.email );
    const userWebsite = getByText(  "Website: " + propsInfo.website );
    const userPhone = getByText(  "Phone: " + propsInfo.phone );

    expect( userId ).toBeTruthy();
    expect( userName ).toBeTruthy();
    expect( userEmail ).toBeTruthy();
    expect( userWebsite ).toBeTruthy();
    expect( userPhone ).toBeTruthy();
})