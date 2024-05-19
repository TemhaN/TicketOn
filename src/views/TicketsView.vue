<script setup>
import { computed, ref } from 'vue';
import { useBookingStore } from '@/stores/useBookingStore';

import { useTicketsStore } from '@/stores/useTicketsStore';
const ticketStore = useTicketsStore();
const bookingStore = useBookingStore();

function formatDate(dateString) {
	const date = new Date(dateString);
	if (isNaN(date)) {
		return 'Invalid Date';
	}

	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = date.toLocaleDateString('en-US', options);
	return `${formattedDate} 00:00`;
}

const ticketsBookingStore = computed(() => bookingStore.ticketdata);
const firstTicket = computed(() => ticketsBookingStore.value?.[0] || null);

const ticketsStore = computed(() => ticketStore.ticketdata);
const firstTicketStore = computed(() => ticketsStore.value?.[0] || null);
</script>

<template>
	<h1 class="text-center mt-5">Your Tickets are ready!</h1>
	<div class="row d-flex justify-content-center mt-4">
		<div class="card col-5" v-if="firstTicket">
			<div class="card-body m-3">
				<p class="card-text fw-bold">Your Details</p>
				<div class="d-flex m-2">
					<div class="col-6">
						<p class="card-text">Name:</p>
						<p class="card-text">Date:</p>
					</div>
					<div class="col-6">
						<p class="card-text">{{ firstTicket.name }}</p>
						<p class="card-text">{{ formatDate(firstTicket.show.start) }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="card col-5" v-if="firstTicketStore">
			<div class="card-body m-3">
				<p class="card-text fw-bold">Your Details</p>
				<div class="d-flex m-2">
					<div class="col-6">
						<p class="card-text">Name:</p>
						<p class="card-text">Date:</p>
					</div>
					<div class="col-6">
						<p class="card-text">{{ firstTicketStore.name }}</p>
						<p class="card-text">
							{{ formatDate(firstTicketStore.show.start) }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-5">
		<div class="row m-5" v-if="ticketStore.ticketdata">
			<div
				class="col-md-6 ticket mt-5"
				v-for="ticket in bookingStore.ticketdata"
				:key="ticket.code"
			>
				<div class="ticket-card h-100">
					<div class="card-body m-4 text-center">
						<h1 class="card-text fw-bold fs-3">Ticket</h1>
						<div class="selected-group m-4">
							<p>Row: {{ ticket.row.name }}</p>
							<p>Seat: {{ ticket.seat }}</p>
						</div>
						<div class="code m-5">
							<p class="m-3">
								Code: <span class="fw-bold fs-5">{{ ticket.code }}</span>
							</p>
						</div>
						<div class="card h-100">
							<div class="card-body text-center">
								<p class="card-text">
									{{ formatDate(ticket.show.start) }}
								</p>
								<h5 class="card-title fw-bold">
									{{ ticket.show.concert.artist }}
								</h5>
								<p class="card-text">{{ ticket.show.concert.location.name }}</p>
								<p class="card-text m-4">
									{{ formatDate(ticket.show.start) }} -
									{{ formatDate(ticket.show.end) }}
								</p>
							</div>
						</div>
						<button
							class="button mt-4"
							@click="
								ticketStore.cancelTicket(ticket.id, ticket.code, ticket.name)
							"
						>
							<span class="button-content">Cancel Ticket</span>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row m-5" v-if="ticketStore.ticketdata">
			<div
				class="col-md-6 ticket mt-5"
				v-for="ticket in ticketStore.ticketdata"
				:key="ticket.code"
			>
				<div class="ticket-card h-100">
					<div class="card-body m-4 text-center">
						<h1 class="card-text fw-bold fs-3">Ticket</h1>
						<div class="selected-group m-4">
							<p>Row: {{ ticket.row.name }}</p>
							<p>Seat: {{ ticket.seat }}</p>
						</div>
						<div class="code m-5">
							<p class="m-3">
								Code: <span class="fw-bold fs-5">{{ ticket.code }}</span>
							</p>
						</div>
						<div class="card h-100">
							<div class="card-body text-center">
								<p class="card-text">
									{{ formatDate(ticket.show.start) }}
								</p>
								<h5 class="card-title fw-bold">
									{{ ticket.show.concert.artist }}
								</h5>
								<p class="card-text">{{ ticket.show.concert.location.name }}</p>
								<p class="card-text m-4">
									{{ formatDate(ticket.show.start) }} -
									{{ formatDate(ticket.show.end) }}
								</p>
							</div>
						</div>
						<button
							class="button mt-4"
							@click="
								ticketStore.cancelTicket(ticket.id, ticket.code, ticket.name)
							"
						>
							<span class="button-content">Cancel Ticket</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
