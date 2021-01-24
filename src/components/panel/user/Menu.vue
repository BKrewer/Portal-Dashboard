<template>
  <nav class="col-md-2 d-none d-md-block bg-dark sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/panel/edit" class="nav-link">
            <i class="fa fa-user-o"></i>Minha conta
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/panel/donations" class="nav-link">
            <i class="fa fa fa-list"></i>Minhas doações
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/panel/addresses" class="nav-link active">
            <i class="fa fa-address-card-o"></i>Meus endereços
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu"
};
</script>

<style>
.about div {
  text-align: justify;
}
</style>
