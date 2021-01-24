<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user }">
    <Header title="Portal Comunitário" :hideUserDropdown="!user" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";
import Header from "@/components/template/Header";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: { Header, Content, Footer },
  computed: mapState(["isMenuVisible", "user"])
};
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "footer";
}
</style>