<template>
	<div class="d-flex align-center justify-center h-100 w-100">
		<v-container
			><v-row class="d-flex align-center justify-center">
				<v-col cols="6"><img src="../img/login.png" width="100%" /></v-col>
				<v-col cols="6"
					><v-container class="d-flex align-center justify-center flex-column"
						><h1>LOGIN</h1>
						<v-text-field
							label="Email"
							variant="solo"
							class="w-50"
							v-model="email"
						></v-text-field>
						<v-text-field
							type="password"
							label="Password"
							@click:append-inner="revealPassword"
							append-inner-icon="mdi-eye-off-outline"
							variant="solo"
							class="w-50"
							v-model="password"
							@keydown.enter="login()"
						></v-text-field>
						<v-row class="w-50">
							<v-col><v-checkbox label="Remember me"></v-checkbox></v-col>
							<v-col><v-btn variant="text">Esqueceu a senha</v-btn></v-col>
						</v-row>
						<v-btn
							class="w-50 py-6 d-flex align-center justify-center"
							color="blue"
							@click="login()"
							>Entrar</v-btn
						>
						<h4 class="my-4">
							Não Tem Uma Conta?
							<router-link to="/cadastro">Inscrever-se</router-link>
						</h4>
						<v-row class="w-50 d-flex flex-column align-center justify-center"
							><v-col><h3 class="text-center">Logar Com</h3></v-col>
							<v-col class="d-flex align-center justify-center"
								><v-icon size="">mdi-facebook</v-icon>
								<v-icon>mdi-google</v-icon>
								<v-icon>mdi-apple</v-icon></v-col
							></v-row
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
	name: 'LoginComponent',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		async login() {
			try {
				const response = await axios.post('http://localhost:3000/login', {
					email: this.email,
					password: this.password,
				});

				const accessToken = response.data.access_token;
				localStorage.setItem('access_token', accessToken);
				this.$router.push('/dashboard');
			} catch (err) {
				if (err.response && err.response.status === 401) {
					alert('Email ou Senha inválidos');
					this.email = '';
					this.password = '';
				}
				console.error(err);
			}
		},
	},
};
</script>

<style></style>
