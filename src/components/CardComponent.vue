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
			<p class="card-text">
				{{ start.toLocaleTimeString() }} - {{ end.toLocaleTimeString() }}
			</p>
		</div>
	</div>
</template>

<style scoped>
.card:hover {
	transform: scale(1.2);
	background-color: rgb(177, 151, 248);
	transition: all 0.3s ease-in-out;
	color: white;
	cursor: pointer;
}
.card {
	border-radius: 20px;
}
</style>
