<template>
	<v-app :theme="toggleTheme ? 'dark' : 'true'" :key="$route.fullPath">
		<v-main>
			<HeaderDashboardVue
				v-show="showHeader"
				@toggle-theme="toggleThemeMode"
				@logout="handleLogout"
			/>
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
		handleLogout() {
			this.showHeader = false;
		},
	},
	watch: {
		$route(to, from) {
			this.showHeader = !['/', '/cadastro'].includes(to.path);
		},
	},
};
</script>
