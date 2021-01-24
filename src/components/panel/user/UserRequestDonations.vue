<template>
  <div class="donation-admin">
    <b-row>
      <b-col md="12" sm="12">
        <b-form-group label="Nome: " label-for="donation-name">
          <b-form-input
            id="donation-name"
            type="text"
            v-model="donationRequest.name"
            required
            placeholder="Nome"
            disabled
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="row col-12 col-md-12">
      <div class="col-12 col-md-4" v-for="item in donationRequest.items" :key="item.id">
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
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </b-card>
      </div>
    </div>
    <hr />
    <b-row>
      <h2 class="col-11 col-md-11">Doações</h2>
      <b-button variant="primary" @click="loadDonations" class="mb-2" title="Atualizar">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </b-button>
    </b-row>
    <b-table hover striped :items="donationRequests" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="primary" class="mr-2" @click="loadUser(data.item)">
          <i class="fa fa-pencil"></i>
          Ver detalhes
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "UserDonations",
  computed: mapState(["user"]),
  data: function() {
    return {
      donationRequest: {},
      donationRequests: [],
      fields: [
        { key: "name", label: "Name", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadDonations() {
      const id = this.user.userResponse.id;
      const url = `${baseApiUrl}donation/byuserrequest/${id}`;
      axios.get(url).then(res => {
        this.donationRequests = res.data;
      });
    },
    loadUser(donationRequest) {
      this.donationRequest = { ...donationRequest };
    }
  },
  mounted() {
    this.loadDonations();
  }
};
</script>

<style>
</style>
