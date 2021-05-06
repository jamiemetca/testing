/*
https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa/train/javascript
At a job interview, you are challenged to write an algorithm to check if a given string, s, can be formed from two other strings, part1 and part2.

The restriction is that the characters in part1 and part2 should be in the same order as in s.

The interviewer gives you the following example and tells you to figure out the rest from the given test cases.

For example:

'codewars' is a merge from 'cdw' and 'oears':

    s:  c o d e w a r s   = codewars
part1:  c   d   w         = cdw
part2:    o   e   a r s   = oears
*/

const mergedStringChecker = ( s, part1, part2 ) => {
  if( [ s, part1, part2 ].some( arg => typeof arg !== "string" ) ) return false;
  if( ( !s && ( part1 || part2 ) ) || s.length !== part1.length + part2.length ) return false;
  if( !s && !part1 && !part2 ) return true;

  let part1Match =  part1[ 0 ] === s[ 0 ] &&  mergedStringChecker( s.slice( 1 ), part1.slice( 1 ), part2 );
  let part2Match =  part2[ 0 ] === s[ 0 ] && mergedStringChecker( s.slice( 1 ), part1, part2.slice( 1 ) );

  return part1Match || part2Match;
};

module.exports = {
  mergedStringChecker
}