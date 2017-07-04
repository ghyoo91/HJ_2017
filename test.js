require('date-utils');

var dt = new Date();
var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');

console.log(dt);

dt = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
console.log(dt);
console.log(d);
