import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import { useConcertsStore } from './useConcertsStore';

export const useSeatingStore = defineStore('seating', () => {
	const selectedShow = ref(null);
	const concertsShow = useConcertsStore();
	const rows = ref([]);
	const selectedSeats = ref([]);
	const token = ref(null);

	const setSelectedShow = id =>
		(selectedShow.value = concertsShow.findShowById(id));

	async function fetchSeating() {
		const res = await api.get(
			`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/seating`
		);
		rows.value = res.data.rows;
		console.log(rows.value);
	}

	async function fetchReservation() {
		const body = {
			reservations: selectedSeats.value,
		};
		if (token) {
			body.reservation_token = token.value;
		}

		const res = await api.post(
			`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/reservation`,
			body
		);

		token.value = res.data.reservation_token;
	}

	function selectSeat(row, seat) {
		const index = selectedSeats.value.findIndex(
			item => item.row == row && item.seat == seat
		);

		if (index == -1) {
			selectedSeats.value.push({ row, seat });
		} else {
			selectedSeats.value.splice(index, 1);
		}
		fetchReservation();
	}

	return {
		// fetchReservation,
		setSelectedShow,
		selectedSeats,
		selectedShow,
		fetchSeating,
		selectSeat,
		rows,
	};
});
