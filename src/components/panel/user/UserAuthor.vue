<template>
  <div class="user-donation">
    <input id="donation-id" type="hidden" v-model="donation.id" />
    <b-row>
      <b-col md="12" sm="12">
        <b-form-group label="Nome: " label-for="donation-name">
          <b-form-input
            id="donation-name"
            type="text"
            v-model="donation.name"
            required
            placeholder="Nome"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="row col-12 col-md-12">
      <div
        class="col-12 col-md-4 item-donation-panel"
        v-for="item in donation.items"
        :key="item.id"
      >
        <b-card
          img-src="https://brfulfillment.com.br/img/icons/design.svg"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text class="mb-2">
            <b>{{ item.name }}</b>
          </b-card-text>
          <p>{{ item.description }}</p>
        </b-card>
      </div>
    </div>
    <b-button variant="primary" @click="edit" class="mr-2">Salvar</b-button>
    <b-button
      variant="success"
      @click="addItemBtn"
      v-show="addItem == 1"
      class="mr-2"
    >Adicionar Item</b-button>

    <form v-show="addItemActive == 1" class="mt-2">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputName4">Nome</label>
          <input
            type="text"
            class="form-control"
            id="inputName4"
            placeholder="Nome"
            required
            v-model="item.name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputDescricao4">Descrição</label>
          <input
            type="text"
            class="form-control"
            id="inputDescricao4"
            placeholder="Descrição"
            required
            v-model="item.description"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputValue">Deseja doar valores em dinheiro?</label>
        <input
          type="text"
          class="form-control"
          id="inputValue"
          placeholder="Valor"
          required
          v-model="item.value"
        />
      </div>
      <b-row>
        <div class="form-group col-md-3">
          <label for="inputPeso4">Peso</label>
          <input
            type="text"
            class="form-control"
            id="inputPeso4"
            placeholder="Peso"
            required
            v-model="item.weight"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="inputAltura4">Altura</label>
          <input
            type="text"
            class="form-control"
            id="inputAltura4"
            placeholder="Altura"
            required
            v-model="item.height"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="inputWidth4">Largura</label>
          <input
            type="text"
            class="form-control"
            id="inputWidth4"
            placeholder="Largura"
            required
            v-model="item.width"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="inputTamanho4">Tamanho</label>
          <input
            type="text"
            class="form-control"
            id="inputTamanho4"
            placeholder="Tamanho"
            required
            v-model="item.length"
          />
        </div>
      </b-row>
      <button class="btn btn-primary" @click.prevent="saveItem">Salvar</button>
    </form>

    <hr />
    <b-row>
      <h2 class="col-11 col-md-11">Doações</h2>
      <b-button variant="primary" @click="loadDonations" class="mb-2" title="Atualizar">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </b-button>
    </b-row>
    <b-table hover striped :items="donations" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="primary" class="mr-2" @click="loadDonation(data.item)">
          <i class="fa fa-pencil"></i>
          Editar
        </b-button>
        <b-button variant="danger" class="mr-2" @click="remove(data.item.id)">
          <i class="fa fa-remove"></i>
          Excluir
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "UserDonations",
  computed: mapState(["user"]),
  data: function() {
    return {
      donation: {},
      donations: [],
      item: {},
      fields: [
        { key: "name", label: "Name", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ],
      addItem: 0,
      addItemActive: 0
    };
  },
  methods: {
    loadDonations() {
      const id = this.user.userResponse.id;
      const url = `${baseApiUrl}donation/byuserid/${id}`;
      axios.get(url).then(res => {
        this.donations = res.data;
      });
    },
    reset() {
      this.donations = {};
      this.donation = {};
      this.loadDonations();
    },
    edit() {
      const method = this.donation.id ? "put" : "post";
      const id = this.donation.id ? `/${this.donation.id}` : "";
      this.donation.AuthorId = this.user.userResponse.id;
      axios[method](`${baseApiUrl}donation${id}`, this.donation)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadDonations();
          this.donation = {};
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.donation.id;
      axios
        .patch(`${baseApiUrl}donation/changestatus/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadDonations();
          this.reset();
        })
        .catch(showError);
    },
    loadDonation(donation) {
      this.donation = { ...donation };
      this.addItem = 1;
    },
    addItemBtn() {
      this.addItemActive = this.addItemActive == 1 ? 0 : 1;
      this.item = {};
    },
    saveItem() {
      this.item.donationId = this.donation.id;
      axios
        .post(`${baseApiUrl}item`, this.item)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadDonations();
          this.reset();
          this.addItem = 0;
          this.addItemActive = 0;
          this.reset();
        })
        .catch(showError);
    }
  },
  mounted() {
    this.loadDonations();
  }
};
</script>

<style>
.item-donation-panel {
  margin-bottom: 20px;
}
.item-donation-panel .card {
  height: 100%;
}
</style>
