import React from "react";

const User = props => {
    const { info, loading } = props;

    if( !loading ) {
        return (
            <div data-testid="user" >
                <p>ID: { info?.id }</p>
                <p>Name: { info?.name }</p>
                <p>Email: { info?.email }</p>
                <p>Website: { info?.website }</p>
                <p>Phone: { info?.phone }</p>
            </div>
        )
    }

    return ( <h2 className="loading" >Loading...</h2> );
};

export default User;