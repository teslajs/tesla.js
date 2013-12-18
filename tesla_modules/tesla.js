

exports.log = function (what) {
  console.log(what);
};


exports.titleCase = function (str) {
	return str.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};


// exports.circumference = function (r) {
//   return 2 * PI * r;
// };