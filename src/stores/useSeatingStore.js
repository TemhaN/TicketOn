import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import { useConcertsStore } from './useConcertsStore';

export const useSeatingStore = defineStore('seating', () => {
	const selectedShow = ref(null);
	const concertsShow = useConcertsStore();
	const rows = ref([]);

	const setSelectedShow = id =>
		(selectedShow.value = concertsShow.findShowById(id));

	async function fetchSeating() {
		const res = await api.get(
			`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/seating`
		);
		rows.value = res.data.rows;
		console.log(rows.value);
	}

	return {
		setSelectedShow,
		selectedShow,
		fetchSeating,
		rows,
	};
});
