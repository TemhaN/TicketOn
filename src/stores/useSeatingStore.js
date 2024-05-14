import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import { useConcertsStore } from './useConcertsStore';

export const useSeatingStore = defineStore('seating', () => {
	const selectedShow = ref(null);
	const concertsShow = useConcertsStore();

	const setSelectedShow = id =>
		(selectedShow.value = concertsShow.findShowById(id));

	return {
		setSelectedShow,
		selectedShow,
	};
});
