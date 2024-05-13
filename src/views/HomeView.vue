<script setup>
import CardComponent from '@/components/CardComponent.vue';
import { useConcertsStore } from '@/stores/useConcertsStore';

const concertsStore = useConcertsStore();

concertsStore.fetchConcerts();
</script>

<template>
	<h1 class="text-center mt-5">Checkout these amazing concerts in Graz</h1>
	<div class="row mt-4">
		<div class="col-md-4">
			<select class="form-select" aria-label="Default select example">
				<option selected>Artist</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</div>
		<div class="col-md-4">
			<select class="form-select" aria-label="Default select example">
				<option selected>Location</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</div>
		<div class="col-md-4">
			<input type="date" class="form-control" />
		</div>
	</div>

	<div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
		<div class="col" v-for="show in concertsStore.shows" :key="show.id">
			<CardComponent
				:id="show.id"
				:title="show.artist"
				:location="show.location"
				:start="show.start"
				:end="show.end"
			/>
		</div>
	</div>
</template>
