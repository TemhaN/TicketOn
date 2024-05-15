<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="card h-100">
		<div class="card-body text-center">
			<p class="card-text">{{ start.toLocaleDateString() }}</p>
			<h5 class="card-title fw-bold">{{ title }}</h5>
			<p class="card-text">{{ location }}</p>
			<p class="card-text m-4">
				{{ start.toLocaleTimeString() }} - {{ end.toLocaleTimeString() }}
			</p>
		</div>
	</div>
</template>

<style scoped></style>
