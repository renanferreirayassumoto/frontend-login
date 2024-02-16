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
							type="password"
							v-model="password"
							:rules="[rules.required]"
						></v-text-field>

						<v-btn
							class="w-50 py-6 d-flex align-center justify-center"
							color="blue"
							@click="cadastrar()"
							>Cadastrar</v-btn
						>

						<router-link to="/">
							<v-btn class="mt-4 py-6 d-flex align-center" color="blue"
								>Home</v-btn
							>
						</router-link>
					</v-container></v-col
				>
			</v-row></v-container
		>

		<AlertComponentVue
			id="alertComponent"
			v-model="showCreatedDialog"
			variant="outlined"
			type="success"
			title="Usuário criado com sucesso!"
		/>
	</div>
</template>

<script>
import axios from 'axios';
import AlertComponentVue from './AlertComponent.vue';

export default {
	name: 'CadastroComponent',
	components: {
		AlertComponentVue,
	},
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
			showCreatedDialog: false,
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
					this.showCreatedDialog = true;
					return new Promise((resolve) => setTimeout(resolve, 2000));
				})
				.then(() => {
					this.showCreatedDialog = false;
					this.$router.push('/');
				})
				.catch((error) => {
					console.error('Erro na criação do usuário: ', error);
				});
		},
	},
};
</script>

<style>
#alertComponent {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1000;
}
</style>
