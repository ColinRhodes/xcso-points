const express          = require('express');
const bodyParser       = require('body-parser');
const cors             = require('cors');
const morgan           = require('morgan');
const serveStatic      = require('serve-static');
const _                = require('lodash');
const CplAccess        = require('./server/CplAccess');
const PointsCalculator = require('./server/PointsCalculator');

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
		sendError(e, res);
	}
});

app.get('/api/district-points', async (req, res) => {
	try {
		const listSetID = req.query['list-set-id'];
		if (!listSetID) {
			res.status(400).send('Missing list-set-id query param');
			return;
		}

		const data = await PointsCalculator.getDistrictRankings(listSetID);
		res.send(data);
	}
	catch (e) {
		sendError(e, res);
	}
});

app.get('/api/team-points', async (req, res) => {
	try {
		const listSetID = req.query['list-set-id'];
		if (!listSetID) {
			res.status(400).send('Missing list-set-id query param');
			return;
		}

		const data = await PointsCalculator.getTeamRankings(listSetID);
		res.send(data);
	}
	catch (e) {
		sendError(e, res);
	}
});


const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});

function sendError(e, res) {
	res.status(500).send(`${_.get(e, 'message')}\n${_.get(e, 'stack')}`);
	console.log('ERROR', _.get(e, 'message'), _.get(e, 'stack'))
}
