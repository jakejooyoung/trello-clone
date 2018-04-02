import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Welcome to Trello Mockup API Server');
});

const server = app.listen(port, () => {
	console.log('App listening on port %s', port);
});
export default server;
