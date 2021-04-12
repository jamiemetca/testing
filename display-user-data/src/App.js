import { useEffect, useState } from 'react';
import './App.css';
import User from "./Components/User/User";
import getAUser from "./http/getAUser";

function App() {
  const [ userData, setUserData ] = useState();
  const [ userId, setUserId ] = useState( 1 );
  const [ loading, setLoading ] = useState( false );

  useEffect( () => {
    getAUser( userId )
    .then( data => {
      setLoading( false );
      setUserData( data )
    })
  }, [ userId ] )

  const handleGetUserClick = ( increment = 1 ) => setUserId( prevUserId => {
    setLoading( true );
    return !prevUserId ? 1 : prevUserId + +increment;
  });
  
  return (
    <div className="App">
      <h1>User Data</h1>
      <div className="button-wrapper">
        <button data-testid="button-previousUser" disabled={ userId < 2 } onClick={ () => handleGetUserClick( -1 ) } >Get Previous User</button>
        <button data-testid="button-nextUser" onClick={ () => handleGetUserClick( 1 ) } >Get Next User</button>
      </div>
      { userData && <User loading={ loading } info={ userData } /> }
    </div>
  );
}

export default App;
