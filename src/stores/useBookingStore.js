import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useBookingStore = defineStore('booking', () => {
	const reservationToken = ref(null);
	const ticketdata = ref(null);

	const bookingForm = ref({
		name: '',
		address: '',
		city: '',
		zip: '',
		country: '',
	});
	const formErrors = ref([]);

	async function confirmSeatsBooking(showId, concertId, token) {
		if (!validateForm()) {
			return;
		}

		try {
			const response = await api.post(
				`/concerts/${concertId}/shows/${showId}/booking`,
				{
					reservation_token: token,
					...bookingForm.value,
				}
			);

			console.log('Booking confirmed:', response.data);
			resetForm();
			ticketdata.value = response.data.tickets;

			return response.data;
		} catch (error) {
			if (error.response) {
				switch (error.response.status) {
					case 401:
						formErrors.value.push(
							'Unauthorized: The reservation token is invalid.'
						);
						break;
					case 404:
						formErrors.value.push(
							'A concert or show with this ID does not exist.'
						);
						break;
					case 422:
						formErrors.value.push('Validation failed:');
						const fields = error.response.data.fields;
						for (const field in fields) {
							formErrors.value.push(`${fields[field]}`);
						}
						break;
					default:
						formErrors.value.push('An unknown error occurred.');
				}
			} else {
				formErrors.value.push('Failed to confirm booking.');
			}
			console.error('Error confirming booking:', error);
		}
	}

	function resetForm() {
		bookingForm.value = {
			name: '',
			address: '',
			city: '',
			zip: '',
			country: '',
		};
		formErrors.value = [];
	}

	function validateForm() {
		const errors = [];
		for (const key in bookingForm.value) {
			if (!bookingForm.value[key]) {
				errors.push(`The ${key} field is required.`);
			}
		}

		if (errors.length > 0) {
			formErrors.value = errors;
			return false;
		}

		formErrors.value = [];
		return true;
	}

	return {
		confirmSeatsBooking,
		reservationToken,
		bookingForm,
		formErrors,
		ticketdata,
	};
});
