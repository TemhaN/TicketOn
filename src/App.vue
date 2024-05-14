<style scoped></style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useConcertsStore } from '@/stores/useConcertsStore';
import { ref } from 'vue';

const concertsStore = useConcertsStore();
const isLoading = ref(true);
async function fetchConcerts() {
	await concertsStore.fetchConcerts();
	isLoading.value = false;
}

fetchConcerts();
</script>

<template>
	<nav class="navbar navbar-expand-lg border-bottom border-body">
		<div class="container">
			<a class="navbar-brand text-light" href="#">EuroSkills Concerts</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div
				class="collapse navbar-collapse justify-content-end"
				id="navbarSupportedContent"
			>
				<div class="d-flex align-items-center" role="tickets">
					<span class="text-light me-2">Already booked?</span>
					<button class="button" type="submit">
						<span class="button-content">Get Tickets</span>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<div class="container">
		<div v-if="isLoading" class="text-center mt-3">
			<p>Loading...</p>
		</div>
		<RouterView v-else />
	</div>
</template>
