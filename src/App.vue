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
	<nav class="navbar navbar-expand-lg border-body">
		<div class="container">
			<router-link to="/" class="navbar-brand text-light"
				>EuroSkills Concerts</router-link
			>
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
					<span class="text-light m-3 me-5">Already booked?</span>
					<button
						@click="$router.push('/getticket')"
						class="button"
						type="submit"
					>
						<span class="button-content">Get Tickets</span>
					</button>
				</div>
			</div>
		</div>
	</nav>

	<div
		v-if="isLoading"
		class="text-center d-flex justify-content-center align-items-center loader-container"
	>
		<div class="loader"></div>
	</div>

	<div v-else class="container">
		<RouterView />
	</div>
</template>
