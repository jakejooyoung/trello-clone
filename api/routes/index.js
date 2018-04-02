import users from './users';

module.exports = app => {
	// Add routes here.
	app.use('/users', users);
}