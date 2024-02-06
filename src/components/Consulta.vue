<template>
	<div>
		<HeaderDashboardVue />
		<v-container>
			<v-data-table :headers="headers" :items="products">
				<template v-slot:top>
					<v-toolbar flat>
						<v-toolbar-title>Listagem de Produtos</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-spacer></v-spacer>
					</v-toolbar>
				</template>
				<template v-slot:no-data>
					<v-btn color="primary" @click="initialize"> Reset </v-btn>
				</template>
			</v-data-table>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios';
import HeaderDashboardVue from './HeaderDashboard.vue';

export default {
	name: 'Consulta',
	components: {
		HeaderDashboardVue,
	},
	data() {
		return {
			headers: [
				{ title: 'Nome', align: 'start' },
				{ title: 'Preço', align: 'start' },
				{ title: 'Cor', align: 'start' },
				{ title: 'Marca', align: 'start' },
			],
			products: [],
		};
	},
	mounted() {
		this.fetchProducts();
	},
	methods: {
		fetchProducts() {
			axios
				.get('http://localhost:3000/products')
				.then((response) => {
					this.products = response.data;
				})
				.catch((error) => {
					console.error('Erro ao obter os produtos:', error);
				});
		},
		initialize() {
			// Implemente a lógica de reinicialização aqui
		},
	},
};
</script>

<style></style>
