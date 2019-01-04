<template>
	<div class="lists">
		<h2>XCSO Points Calculator</h2>
		<table cellspacing="10">
			<thead>
				<tr>
					<th>List</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Publish Date</th>
					<th/>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="list in lists"
					:key="list.name"
				>
					<td>{{ list.name }}</td>
					<td>{{ list.startDate }}</td>
					<td>{{ list.endDate }}</td>
					<td>{{ list.publicationDate }}</td>
					<td>
						<a :href="getReportURL(list)" target="_blank">Generate Points Report</a>
					</td>
				</tr>
			</tbody>
		</table>
		<h3>Notes</h3>
		<ul>
			<li>Generating a points report will take up to a minute before the file downloads.  This time is mostly spent fetching data from CCC.</li>
			<li>This app only shows CPL sets where all four lists have been published for the same time period (men/women, distance/sprint)</li>
			<li><a href="https://github.com/ColinRhodes/xcso-points" target="_blank">Source Code</a></li>
		</ul>
	</div>
</template>

<script>
import ListsService from '@/services/ListsService';
export default {
	name : 'Lists',
	data() {
		return {
			lists : [],
		};
	},
	mounted() {
		this.getLists();
	},
	methods : {
		async getLists() {
			const response = await ListsService.fetchLists();
			this.lists = response.data;
		},

		getReportURL(list) {
			return `/api/report?list-set-id=${list.id}`;
		},
	},
};
</script>

<style>
.lists table, .lists ul {
	text-align : left;
}
</style>
