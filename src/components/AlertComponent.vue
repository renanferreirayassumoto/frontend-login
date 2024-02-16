<template>
	<v-alert :type="type" :variant="variant">
		<v-alert-title>{{ title }}</v-alert-title>
	</v-alert>
</template>

<script>
export default {
	name: 'AlertComponent',
	props: {
		type: String,
		variant: String,
		title: String,
	},
};
</script>

<style></style>
