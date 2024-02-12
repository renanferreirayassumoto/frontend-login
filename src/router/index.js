import { createRouter, createWebHistory } from 'vue-router';
import LoginVue from '@/components/Login.vue';
import CadastroVue from '@/components/Cadastro.vue';
import ConsultaVue from '@/components/Consulta.vue';

const routes = [
	{
		path: '/',
		name: 'login',
		component: LoginVue,
	},
	{
		path: '/cadastro',
		name: 'cadastro',
		component: CadastroVue,
	},
	{
		path: '/consulta',
		name: 'consulta',
		component: ConsultaVue,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		const token = localStorage.getItem('access_token');

		if (!token) {
			alert('Você não está autenticado!');
			setTimeout(() => {
				next({ name: 'login' });
			}, 2000);
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
