<template>
	<div class="d-flex align-center justify-center h-100 w-100">
		<v-container
			><v-row class="d-flex align-center justify-center">
				<v-col cols="6"><img src="../img/login.png" width="100%" /></v-col>
				<v-col cols="6"
					><v-container class="d-flex align-center justify-center flex-column"
						><h1 class="mb-4">CADASTRO</h1>
						<v-text-field
							label="Username"
							variant="solo"
							class="w-50"
							v-model="username"
							:rules="[rules.required]"
						></v-text-field>
						<v-text-field
							label="Email"
							variant="solo"
							class="w-50"
							v-model="email"
							:rules="[rules.required, rules.counter]"
						></v-text-field>
						<v-text-field
							label="Password"
							variant="solo"
							class="w-50"
							v-model="password"
							:rules="[rules.required]"
						></v-text-field>

						<v-btn
							class="w-50 py-6 d-flex align-center justify-center"
							color="blue"
							@click="cadastrar()"
							>Cadastrar</v-btn
						>
					</v-container></v-col
				>
			</v-row></v-container
		>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'CadastroComponent',
	data() {
		return {
			username: '',
			email: '',
			password: '',
			rules: {
				required: (value) => !!value || 'O campo é obrigatório',
				counter: (value) =>
					value.length >= 5 || 'O campo deve ter no minímo 5 caracteres',
			},
		};
	},
	methods: {
		cadastrar() {
			axios
				.post('http://localhost:3000/users', {
					username: this.username,
					email: this.email,
					password: this.password,
				})
				.then(() => {
					alert('Cadastro criado com sucesso!');
					this.$router.push('/');
				})
				.catch((error) => {
					console.error('Erro na criação do usuário');
				});
		},
	},
};
</script>

<style></style>
