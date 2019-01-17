const _                = require('lodash');
const XLSX             = require('xlsx');
const PointsCalculator = require('./PointsCalculator');

module.exports = {
	generateXLSXBuffer,
};

async function generateXLSXBuffer(listSetID) {
	const workbook = await generateWorkbook(listSetID);
	return XLSX.write(workbook, { bookType : 'xlsx', type : 'buffer' });
}

async function generateWorkbook(listSetID) {
	const workbook = XLSX.utils.book_new();

	const districtWorksheets = await generateDistrictWorksheets(listSetID);
	const teamWorksheets     = await generateAllTeamWorksheets(listSetID);

	_(districtWorksheets)
		.concat(teamWorksheets)
		.forEach(wsData => {
			XLSX.utils.book_append_sheet(workbook, wsData.ws, wsData.title);
		})
		.valueOf();

	return workbook;
}

async function generateDistrictWorksheets(listSetID) {
	const districtPoints = await PointsCalculator.getDistrictPoints(listSetID);
	const districtDetails = await PointsCalculator.getDistrictDetails(listSetID);

	const summaryData = _(districtPoints)
		.map(row => ({
			'District'          : row.district,
			'Total Points'      : row.totalPoints,
			'Num Women Counted' : row.numWomen,
			'Num Men Counted'   : row.numMen,
		}))
		.valueOf();

	const detailsData = _(districtDetails)
		.map('skiers')
		.flatten()
		.map(skier => ({
			'District'        : skier.district,
			'CCC License'     : skier.skierID,
			'Last Name'       : skier.lastName,
			'First Name'      : skier.firstName,
			'YOB'             : skier.yearOfBirth,
			'Gender'          : skier.gender,
			'Club'            : skier.club,
			'Sprint Points'   : skier.sprintPoints,
			'Distance Points' : skier.distancePoints,
			'Best Points'     : skier.bestPoints,
		}))
		.valueOf();

	return [
		{
			title : 'District Points',
			ws    : XLSX.utils.json_to_sheet(summaryData),
		},
		{
			title : 'District Points Details',
			ws    : XLSX.utils.json_to_sheet(detailsData),
		},
	];
}

async function generateAllTeamWorksheets(listSetID) {
	const teamRankings = await PointsCalculator.getTeamRankings(listSetID);

	return _(teamRankings)
		.map(team => [
			generateTeamWorksheet(team, 'Men'),
			generateTeamWorksheet(team, 'Women'),
		])
		.flatten()
		.valueOf();
}

function generateTeamWorksheet(teamData, gender) {
	const data = _(teamData.skiers)
		.filter({ gender })
		.map(skier => {
			const result = {
				'CCC License'        : skier.skierID,
				'Last Name'          : skier.lastName,
				'First Name'         : skier.firstName,
				'YOB'                : skier.yearOfBirth,
				'Club'               : skier.club,
				'District'           : skier.district,
				'Sprint Points'      : skier.sprintPoints,
				'Num Sprint Races'   : skier.sprintNumRaces,
				'Distance Points'    : skier.distancePoints,
				'Num Distance Races' : skier.distanceNumRaces,
				'Best Points'        : skier.bestPoints,
			};

			if (teamData.showIPB) {
				result['% of IPB Distance'] = skier.distanceIPB;
				result['% of IPB Sprint']   = skier.sprintIPB;
				result['% of IPB Best']     = skier.bestIPB;
			}

			return result;
		})
		.valueOf();

	return {
		title : `${teamData.name} - ${gender}`,
		ws    : XLSX.utils.json_to_sheet(data),
	};
}
