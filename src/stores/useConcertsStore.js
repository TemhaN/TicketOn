import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useConcertsStore = defineStore('concerts', () => {
	const shows = ref([]);

	async function fetchConcerts() {
		const res = await api.get('/concerts');

		shows.value = res.data.concerts
			.map(concert => {
				return concert.shows.map(show => {
					return {
						id: show.id,
						artist: concert.artist,
						location: concert.location.name,
						start: new Date(show.start),
						end: new Date(show.end),
						concertId: concert.id,
					};
				});
			})
			.flat();

		console.log(shows.value);
	}

	return {
		fetchConcerts,
		shows,
	};
});
