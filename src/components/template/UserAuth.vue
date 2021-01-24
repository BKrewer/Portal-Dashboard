<template>
  <div class="user-button">
    <a href @click.prevent="tosignin">
      <i class="fa fa-sign-in"></i> Entre
      <br />
      <small>ou cadastre-se</small>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserAuth",
  methods: {
    tosignin() {
      this.$router.push({ path: "/auth" });
    }
  }
};
</script>

<style>
.user-button a {
  color: white;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
}
.user-button a small {
  font-size: 12px;
  text-transform: lowercase;
}

.user-button a:hover {
  text-decoration: none;
  color: #f2f2f2;
}
</style>
