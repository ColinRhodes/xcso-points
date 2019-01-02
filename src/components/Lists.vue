<template>
	<div class="posts">
		<h1>Available Points Lists</h1>
		<div
			v-for="list in lists"
			:key="list.name"
		>
			<p>
				<span><b>{{ list.name }}</b></span><br>
				<span>{{ list.publicationDate }}</span>
			</p>
		</div>
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
	},
};
</script>
