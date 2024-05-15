<script setup>
import CardComponent from '@/components/CardComponent.vue';
import { useSeatingStore } from '@/stores/useSeatingStore';
import { useRouter, useRoute } from 'vue-router';

const seatingStore = useSeatingStore();
const route = useRoute();

seatingStore.setSelectedShow(route.params.id);
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
		<div class="col-md-3 selected-seats">
			<h4 class="text-center mt-5">Selected Seats</h4>
			<div class="main-selected-seats text-center mt-5">
				<div class="selected-group">
					<p>Row: Stall 03, Seat: 6</p>
					<p>Row: Stall 03, Seat: 7</p>
				</div>
				<p class="mt-5">You seats expire in 02:35</p>
				<button class="button button-booking-details m-5" type="submit">
					<span class="button-content"
						><i class="fas fa-solid fa-arrow-left me-3"></i>Change Seats</span
					>
				</button>
			</div>
		</div>
		<div class="col"></div>
		<div class="col-md-8 booking-form">
			<form action="" class="m-4">
				<h4 class="mt-5">Please enter your details</h4>
				<div class="d-flex mt-4">
					<div class="col-5">
						<div class="form-outline mb-3" data-mdb-input-init>
							<label class="form-label" for="typeText">Name</label>
							<input type="text" id="typeText" class="form-control" />
						</div>
						<div class="form-outline mb-3" data-mdb-input-init>
							<label class="form-label" for="typeText">Address</label>
							<input type="text" id="typeText" class="form-control" />
						</div>
						<div class="d-flex gap-3">
							<div class="form-outline mb-3 col-4" data-mdb-input-init>
								<label class="form-label" for="typeText">ZIP Code</label>
								<input type="text" id="typeText" class="form-control" />
							</div>
							<div class="form-outline mb-3" data-mdb-input-init>
								<label class="form-label" for="typeText">City</label>
								<input type="text" id="typeText" class="form-control" />
							</div>
						</div>
						<label class="form-label" for="typeText">Country</label>
						<select class="form-select" aria-label="Default select example">
							<option selected>Country</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
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
									<button class="button button" type="submit">
										<span class="button-content">Book</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
