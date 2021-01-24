<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome: " label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              placeholder="Nome"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email: " label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              placeholder="Email"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Telefone: " label-for="user-phone">
            <b-form-input
              id="user-phone"
              type="text"
              v-model="user.phone"
              required
              placeholder="Telefone"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" @click="edit" class="mr-2">Salvar</b-button>
      <b-button variant="danger" @click="remove" v-if="user.status == 1">Bloquear</b-button>
      <b-button variant="danger" @click="remove" v-else>Desbloquear</b-button>
    </b-form>
    <hr />
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Função: " label-for="user-role">
            <b-form-select v-model="user.role" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="danger" @click="changeRole">Alterar função</b-button>
    </b-form>
    <hr />
    <b-row>
      <h2 class="col-11 col-md-11">Funcionários</h2>
      <b-button variant="primary" @click.prevent="loadEmployees" class="mb-2" title="Atualizar">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </b-button>
    </b-row>
    <b-table hover striped :items="users" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="primary" class="mr-2" @click="loadUser(data.item)">
          <i class="fa fa-pencil"></i>
          Editar
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Employees",
  data: function() {
    return {
      user: {},
      users: [],
      options: [
        { value: "user", text: "Usuário" },
        { value: "employee", text: "Funcionário" },
        { value: "admin", text: "Administrador" }
      ],
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "phone", label: "Telefone", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadEmployees() {
      const url = `${baseApiUrl}user/allemployees`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    reset() {
      this.user = {};
      this.loadUsers();
    },
    edit() {
      const id = this.user.id;
      axios
        .put(`${baseApiUrl}user/${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadEmployees();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .patch(`${baseApiUrl}user/changestatus/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadEmployees();
          this.reset();
        })
        .catch(showError);
    },
    changeRole() {
      const id = this.user.id;
      const role = this.user.role;
      axios
        .patch(`${baseApiUrl}user/changerole/${id}/${role}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadEmployees();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user) {
      this.user = { ...user };
    }
  },
  mounted() {
    this.loadEmployees();
  }
};
</script>

<style>
</style>
