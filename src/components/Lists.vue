<template>
	<div class="lists">
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
.lists table {
	text-align : left;
}
</style>
