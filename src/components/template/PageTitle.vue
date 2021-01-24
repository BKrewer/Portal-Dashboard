<template>
  <div class="page-title">
    <h3>
      <i v-if="icon" :class="icon"></i>
      {{ main }}
    </h3>
    <h5>{{ sub }}</h5>
    <hr />
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"]
};
</script>

<style>
.page-title {
  padding: 0 20px;
}
.page-title h3 {
  margin: 0px;
  margin-top: 10px;
}

.page-title h5 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>
