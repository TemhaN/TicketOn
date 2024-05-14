<script setup>
import CardComponent from '@/components/CardComponent.vue';
import { useConcertsStore } from '@/stores/useConcertsStore';
import { ref, onMounted } from 'vue';

const concertsStore = useConcertsStore();
const isLoaded = ref(false);
const location = ref('');
const artist = ref('');
const shows = ref([]);
const date = ref('');

concertsStore.fetchConcerts();

const filter = () => {
	shows.value = concertsStore.filteredShows(
		artist.value,
		location.value,
		date.value
	);
};

async function fetchData() {
	await concertsStore.fetchConcerts();
	isLoaded.value = true;
	filter();
}

fetchData();
</script>
<template>
	<div>
		<h1 class="text-center mt-5">Checkout these amazing concerts in Graz</h1>
		<div class="row mt-4">
			<div class="col-md-4">
				<select
					v-model="artist"
					@change="filter"
					class="form-select"
					aria-label="Default select example"
				>
					<option selected value="">Artist</option>
					<option
						v-for="artist in concertsStore.artists"
						:value="artist"
						:key="artist"
					>
						{{ artist }}
					</option>
				</select>
			</div>
			<div class="col-md-4">
				<select
					v-model="location"
					@change="filter"
					class="form-select"
					aria-label="Default select example"
				>
					<option selected value="">Location</option>
					<option
						v-for="location in concertsStore.locations"
						:value="location"
						:key="location"
					>
						{{ location }}
					</option>
				</select>
			</div>
			<div class="col-md-4">
				<input
					v-model="date"
					@input="filter"
					type="date"
					class="form-control"
				/>
			</div>
		</div>

		<div v-if="!isLoaded" class="text-center mt-3">
			<p>Loading...</p>
		</div>
		<div v-else>
			<div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
				<div class="col" v-for="show in shows" :key="show.id">
					<CardComponent
						:id="show.id"
						:title="show.artist"
						:location="show.location"
						:start="show.start"
						:end="show.end"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
