import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useConcertsStore = defineStore('concerts', () => {
	const shows = ref([]);
	const artists = ref([]);
	const locations = ref([]);

	async function fetchConcerts() {
		try {
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

			artists.value = [...new Set(shows.value.map(show => show.artist))];
			locations.value = [...new Set(shows.value.map(show => show.location))];
			console.log(res);
		} catch (error) {
			console.error('Error fetching concerts:', error);
		}
	}

	function findShowById(id) {
		const show = shows.value.find(show => show.id == id);
		if (!show) {
			console.error('Show with ID', id, 'not found');
		}
		return show;
	}

	const filteredShows = computed(() => (artist, location, date) => {
		let tempShows = shows.value;

		if (artist) {
			tempShows = tempShows.filter(show => show.artist == artist);
		}

		if (location) {
			tempShows = tempShows.filter(show => show.location == location);
		}

		if (date) {
			tempShows = tempShows.filter(
				show =>
					show.start.toLocaleDateString() == new Date(date).toLocaleDateString()
			);
		}

		return tempShows;
	});

	return {
		filteredShows,
		fetchConcerts,
		findShowById,
		locations,
		artists,
		shows,
	};
});
