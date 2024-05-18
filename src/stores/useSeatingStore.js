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
		try {
			const res = await api.get(
				`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/seating`
			);
			rows.value = res.data.rows;
		} catch (error) {
			if (error.response.status === 404) {
				console.error('Concert or show with ID does not exist');
			} else {
				console.error('Error fetching seating information:', error.message);
			}
		}
	}

	async function fetchReservation() {
		try {
			const body = {
				reservations: selectedSeats.value,
			};
			if (token.value) {
				body.reservation_token = token.value;
			}

			const res = await api.post(
				`/concerts/${selectedShow.value.concertId}/shows/${selectedShow.value.id}/reservation`,
				body
			);

			if (res.data.reserved) {
				console.log(
					'Seats reserved successfully until:',
					res.data.reserved_until
				);
				token.value = res.data.reservation_token;
			}
		} catch (error) {
			if (error.response) {
				const status = error.response.status;
				if (status === 403) {
					console.error('Invalid reservation token');
				} else if (status === 404) {
					console.error('Concert or show with ID does not exist');
				} else if (status === 422) {
					console.error('Validation failed:', error.response.data.fields);
				}
			} else {
				console.error('Error fetching reservation:', error.message);
			}
		}
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

	function resetReservation() {
		selectedSeats.value = [];
		fetchReservation();
		token.value = null;
	}

	return {
		resetReservation,
		setSelectedShow,
		selectedSeats,
		selectedShow,
		fetchSeating,
		selectSeat,
		token,
		rows,
	};
});
