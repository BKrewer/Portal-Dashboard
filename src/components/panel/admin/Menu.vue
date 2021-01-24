<template>
  <nav class="col-md-2 bg-dark sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin" class="nav-link">
            <i class="fa fa-user-o"></i>Usuários
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/donations" class="nav-link">
            <i class="fa fa fa-list"></i>Doações
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
