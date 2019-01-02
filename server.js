const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const morgan      = require('morgan');
const serveStatic = require('serve-static');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(serveStatic(__dirname + "/dist"));

app.get('/api/posts', (req, res) => {
	res.send([
		{
			title       : 'Hello World!',
			description : 'Hi there! How are you?',
		},
	]);
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});
