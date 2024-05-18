import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loadCSV } from '@/utils/csvLoader';

export const useCountryStore = defineStore('country', () => {
	const countries = ref([]);
	async function loadCountries() {
		countries.value = await loadCSV('/countries.csv');
	}

	return {
		loadCountries,
		countries,
	};
});
