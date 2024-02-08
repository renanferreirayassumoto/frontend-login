<template>
	<v-app-bar>
		<v-btn icon="mdi-menu" @click="toggleDrawerMethod"></v-btn>
		<v-app-bar-title>Sistema de Produtos</v-app-bar-title>
		<v-btn prepend-icon="mdi-account"
			><router-link to="/dashboard">Cadastro</router-link></v-btn
		>
		<v-btn prepend-icon="mdi-magnify"
			><router-link to="/consulta">Consulta</router-link></v-btn
		>
		<v-btn icon="mdi-brightness-6" @click="$emit('toggle-theme')"></v-btn>
	</v-app-bar>
	<v-navigation-drawer v-if="toggleDrawer">
		<div class="pa-2 text-center d-flex justify-center h-100 align-end">
			<v-btn flat @click="logout" prepend-icon="mdi-logout">Logout</v-btn>
		</div>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'HeaderComponent',
	data() {
		return {
			toggleDrawer: false,
		};
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
</style>
