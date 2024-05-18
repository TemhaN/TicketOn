<script setup>
import { useTicketsStore } from '@/stores/useTicketsStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const ticketStore = useTicketsStore();

let name = '';
let code = '';

async function fetchTickets() {
    try {
        const ticketsResponse = await ticketStore.fetchTickets(code, name);
        // Переход на страницу с билетами только в случае успешной загрузки
        router.push('/tickets');
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }
}
</script>

<template>
	<h1 class="text-center mt-5">Retrieve your tickets.</h1>
	<div class="row d-flex justify-content-center mt-5">
		<div class="col-6 card">
			<form @submit.prevent="fetchTickets">
				<div class="d-flex mt-5 gap-3 row m-3">
					<div class="form-outline mb-3" data-mdb-input-init>
						<label class="form-label" for="nameInput">Name</label>
						<input
							v-model="name"
							type="text"
							id="nameInput"
							class="form-control"
						/>
					</div>
					<div class="form-outline mb-3" data-mdb-input-init>
						<label class="form-label" for="codeInput">Code</label>
						<input
							v-model="code"
							type="text"
							id="codeInput"
							class="form-control"
						/>
					</div>
					<div
						class="button-cancel d-flex text-center align-items-center justify-content-center"
					>
						<button class="button mt-4 col-3" type="submit">
							<span class="button-content">Get Ticket</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
