<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSeatingStore } from '@/stores/useSeatingStore';
import { useBookingStore } from '@/stores/useBookingStore';
import { useCountryStore } from '@/stores/useCountryStore';
import CardComponent from '@/components/CardComponent.vue';

const seatingStore = useSeatingStore();
const countryStore = useCountryStore();
const bookingStore = useBookingStore();

const router = useRouter();

onMounted(async () => {
	await countryStore.loadCountries();
	seatingStore.fetchSeating();
});

const goBack = () => {
	router.back();
};

const confirmBooking = async () => {
	console.log('Confirming booking with data:', bookingStore.bookingForm);
	const token = seatingStore.token;
	const showId = seatingStore.selectedShow?.id;
	const concertId = seatingStore.selectedShow?.concertId;

	if (!token) {
		bookingStore.formErrors &&
			bookingStore.formErrors.push('Reservation token is required.');
		return;
	}

	if (!showId || !concertId) {
		bookingStore.formErrors &&
			bookingStore.formErrors.push('Show or concert information is missing.');
		return;
	}

	const bookingResponse = await bookingStore.confirmSeatsBooking(
		showId,
		concertId,
		token
	);

	if (bookingResponse) {
		router.push('/tickets');
	}
	
};
</script>

<template>
	<h1 class="text-center mt-5">Book seats for your show</h1>
	<div class="row d-flex justify-content-center mt-4">
		<div class="col-3">
			<CardComponent
				:id="seatingStore.selectedShow?.id"
				:title="seatingStore.selectedShow?.artist"
				:location="seatingStore.selectedShow?.location"
				:start="seatingStore.selectedShow?.start"
				:end="seatingStore.selectedShow?.end"
			/>
		</div>
	</div>
	<div class="row mt-5">
		<div class="col-md-3 selected-seats">
			<h4 class="text-center mt-5">Selected Seats</h4>
			<div class="main-selected-seats text-center mt-5">
				<div class="selected-group">
					<p
						v-for="place in seatingStore.selectedSeats"
						:key="`${place.row}${place.seat}`"
					>
						Row:
						{{ seatingStore.rows.find(items => items.id == place.row)?.name }},
						Seat: {{ place.seat }}
					</p>
				</div>
				<p class="mt-5">You seats expire in 02:35</p>
				<button class="button button-booking-details m-5" @click="goBack">
					<span class="button-content"
						><i class="fas fa-solid fa-arrow-left me-3"></i>Change Seats</span
					>
				</button>
			</div>
		</div>
		<div class="col"></div>
		<div class="col-md-8 booking-form">
			<form @submit.prevent="confirmBooking" class="m-4">
				<h4 class="mt-5">Please enter your details</h4>
				<div class="d-flex mt-4">
					<div class="col-5">
						<div class="form-outline mb-3">
							<label class="form-label" for="name">Name</label>
							<input
								type="text"
								id="name"
								class="form-control"
								v-model="bookingStore.bookingForm.name"
							/>
						</div>
						<div class="form-outline mb-3">
							<label class="form-label" for="address">Address</label>
							<input
								type="text"
								id="address"
								class="form-control"
								v-model="bookingStore.bookingForm.address"
							/>
						</div>
						<div class="d-flex gap-3">
							<div class="form-outline mb-3 col-4">
								<label class="form-label" for="zip">ZIP Code</label>
								<input
									type="text"
									id="zip"
									class="form-control"
									v-model="bookingStore.bookingForm.zip"
								/>
							</div>
							<div class="form-outline mb-3">
								<label class="form-label" for="city">City</label>
								<input
									type="text"
									id="city"
									class="form-control"
									v-model="bookingStore.bookingForm.city"
								/>
							</div>
						</div>
						<label class="form-label" for="country">Country</label>
						<select
							class="form-select"
							aria-label="Default select example"
							v-model="bookingStore.bookingForm.country"
						>
							<option selected disabled value="1">Country</option>
							<option
								v-for="country in countryStore.countries"
								:key="country.name"
								:value="country.name"
							>
								{{ country.name }}
							</option>
						</select>
					</div>
					<div class="col d-flex align-items-center justify-content-center">
						<div class="line"></div>
					</div>
					<div class="d-flex col-5">
						<div class="d-flex row">
							<div
								class="d-flex justify-content-center align-items-center text-center"
							>
								By clicking "Book" you accept that you are not actually booking
								a ticket as this is a test project and not a real website.
							</div>
							<div
								class="d-flex align-items-center justify-content-center gap-5"
							>
								<div
									class="alert alert-light d-flex justify-content-center align-items-center text-center col-6"
									role="alert"
								>
									Your ticket will be available immediately after booking.
								</div>
								<div class="col">
									<button class="button" type="submit">
										<span class="button-content">Book</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="bookingStore.formErrors.length" class="mt-4">
					<div
						v-for="error in bookingStore.formErrors"
						:key="error"
						class="alert alert-danger"
					>
						{{ error }}
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<style></style>
