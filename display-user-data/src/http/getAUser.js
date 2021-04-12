const URL = "https://jsonplaceholder.typicode.com/users/";

const getAUser = ( id ) => {
    return fetch( `${ URL }${ id }` )
    .then( res => res.json() )
    .then( result => result )
}

export default getAUser;