<script setup></script>

<template>
	<h1 class="text-center mt-5">Retrieve your tickets.</h1>
	<div class="row d-flex justify-content-center mt-5">
		<div class="col-6 card">
			<form>
				<div class="d-flex mt-5 gap-3 row m-3">
					<div class="form-outline mb-3" data-mdb-input-init>
						<label class="form-label" for="typeText">Name</label>
						<input type="text" id="typeText" class="form-control" />
					</div>
					<div class="form-outline mb-3" data-mdb-input-init>
						<label class="form-label" for="typeText">Code</label>
						<input type="text" id="typeText" class="form-control" />
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
