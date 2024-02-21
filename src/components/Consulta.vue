<template>
	<div>
		<v-row class="d-flex align-center mx-10 py-4">
			<v-col cols="6" class="text-h5"> Listagem de Produtos </v-col>
			<v-col cols="6" class="d-flex justify-end">
				<v-btn @click="showCreateDialog = true" color="primary"
					>Criar Produto</v-btn
				>
			</v-col>
		</v-row>
		<v-table class="mx-10">
			<thead>
				<tr>
					<th class="text-left font-weight-black">Nome</th>
					<th class="text-left font-weight-black">Preço</th>
					<th class="text-left font-weight-black">Cor</th>
					<th class="text-left font-weight-black">Marca</th>
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
					<v-btn @click="deletar(deletedItemId)" color="red">Excluir</v-btn>
					<v-btn @click="showDeleteDialog = false">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="showCreateDialog" max-width="500px">
			<v-card>
				<v-card-title>Criar Produto</v-card-title>
				<v-card-text>
					<v-text-field v-model="newItem.name" label="Nome"></v-text-field>
					<v-text-field v-model="newItem.price" label="Preço"></v-text-field>
					<v-text-field v-model="newItem.color" label="Cor"></v-text-field>
					<v-text-field v-model="newItem.brand" label="Marca"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn @click="cancelCreate">Cancelar</v-btn>
					<v-btn @click="saveNewProduct">Salvar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<AlertComponentVue
			id="alertCreatedComponent"
			v-model="alertCreatedComponentConsulta"
			type="success"
			title="Produto criado com sucesso!"
		/>

		<AlertComponentVue
			id="alertCreatedComponent"
			v-model="alertDeletedComponentConsulta"
			type="success"
			title="Produto apagado com sucesso!"
		/>
	</div>
</template>

<script>
import HeaderDashboardVue from './HeaderDashboard.vue';
import axios from 'axios';
import AlertComponentVue from './AlertComponent.vue';

export default {
	components: {
		HeaderDashboardVue,
		AlertComponentVue,
	},
	data() {
		return {
			items: [],
			showDialogEdit: false,
			showDeleteDialog: false,
			editedItem: { id: null, name: '', price: '', color: '', brand: '' },
			showCreateDialog: false,
			newItem: { name: '', price: '', color: '', brand: '' },
			alertCreatedComponentConsulta: false,
			alertDeletedComponentConsulta: false,
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
					this.alertDeletedComponentConsulta = true;
					setTimeout(() => {
						this.alertDeletedComponentConsulta = false;
					}, 2500);
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
		cancelCreate() {
			this.showCreateDialog = false;
			this.resetNewItem();
		},

		resetNewItem() {
			this.newItem = { name: '', price: '', color: '', brand: '' };
		},

		saveNewProduct() {
			const priceAsNumber = parseFloat(this.newItem.price);

			const { name, price, color, brand } = this.newItem;

			axios
				.post('http://localhost:3000/products', {
					name: name,
					price: priceAsNumber,
					color: color,
					brand: brand,
				})
				.then(() => {
					this.alertCreatedComponentConsulta = true;
					setTimeout(() => {
						this.alertCreatedComponentConsulta = false;
					}, 2500);
					this.fetchItems();
					this.showCreateDialog = false;
					this.resetNewItem();
				})
				.catch((error) => {
					console.error('Erro ao criar o produto', error);
				});
		},
	},
};
</script>

<style>
#alertCreatedComponent {
	position: fixed;
	top: 0;
	z-index: 99999;
	left: 50%;
	transform: translateX(-50%);
}
</style>
