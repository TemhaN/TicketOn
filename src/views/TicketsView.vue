<script setup></script>

<template>
	<h1 class="text-center mt-5">Your Tickets are ready!</h1>
	<div class="row d-flex justify-content-center mt-4">
		<div class="col-5">
			<div class="card h-100">
				<div class="card-body m-3">
					<p class="card-text fw-bold">Your Details</p>
					<div class="d-flex m-2">
						<div class="col-6">
							<p class="card-text">Name</p>
							<p class="card-text">xxxx xxxx</p>
						</div>
						<div class="col-6">
							<p class="card-text">Booked on</p>
							<p class="card-text">dd/mm/yyyy</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-5">
		<div class="row m-5">
			<div class="col-md-6 ticket">
				<div class="ticket-card h-100">
					<div class="card-body m-4 text-center">
						<h1 class="card-text fw-bold fs-3">Ticket</h1>
						<div class="selected-group m-4">
							<p>Row: 2</p>
							<p>Seat: 6</p>
						</div>
						<div class="code m-5">
							<p class="m-3">
								Code: <span class="fw-bold fs-5">VKBWSD3FEK</span>
							</p>
						</div>
						<div class="card h-100">
							<div class="card-body text-center">
								<p class="card-text">Date</p>
								<h5 class="card-title fw-bold">Artist</h5>
								<p class="card-text">Location</p>
								<p class="card-text m-4">Start - End</p>
							</div>
						</div>
						<button class="button mt-4" type="submit">
							<span class="button-content">Cancel Ticket</span>
						</button>
					</div>
				</div>
			</div>
			<div class="col-md-6 ticket">
				<div class="ticket-card h-100">
					<div class="card-body m-4 text-center">
						<h1 class="card-text fw-bold fs-3">Ticket</h1>
						<div class="selected-group m-4">
							<p>Row: 2</p>
							<p>Seat: 6</p>
						</div>
						<div class="code m-5">
							<p class="m-3">
								Code: <span class="fw-bold fs-5">VKBWSD3FEK</span>
							</p>
						</div>
						<div class="card h-100">
							<div class="card-body text-center">
								<p class="card-text">Date</p>
								<h5 class="card-title fw-bold">Artist</h5>
								<p class="card-text">Location</p>
								<p class="card-text m-4">Start - End</p>
							</div>
						</div>
						<button class="button mt-4" type="submit">
							<span class="button-content">Cancel Ticket</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
