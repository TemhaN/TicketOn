<script setup>
import CardComponent from '@/components/CardComponent.vue';
import { useSeatingStore } from '@/stores/useSeatingStore';
import { useRoute } from 'vue-router';

const seatingStore = useSeatingStore();
const route = useRoute();

seatingStore.setSelectedShow(route.params.id);
seatingStore.fetchSeating();

async function initSeating() {
	if (!seatingStore.selectedShow) {
		seatingStore.setSelectedShow(route.params.id);
		seatingStore.fetchSeating();
	} else if (seatingStore.selectedShow.id != route.params.id) {
		await seatingStore.resetReservation();
		seatingStore.setSelectedShow(route.params.id);
		seatingStore.fetchSeating();
	}
}
initSeating();

function selectSeat(event) {
	const target = event.target;

	if (
		!target.dataset.seat ||
		target.classList.contains('hall-row__seat--reserved')
	) {
		return;
	}
	const seat = target.dataset.seat;
	const row = target.closest('div[data-row]').dataset.row;

	target.classList.toggle('hall-row__seat--selected');

	seatingStore.selectSeat(row, seat);
}
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
			<div class="hall m-3" @click="selectSeat">
				<div
					v-for="row in seatingStore.rows"
					:key="row.id"
					:data-row="row.id"
					class="hall-row"
				>
					<div class="hall-row__name">{{ row.name }}</div>
					<div class="hall-row__seats">
						<div
							v-for="seat in row.seats.total"
							:key="`${row.id}` + seat"
							:data-seat="seat"
							class="hall-row__seat"
							:class="{
								'hall-row__seat--reserved':
									row.seats.unavailable.includes(seat),
								'hall-row__seat--selected':
									seatingStore.selectedSeats.findIndex(
										item => item.row == row.id && item.seat == seat
									) !== -1,
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
					<p
						v-for="place in seatingStore.selectedSeats"
						:key="`${place.row}` + place.seat"
					>
						Row:
						{{ seatingStore.rows.find(items => items.id == place.row).name }},
						Seat:
						{{ place.seat }}
					</p>
				</div>
				<p class="mt-5">You seats expire in 02:35</p>
				<button
					@click="$router.push('/booking')"
					v-if="seatingStore.selectedSeats.length"
					class="button button-booking-details"
					type="submit"
				>
					<span class="button-content">Enter Booking Details</span>
				</button>
				<div v-else class="div"></div>
			</div>
		</div>
	</div>
</template>
