<template>
  <div class="admin-pages col-12 col-md-12 row">
    <Menu />
    <div class="admin-pages-tabs col-md-8 offset-1 mt-4 mb-4">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Usuários" active>
            <Users />
          </b-tab>
          <b-tab title="Funcionários">
            <Employees />
          </b-tab>
          <b-tab title="Administradores">
            <Admins />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import Users from "./Users";
import Employees from "./Employees";
import Admins from "./Admins";
import Menu from "./Menu";

export default {
  name: "AdminPages",
  components: { Users, Employees, Admins, Menu }
};
</script>

<style>
.content .admin-pages .nav-tabs li a {
  color: #aaa;
}
</style>
