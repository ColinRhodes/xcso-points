module.exports = {
	// IPB : International Performance Benchmarks
	// keys are competition age (CompYear - YOB), value is CPL IPB
	ipb : {
		men : {
			distance : {
				17 : 84,
				18 : 87,
				19 : 89.5,
				20 : 91.5,
				21 : 93.5,
				22 : 94.5,
				23 : 95,
			},
			sprint : {
				17 : 84.5,
				18 : 87.5,
				19 : 90,
				20 : 92,
				21 : 94,
				22 : 95,
				23 : 96,
			},
		},

		women : {
			distance : {
				17 : 81,
				18 : 84,
				19 : 86.5,
				20 : 88.5,
				21 : 90.5,
				22 : 92,
				23 : 93,
			},
			sprint : {
				17 : 83.5,
				18 : 86.5,
				19 : 89,
				20 : 91,
				21 : 93,
				22 : 94,
				23 : 95,
			},
		},
	},

	// the set of points calculations to perform
	teams : [
		{
			name    : 'Ontario Junior Ski Team',
			minAge  : 16,
			maxAge  : 17,
			showIPB : false,
		},
		{
			name    : 'Ontario Ski Team',
			minAge  : 18,
			maxAge  : 23,
			showIPB : true,
		},
	],

	districtComp : {
		maxAge    : 23,
		numSkiers : 10,
	},

	clubs : {
		SOD : [
			'Team Hardwood',
			'Barrie Cross Country',
			'Georgian Bay Nordic',
			'Highlands Trailblazers',
			'Mono Nordic Club',
			'Lifeski Academy Ski Club',
			'Arrowhead Nordic Ski Club',
			'Georgian Nordic Ski and Canoe Club',
			'Polecats (Wildwood)',
			'Kawartha Nordic Ski Club',
			'Waterloo Region Nordic Sports Club',
		],
		NCD : [
			'Nakkertok Nordic (Ontario)',
			'XC Ottawa',
			'Pembroke & Area Cross Country Ski Club Inc.',
			'XC Chelsea Masters',
			'Chelsea Nordiq (Ontario)',
			'Skinouk (Ontario)',
			'Carleton University Nordic Ski Team',
			'Ottawa Racers Ski Club',
		],
		NOD : [
			'Soo Finnish Nordic Ski Club',
			'Laurentian Nordic Ski Club',
			'North Bay Nordic Ski Club',
			'Walden Cross Country',
			'Porcupine Ski Runners',
			'Temiskaming Nordic Ski Club',
		],
		LSSD : [
			'Lappe Nordic Ski Club',
			'Big Thunder Nordic Ski Club',
			'Kenora Nordic & Biathlon Club (Ontario)',
		],
	},
};
