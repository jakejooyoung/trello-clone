import users from './users';
import boards from './boards';
import columns from './columns';
import cards from './cards';

module.exports = app => {
	// Add routes here.
	app.use('/users', users);
	app.use('/boards', boards);
	app.use('/columns', columns);
	app.use('/cards', cards);
}