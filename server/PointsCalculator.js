const _         = require('lodash');
const Moment    = require('moment');
const CplAccess = require('./CplAccess');
const config    = require('./config');

module.exports = {
	getTeamRankings : async function(listSetID) {
		const skiers = await combineLists(listSetID);

		return _.map(config.teams, teamProfile => {
			const results = _(skiers)
				.filter(skier => skier.age >= teamProfile.minAge && skier.age <= teamProfile.maxAge)
				.orderBy('bestPoints', 'desc')
				.valueOf();

			return {
				name    : teamProfile.name,
				showIPB : teamProfile.showIPB,
				skiers  : results,
			};
		});
	},

	getDistrictPoints : async function(listSetID) {
		const data = await getSkiersByDistrict(listSetID, config.districtComp.numSkiersForPoints);

		return _.map(data, districtData => _.pick(districtData, [ 'district', 'totalPoints', 'numWomen', 'numMen' ]));
	},

	getDistrictDetails : async function(listSetID) {
		return getSkiersByDistrict(listSetID, config.districtComp.numSkiersForDetails);
	},
};

const clubDistrictMap = new Map();
_.forEach(config.clubs, (clubs, district) => {
	_.forEach(clubs, club => {
		clubDistrictMap.set(club, district);
	});
});

/**
 * Combines data from a set of points lists to get accumulated data per skier, including their best points between sprint/distance
 * @return {Skier[]}
 */
async function combineLists(listSetID) {
	if (!listSetID) {
		throw new Error('Missing listSetID param');
	}

	const allLists = await CplAccess.getAllPointsLists();
	const listSet  = _.find(allLists, { id : listSetID });

	if (!listSet) {
		throw new Error('Invalid listSetID');
	}

	const listEnd  = new Moment(listSet.endDate, 'YYYY-MM-DD');
	const compYear = listEnd.month() > 8 ? listEnd.year() + 1 : listEnd.year(); // if list is generated in fall, then the competition year is the next year

	await Promise.all(_.map(listSet.lists, async list => {
		list.skiers = await CplAccess.getPointsListData(list.id);
	}));

	// add list info to each skier record
	_.forEach(listSet.lists, list => {
		_.forEach(list.skiers, skier => {
			skier.gender     = list.gender;
			skier.discipline = list.discipline;
		});
	});

	// group all skier records by skierID and compile their point data
	return _(listSet.lists)
		.map('skiers')
		.flatten()
		.groupBy('skierID')
		.map(skierData => {
			const sprintData   = _.find(skierData, { discipline : 'Sprint' });
			const distanceData = _.find(skierData, { discipline : 'Distance' });

			const result    = _.pick(skierData[0], [ 'skierID', 'firstName', 'lastName', 'yearOfBirth', 'gender', 'country', 'division', 'club' ]);
			result.age      = compYear - result.yearOfBirth;
			result.district = clubDistrictMap.get(result.club);

			result.sprintPoints      = _.get(sprintData, 'points', 0);
			result.sprintNumRaces    = _.get(sprintData, 'numRaces', 0);
			result.sprintTotalPoints = _.get(sprintData, 'totalPoints', 0);
			result.sprintIPB         = _.round(result.sprintPoints / config.ipb[result.gender.toLowerCase()].sprint[result.age] * 100, config.ipb.numDigitsForPct);

			result.distancePoints      = _.get(distanceData, 'points', 0);
			result.distanceNumRaces    = _.get(distanceData, 'numRaces', 0);
			result.distanceTotalPoints = _.get(distanceData, 'totalPoints', 0);
			result.distanceIPB         = _.round(result.distancePoints / config.ipb[result.gender.toLowerCase()].distance[result.age] * 100, config.ipb.numDigitsForPct);

			result.bestPoints = Math.max(result.sprintPoints, result.distancePoints);
			result.bestIPB    = Math.max(result.sprintIPB, result.distanceIPB);

			return result;
		})
		.valueOf();
}

/**
 * Gets the top X skiers by district
 */
async function getSkiersByDistrict(listSetID, numSkiersPerGender) {
	let skiers = await combineLists(listSetID);
	skiers     = _.filter(skiers, skier => skier.age <= config.districtComp.maxAge);

	const unListedClubs = _(skiers)
		.filter(skier => !skier.district)
		.map('club')
		.uniq()
		.valueOf();

	if (!_.isEmpty(unListedClubs)) {
		throw new Error(`Cannot generate district rankings.  Unlisted club(s): ${unListedClubs.join(', ')}. \nPlease add these clubs to 'config.js'`);
	}

	return _(skiers)
		.groupBy('district')
		.mapValues(districtSkiers =>
			_(districtSkiers)
				.groupBy('gender')
				.map(districtGenderSkiers =>
					_(districtGenderSkiers)
						.orderBy('bestPoints', 'desc')
						.take(numSkiersPerGender)
						.valueOf()
				)
				.flatten()
				.orderBy('gender', 'desc')
				.valueOf()
		)
		.map((districtSkiers, district) => ({
			district,
			totalPoints : _(districtSkiers).map('bestPoints').sum().valueOf(),
			numWomen    : _.filter(districtSkiers, { gender : 'Women' }).length,
			numMen      : _.filter(districtSkiers, { gender : 'Men' }).length,
			skiers      : districtSkiers,
		}))
		.orderBy('totalPoints', 'desc')
		.valueOf();
}
