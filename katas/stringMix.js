const stringMix = ( s1, s2 ) => {
  if( !s1 || !s2 ) return '';

  const s1Count = {};
  const s2Count = {};
  let result = '';

  const minCountMet1 = addToCount( s1, s1Count );
  const minCountMet2 = addToCount( s2, s2Count );

  if( minCountMet1 ) {
    result = "s1:" + s1Count[ s1[ 0 ]];
  }
  if( minCountMet2 ) {
    result = "s2:" + s2Count[ s2[ 0 ] ];
  }

  return result;
};

const addToCount = ( str, library, minCount = 2 ) => {
  let count = 0;
  for( let i = 0; i < str.length; i++ ) {
    const curr = str[ i ];
    if(  /[a-z]/.test( curr ) ){
      if( library[ curr ] === undefined ) {
        library[ curr ] = curr;
      } 
      else{
        library[ curr ] += curr;
        ( library[ curr ].length > count ) && ( count = library[ curr ].length );
      }
    }
  }
  return count >= minCount;
}

module.exports = { stringMix };