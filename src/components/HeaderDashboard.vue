<template>
	<v-app-bar class="px-10"
		><v-app-bar-title>Sistema de Produtos</v-app-bar-title>
		<v-btn prepend-icon="mdi-account"
			><router-link to="/dashboard">Cadastro</router-link></v-btn
		>
		<v-btn prepend-icon="mdi-magnify"
			><router-link to="/consulta">Consulta</router-link></v-btn
		></v-app-bar
	>
</template>

<script>
export default {
	name: 'HeaderComponent',
};
</script>

<style></style>
