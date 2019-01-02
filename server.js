const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const morgan      = require('morgan');
const serveStatic = require('serve-static');
const _           = require('lodash');
const CplAccess   = require('./server/CplAccess');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(serveStatic(__dirname + "/dist"));

app.get('/api/lists', async (req, res) => {
	try {
		const data = await CplAccess.getAllPointsLists();
		res.send(data);
	}
	catch (e) {
		res.status(500).send(_.get(e, 'message'))
	}
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});
