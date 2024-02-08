<template>
	<v-app :theme="toggleTheme ? 'dark' : 'true'">
		<HeaderDashboardVue v-show="showHeader" @toggle-theme="toggleThemeMode" />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import HeaderDashboardVue from './components/HeaderDashboard.vue';
export default {
	name: 'App',
	data() {
		return {
			showHeader: true,
			toggleTheme: false,
		};
	},
	components: {
		HeaderDashboardVue,
	},
	methods: {
		toggleThemeMode() {
			this.toggleTheme = !this.toggleTheme;
		},
	},
	watch: {
		$route(to, from) {
			this.showHeader = to.path !== '/';
		},
	},
};
</script>
