import Api from '@/services/Api';

export default {
	fetchLists() {
		return Api().get('lists');
	},
};
