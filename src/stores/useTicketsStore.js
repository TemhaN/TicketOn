import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useTicketsStore = defineStore('tickets', () => {
	const ticketdata = ref([]);
	const error = ref(null);

	async function fetchTickets(code, name) {
		try {
			const response = await api.post('/tickets', {
				code,
				name,
			});
			ticketdata.value = response.data.tickets;
			return response.data;
		} catch (error) {
			console.error('Error fetching tickets:', error);
			throw new Error('Failed to fetch tickets. Please try again.');
		}
	}

	async function cancelTicket(ticketId, code, name) {
		try {
			const response = await api.post(`/tickets/${ticketId}/cancel`, {
				code,
				name,
			});
			console.log('Ticket cancelled:', response.data);
			return response.data;
		} catch (error) {
			console.error('Error cancelling ticket:', error);
			throw error;
		}
	}

	return {
		fetchTickets,
		cancelTicket,
		ticketdata,
		error,
	};
});
