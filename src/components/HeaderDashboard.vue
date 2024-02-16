<template>
	<div>
		<v-app-bar>
			<v-btn icon="mdi-menu" @click="toggleDrawerMethod"></v-btn>
			<v-app-bar-title>Sistema de Produtos</v-app-bar-title>
			<router-link to="/consulta">
				<v-btn prepend-icon="mdi-magnify">Consulta</v-btn>
			</router-link>
			<v-btn icon="mdi-brightness-6" @click="$emit('toggle-theme')"></v-btn>
		</v-app-bar>
		<v-navigation-drawer v-if="toggleDrawer" id="drawerLateral">
			<v-list-item
				prepend-avatar="https://random.responsiveimages.io/v1/docs"
				:title="username"
				:subtitle="email"
				class="pt-4"
			></v-list-item>
			<div class="pa-2 text-center">
				<v-btn flat @click="logout" prepend-icon="mdi-logout">Logout</v-btn>
			</div>
		</v-navigation-drawer>
	</div>
</template>

<script>
import * as jsonwebtoken from 'jwt-decode';
import axios from 'axios';

export default {
	name: 'HeaderComponent',
	data() {
		return {
			toggleDrawer: false,
			username: '',
			email: '',
		};
	},
	async mounted() {
		const user = jsonwebtoken.jwtDecode(localStorage.getItem('access_token'));

		try {
			const response = await axios.get(
				`http://localhost:3000/users/${user.sub}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					},
				}
			);

			this.username = response.data.username;
			this.email = response.data.email;
		} catch (error) {
			console.error('Erro ao buscar dados do usuário', error);
		}
	},
	methods: {
		toggleDrawerMethod() {
			this.toggleDrawer = !this.toggleDrawer;
		},
		logout() {
			localStorage.removeItem('access_token');
			this.$router.push('/');
			this.$emit('logout');
		},
	},
};
</script>

<style>
a {
	text-decoration: none;
}

.v-navigation-drawer__content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
