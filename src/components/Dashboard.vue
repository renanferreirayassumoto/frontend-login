<template>
	<div class="d-flex align-center justify-center w-100 h-100">
		<v-form id="formularioCadastro" class="pa-10 ma-10 w-75">
			<p class="text-h4 text-center mb-4">Cadastro de Produtos</p>
			<v-text-field
				label="Nome"
				prepend-icon="mdi-account"
				variant="underlined"
				:rules="[rules.required]"
				@keydown.enter="cadastrar()"
				v-model="name"
			></v-text-field>
			<v-text-field
				label="Preço"
				prefix="R$"
				model-value="10.00"
				prepend-icon="mdi-currency-usd"
				variant="underlined"
				:rules="[rules.required, rules.isANumber]"
				@keydown.enter="cadastrar()"
				v-model="price"
			></v-text-field>
			<v-text-field
				label="Cor"
				prepend-icon="mdi-palette"
				variant="underlined"
				:rules="[rules.required]"
				@keydown.enter="cadastrar()"
				v-model="color"
			></v-text-field>
			<v-text-field
				label="Marca"
				prepend-icon="mdi-domain"
				variant="underlined"
				:rules="[rules.required]"
				@keydown.enter="cadastrar()"
				v-model="brand"
			></v-text-field>
			<v-row class="mt-4 ml-10">
				<v-btn color="blue" class="mr-4" @click="register">Cadastrar</v-btn>
				<v-btn color="red" @click="clearInputs">Limpar</v-btn>
			</v-row>
		</v-form>
	</div>
</template>

<script>
import axios from 'axios';
import HeaderDashboardVue from './HeaderDashboard.vue';
export default {
	name: 'Dashboard',
	data() {
		return {
			name: '',
			price: null,
			color: '',
			brand: '',
			rules: {
				required: (value) => !!value || 'O campo é obrigatório',
				isANumber: (value) =>
					!!Number.isFinite(parseFloat(value)) ||
					'O preço tem que ser um número',
			},
		};
	},
	components: {
		HeaderDashboardVue,
	},
	methods: {
		clearInputs() {
			this.name = '';
			this.price = '';
			this.color = '';
			this.brand = '';
		},
		async register() {
			try {
				const priceAsNumber = parseFloat(this.price);

				await axios.post('http://localhost:3000/products', {
					name: this.name,
					price: priceAsNumber,
					color: this.color,
					brand: this.brand,
				});
				alert('Produto cadastrado com sucesso!');
				this.clearInputs();
			} catch (error) {
				console.error(error);
				alert('Erro ao cadastrar o produto');
			}
		},
	},
};
</script>

<style>
#formularioCadastro {
	border: solid 1px black;
}
</style>
