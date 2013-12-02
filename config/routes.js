module.exports = function(app, passport, auth) {

    // Default Route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
