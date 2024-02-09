<template>
	<div>
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
						<v-btn
							@click="editar(item)"
							flat
							color="blue"
							class="mr-2"
							size="small"
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn
							@click="confirmarDelete(item.id)"
							flat
							color="red"
							size="small"
						>
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
		<v-dialog v-model="showDeleteDialog" persistent
			><v-card>
				<v-card-title>Deletar Produto</v-card-title>
				<v-card-text>Tem certeza que deseja excluir o produto?</v-card-text>
				<v-card-actions>
					<v-btn @click="deletar(deletedItemId)">Excluir</v-btn>
					<v-btn @click="showDeleteDialog = false">Cancelar</v-btn>
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
				showDeleteDialog: false,
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
			confirmarDelete(id) {
				this.deletedItemId = id;
				this.showDeleteDialog = true;
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
				this.showDeleteDialog = false;
			},
			editar(item) {
				this.editedItem = { ...item };
				this.showDialogEdit = true;
			},
			salvarEdicao() {
				const { id, name, price, color, brand } = this.editedItem;
				const priceAsNumber = Number(price);

				axios
					.patch(`http://localhost:3000/products/${id}`, {
						name: name,
						price: priceAsNumber,
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
