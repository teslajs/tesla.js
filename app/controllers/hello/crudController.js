// CREATE ACTION
exports.create = function(app, req, res) {

	res.send('create');

};


// READ ACTION
exports.read = function(app, req, res) {

	// IF YOU WANT TO REQUIRED AN ID YOU CAN DO IT LIKE THIS
	if (req.params.id) {
		res.send('read: ' + req.params.id);
	} else {
		res.send('Error! ID is not specified. Required URL format: controller/action/id');
	}

};


// UPDATE ACTION
exports.update = function(app, req, res) {

	// IF YOU WANT TO REQUIRED AN ID YOU CAN DO IT LIKE THIS
	if (req.params.id) {
		res.send('update: ' + req.params.id);
	} else {
		res.send('Error! ID is not specified. Required URL format: controller/action/id');
	}

};


// DELETE ACTION
exports.delete = function(app, req, res) {

	// IF YOU WANT TO REQUIRED AN ID YOU CAN DO IT LIKE THIS
	if (req.params.id) {
		res.send('delete: ' + req.params.id);
	} else {
		res.send('Error! ID is not specified. Required URL format: controller/action/id');
	}

};
