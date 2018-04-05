import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Trello Mockup API Server');
});

route(app);

var server = app.listen(port, () => {
  console.log('App listening on port %s', port);
});

export default server;
