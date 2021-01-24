<template>
  <div class="user-address row col-12 col-md-12 col-lg-12">
    <Menu />
    <div class="col-8 col-md-8 mt-4 offset-md-1">
      <form>
        <input type="hidden" v-model="address.id" />
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputStreet4">Rua</label>
            <input
              type="text"
              class="form-control"
              id="inputStreet4"
              placeholder="Rua"
              required
              v-model="address.street"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputCity4">Cidade</label>
            <input
              type="text"
              class="form-control"
              id="inputCity4"
              placeholder="Cidade"
              required
              v-model="address.city"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputComplement4">Complemento</label>
          <input
            type="text"
            class="form-control"
            id="inputComplement4"
            placeholder="Complemento"
            required
            v-model="address.complement"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-2">
            <label for="inputCep4">CEP</label>
            <input
              type="text"
              class="form-control"
              id="inputCep4"
              placeholder="CEP"
              required
              v-model="address.cep"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputState4">Estado</label>
            <input
              type="text"
              class="form-control"
              id="inputState4"
              placeholder="Estado"
              required
              v-model="address.state"
            />
          </div>
          <div class="form-group col-md-4">
            <label for="inputCountry4">Pais</label>
            <input
              type="text"
              class="form-control"
              id="inputCountry4"
              placeholder="Pais"
              required
              v-model="address.country"
            />
          </div>
        </div>
        <b-row>
          <b-col xs="12">
            <b-button variant="primary" v-if="mode === 'save'" @click="edit">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
          </b-col>
        </b-row>
      </form>
      <b-table hover striped :items="addresses" :fields="fields" class="mt-4">
        <template slot="actions" slot-scope="data">
          <b-button variant="primary" class="mr-2" @click="loadAddress(data.item)">
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
  </div>
</template>

<script>
import Menu from "./Menu";
import { mapState } from "vuex";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAddresses",
  computed: mapState(["user"]),
  components: { Menu },
  data: function() {
    return {
      mode: "save",
      address: {},
      addresses: {},
      fields: [
        { key: "street", label: "Rua", sortable: true },
        { key: "complement", label: "Complement", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadAddresses() {
      const id = this.user.userResponse.id;
      const url = `${baseApiUrl}address/byuserid/${id}`;
      axios.get(url).then(res => {
        this.addresses = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.address = {};
      this.loadAddresses();
    },
    edit() {
      const method = this.address.id ? "put" : "post";
      const id = this.address.id ? `/${this.address.id}` : "";
      this.address.userId = this.user.userResponse.id;
      axios[method](`${baseApiUrl}address${id}`, this.address)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadAddresses();
          this.reset();
        })
        .catch(showError);
    },
    remove(id) {
      axios.delete(`${baseApiUrl}address/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.loadAddresses();
        this.reset();
      });
    },
    loadAddress(address, mode = "save") {
      this.mode = mode;
      this.address = { ...address };
    }
  },
  mounted() {
    this.loadAddresses();
  }
};
</script>

<style>
</style>
