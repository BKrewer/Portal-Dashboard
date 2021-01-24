<template>
  <div class="admin-pages col-12 col-md-12 row">
    <Menu />
    <div class="admin-pages-tabs col-md-8 offset-1 mt-4 mb-4">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Suas ofertas" active>
            <UserAuthor />
          </b-tab>
          <b-tab title="Doações solicitadas">
            <UserRequestDonations />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserRequestDonations from "./UserRequestDonations";
import UserAuthor from "./UserAuthor";
import Menu from "./Menu";

export default {
  name: "AdminPages",
  components: { UserRequestDonations, UserAuthor, Menu }
};
</script>

<style>
.content .admin-pages .nav-tabs li a {
  color: #aaa;
}
</style>
