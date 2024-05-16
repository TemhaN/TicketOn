<script setup>
import CardComponent from '@/components/CardComponent.vue';
import { useSeatingStore } from '@/stores/useSeatingStore';
import { useRoute } from 'vue-router';

const seatingStore = useSeatingStore();
const route = useRoute();

seatingStore.setSelectedShow(route.params.id);
seatingStore.fetchSeating();
</script>

<template>
	<h1 class="text-center mt-5">Book seats for your show</h1>
	<div class="row d-flex justify-content-center mt-4">
		<div class="col-3">
			<CardComponent
				:id="seatingStore.selectedShow.id"
				:title="seatingStore.selectedShow.artist"
				:location="seatingStore.selectedShow.location"
				:start="seatingStore.selectedShow.start"
				:end="seatingStore.selectedShow.end"
			/>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-md-8 seating">
			<div class="stage">Stage</div>
			<div class="hall m-3">
				<div v-for="row in seatingStore.rows" :key="row.id" class="hall-row">
					<div class="hall-row__name">{{ row.name }}</div>
					<div class="hall-row__seats">
						<div
							v-for="seat in row.seats.total"
							:key="`${row.id}` + seat"
							:data-seat="`${row.id}` + seat"
							class="hall-row__seat"
							:class="{
								'hall-row__seat--reserved':
									row.seats.unavailable.includes(seat),
							}"
						></div>
					</div>
				</div>
			</div>
		</div>
		<div class="col"></div>
		<div class="col-md-3 selected-seats">
			<h4 class="text-center mt-5">Selected Seats</h4>
			<div class="main-selected-seats text-center mt-5">
				<div class="selected-group">
					<p>Row: Stall 03, Seat: 6</p>
					<p>Row: Stall 03, Seat: 7</p>
				</div>
				<p class="mt-5">You seats expire in 02:35</p>
				<button class="button button-booking-details m-5" type="submit">
					<span class="button-content">Enter Booking Details</span>
				</button>
			</div>
		</div>
	</div>
</template>
