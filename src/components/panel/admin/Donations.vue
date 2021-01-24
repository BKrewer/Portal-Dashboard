<template>
  <div class="donation-admin admin-pages col-12 col-md-12 row">
    <Menu />
    <div class="col-8 col-md-8 offset-1 mt-4">
      <b-form>
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
          <div class="col-12 col-md-4" v-for="item in donation.items" :key="item.id">
            <b-card
              img-src="https://brfulfillment.com.br/img/icons/design.svg"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
            >
              <b class="mb-2">{{ item.name }}</b>
              <p>{{ item.description }}</p>
            </b-card>
          </div>
        </div>
      </b-form>
      <hr />
      <b-form>
        <input id="user-id" type="hidden" v-model="donation.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Status: " label-for="user-role">
              <b-form-select v-model="donation.status" :options="options"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="danger" @click="changeStatus">Alterar Status</b-button>
      </b-form>
      <hr />
      <b-row>
        <h2 class="col-11 col-md-11">Doações</h2>
        <b-button variant="primary" @click="loadDonations" class="mb-2" title="Atualizar">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </b-button>
      </b-row>
      <b-table hover striped :items="donations" :fields="fields">
        <template slot="actions" slot-scope="data">
          <b-button variant="primary" class="mr-2" @click="loadUser(data.item)">
            <i class="fa fa-pencil"></i>
            Editar
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import Menu from "./Menu";

export default {
  name: "Donations",
  components: { Menu },
  data: function() {
    return {
      donation: {},
      donations: [],
      options: [
        { value: "pendente", text: "Pendente" },
        { value: "ativo", text: "Ativo" },
        { value: "recusado", text: "Recusada" }
      ],
      fields: [
        { key: "name", label: "Name", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadDonations() {
      const url = `${baseApiUrl}donation`;
      axios.get(url).then(res => {
        this.donations = res.data;
      });
    },
    reset() {
      this.donations = {};
      this.loadDonations();
    },
    changeStatus() {
      const id = this.donation.id;
      let statusChanged = this.donation.status;
      axios
        .patch(`${baseApiUrl}donation/changestatus/${id}/${statusChanged}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadDonations();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(donation) {
      this.donation = { ...donation };
    }
  },
  mounted() {
    this.loadDonations();
  }
};
</script>

<style>
</style>
