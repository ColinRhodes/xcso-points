const _      = require('lodash');
const http   = require('http');
const Moment = require('moment');

const CACHE = new Map();

module.exports = {
	getAllPointsLists : async function() {
		const cacheKey = getCacheKey('all-lists');

		if (!CACHE.has(cacheKey)) {
			let data = await getContent('/ViewPoints.asp?format=json');
			data     = processPointsLists(data);

			// only cache if request succeeded
			CACHE.set(cacheKey, data);
		}

		return CACHE.get(cacheKey);
	},

	getPointsListData : async function(id) {
		const cacheKey = getCacheKey(id);

		if (!CACHE.has(cacheKey)) {
			let data = await getContent(`/ViewPointsList.asp?id=${id}&format=json`);
			data     = processPointsListData(data);

			// only cache if request succeeded
			CACHE.set(cacheKey, data);
		}

		return CACHE.get(cacheKey);
	},
};

const NOW = new Moment();

function processPointsLists(pojo) {
	return _(pojo.pointsLists)
		.filter(list => [ 'Seeding', 'Adhoc' ].includes(list.listType))
		.groupBy(list => `${list.endDate}${list.listType}`)
		.map(similarLists => ({
			id              : `${reformatDate(similarLists[0].startDate)};${reformatDate(similarLists[0].endDate)}`,
			name            : _(similarLists).map('name').uniq().valueOf().join(' / '),
			startDate       : reformatDate(similarLists[0].startDate),
			endDate         : reformatDate(similarLists[0].endDate),
			publicationDate : reformatDate(similarLists[0].publicationDate),
			listType        : similarLists[0].listType,
			lists           : _.map(similarLists, list => _.pick(list, [ 'id', 'name', 'gender', 'discipline', 'numRaces' ])),
		}))

		.filter(listSet => NOW.diff(new Moment(listSet.endDate, 'YYYY-MM-DD'), 'year') < 2)

		// only include list sets that have all four lists by gender/discipline
		.filter(listSet => {
			const reqdLists = [
				_.find(listSet.lists, { gender : 'Men',   discipline : 'Distance' }),
				_.find(listSet.lists, { gender : 'Men',   discipline : 'Sprint' }),
				_.find(listSet.lists, { gender : 'Women', discipline : 'Distance' }),
				_.find(listSet.lists, { gender : 'Women', discipline : 'Sprint' }),
			];

			return listSet.lists.length === 4 && _.compact(reqdLists).length === 4;
		})
		.valueOf();
}

function processPointsListData(pojo) {
	return _(pojo.skiers)
		.filter({ country : 'CAN', division : 'ON' })
		.forEach(skier => {
			skier.club = _.trim(skier.club);
		})
		.valueOf();
}

function reformatDate(str) {
	str = str.replace(/&nbsp;/gi, ' '); // MUSTDO: fix API
	return new Moment(str, 'MMM D, YYYY').format('YYYY-MM-DD');
}

/**
 * Cache data by day, assuming that the content on CCC will not be frequently updated.
 * This method returns the key used to cache content.
 * @param  {String|Number} param
 * @return {String}
 */
function getCacheKey(param) {
	const dateStr = new Moment().format('YYYY-MM-DD');
	return `${param}-${dateStr}`;
}

/**
 * Issues a GET request to a path and returns the JSON content of the response
 * @param  {String} path
 * @return {Object}
 */
function getContent(path) {
	// DEBUG CODE
	/*
	const DEBUG_RESPONSES = require('./DebugResponses');
	if (DEBUG_RESPONSES.hasOwnProperty(path)) {
		return DEBUG_RESPONSES[path];
	}
	*/

	return new Promise((resolve, reject) => {
		const req = http.request(
			{
				method   : 'GET',
				hostname : 'apps.cccski.com',
				path,
			},
			function(res) {
				let body = Buffer.from([]);
				res.on('data', function(chunk) {
					body = Buffer.concat([ body, chunk ]);
				});
				res.on('end', function() {
					// parse response, assuming JSON format
					let content = body.toString('latin1');
					try {
						content = JSON.parse(content);
					}
					catch (e) {} // eslint-disable-line no-empty

					if (res.statusCode >= 300) {
						return reject({ status : res.statusCode, message : res.statusMessage, data : body });
					}

					resolve(content);
				});
			}
		);

		req.on('error', function(e) {
			if (e) {
				reject({ status : e.statusCode || undefined, message : e.message || e });
			}
			else {
				reject();
			}
		});

		req.end();
	});
}
