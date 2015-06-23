// @if NODE_ENV='production' 
import CONSTANTS from './env/prod';
// @endif 

// @if NODE_ENV='development' 
import CONSTANTS from './env/dev';
// @endif 

export default CONSTANTS;