import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/seating/:id',
			name: 'seating',
			component: () => import('../views/SeatingView.vue'),
		},
		{
			path: '/booking/:id',
			name: 'booking',
			component: () => import('../views/BookingFormView.vue'),
		},
	],
});

export default router;
