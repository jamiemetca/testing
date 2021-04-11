// This would be used to mock up the api being used
// If the api wasn't something we'd built

const scrollingTextAsync = inputString => {
    // console.log('NOT running fake api')
      const returnAsyncResult = inputString => {
          const result = [];
          let tempString = inputString;
          for( let i = 0; i < inputString.length; i++ ) {
              tempString = `${ [ ...tempString].slice( 1 ).join( '' ) }${ tempString[ 0 ] }`
              result.push( tempString );
          }
          return result;
      }
  
      return Promise.resolve( returnAsyncResult(inputString) );
  
  }
  
  module.exports = {
    scrollingTextAsync
  };