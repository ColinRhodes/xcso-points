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

	const districtWorksheets = await getDistrictWorksheets(listSetID);
	const teamWorksheets     = await getTeamWorksheets(listSetID);

	_(districtWorksheets)
		.concat(teamWorksheets)
		.forEach(wsData => {
			XLSX.utils.book_append_sheet(workbook, wsData.ws, wsData.title);
		})
		.valueOf();

	return workbook;
}

async function getDistrictWorksheets(listSetID) {
	const districtRankings = await PointsCalculator.getDistrictRankings(listSetID);

	const summaryData = _(districtRankings)
		.orderBy('totalPoints', 'desc')
		.map(row => ({
			'District'     : row.district,
			'Total Points' : row.totalPoints,
		}))
		.valueOf();

	const detailsData = _(districtRankings)
		.orderBy('totalPoints', 'desc')
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

async function getTeamWorksheets(listSetID) {
	const teamRankings = await PointsCalculator.getTeamRankings(listSetID);

	return [
		{
			title : 'Team1',
			ws    : XLSX.utils.json_to_sheet([]),
		},
	];
}
