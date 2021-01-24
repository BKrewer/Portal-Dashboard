<template>
  <header class="header navbar navbar-expand-lg navbar-ligth">
    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/donations" class="nav-link">Doações</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">Sobre</router-link>
      </li>
    </ul>
    <UserAuth v-if="hideUserDropdown" />
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserAuth from "./UserAuth";
import UserDropdown from "./UserDropdown";

export default {
  name: "Header",
  components: { UserAuth, UserDropdown },
  props: {
    title: String,
    hideUserDropdown: Boolean
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
}
.header.navbar {
  padding: 0;
}
.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  margin-left: 20px;
  margin-bottom: 0;
}

.title a {
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
}

.title a:hover {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}

.nav-item .nav-link {
  color: white;
}
</style>
