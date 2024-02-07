<template>
	<div>
		<HeaderDashboardVue />
		<v-table class="mx-10 mt-6">
			<thead>
				<tr>
					<th class="text-left">Nome</th>
					<th class="text-left">Preço</th>
					<th class="text-left">Cor</th>
					<th class="text-left">Marca</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items" :key="item.id">
					<td>{{ item.name }}</td>
					<td>{{ item.price }}</td>
					<td>{{ item.color }}</td>
					<td>{{ item.brand }}</td>
					<td>
						<v-btn @click="editar(item)" flat>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn @click="deletar(item.id)" flat>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-dialog v-model="showDialogEdit" persistent>
			<v-card>
				<v-card-title>Editar Produto</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="editedItem.name"
						label="Nome"
						@keydown.enter="salvarEdicao"
					></v-text-field>
					<v-text-field
						v-model="editedItem.price"
						label="Preço"
						@keydown.enter="salvarEdicao"
					></v-text-field>
					<v-text-field
						v-model="editedItem.color"
						label="Cor"
						@keydown.enter="salvarEdicao"
					></v-text-field>
					<v-text-field
						v-model="editedItem.brand"
						label="Marca"
						@keydown.enter="salvarEdicao"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="showDialogEdit = false">Fechar</v-btn>
					<v-btn @click="salvarEdicao">Salvar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import HeaderDashboardVue from './HeaderDashboard.vue';
import axios from 'axios';

export default {
	components: {
		HeaderDashboardVue,
	},
	data() {
		return {
			items: [],
			showDialogEdit: false,
			editedItem: { id: null, name: '', price: '', color: '', brand: '' },
		};
	},
	mounted() {
		this.fetchItems();
	},
	methods: {
		fetchItems() {
			axios
				.get('http://localhost:3000/products')
				.then((response) => {
					this.items = response.data;
				})
				.catch((error) => {
					console.error(error);
				});
		},
		deletar(id) {
			axios
				.delete(`http://localhost:3000/products/${id}`)
				.then(() => {
					alert('Produto apagado com sucesso!');
					this.fetchItems();
				})
				.catch((error) => {
					console.error('Erro ao apagar o produto', error);
				});
		},
		editar(item) {
			this.editedItem = { ...item };
			this.showDialogEdit = true;
		},
		salvarEdicao() {
			const { id, name, price, color, brand } = this.editedItem;

			axios
				.patch(`http://localhost:3000/products/${id}`, {
					name: name,
					price: price,
					color: color,
					brand: brand,
				})
				.then(() => {
					this.fetchItems();
					this.showDialogEdit = false;
				})
				.catch((error) => {
					console.error(error);
				});
			this.showDialogEdit = false;
		},
	},
};
</script>

<style></style>
