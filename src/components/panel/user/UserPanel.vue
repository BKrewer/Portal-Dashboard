<template>
  <div class="user-content row col-12 col-md-12 col-lg-12">
    <Menu />
    <div class="col-8 col-md-8 mt-4 offset-md-1">
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName4">Nome</label>
            <input
              type="text"
              class="form-control"
              id="inputName4"
              placeholder="Nome"
              required
              v-model="userForm.name"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
              required
              v-model="userForm.email"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputTelefone">Telefone</label>
          <input
            type="text"
            class="form-control"
            id="inputTelefone"
            placeholder="55 9 99999999"
            required
            v-model="userForm.phone"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputPW">Senha</label>
            <input
              type="password"
              class="form-control"
              id="inputPW"
              placeholder="Nova senha"
              required
              v-model="userForm.password"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputConfPW">Confirma senha</label>
            <input
              type="password"
              class="form-control"
              id="inputConfPW"
              placeholder="Confirmar nova senha"
              required
              v-model="userForm.confirmPassword"
            />
          </div>
        </div>
        <button class="btn btn-primary" @click.prevent="updateUser">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl } from "@/global";
import axios from "axios";
import Menu from "./Menu";

export default {
  name: "user",
  computed: mapState(["user"]),
  components: { Menu },
  data() {
    return {
      userForm: {}
    };
  },
  methods: {
    updateUser() {
      const id = this.user.userResponse.id;
      axios.put(`${baseApiUrl}user/${id}`, this.userForm).then(() => {
        this.$toasted.global.defaultSuccess();
      });
    }
  }
};
</script>