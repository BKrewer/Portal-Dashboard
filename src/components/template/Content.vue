<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content"
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #efefef;
}
.content > .row {
  height: 100%;
}
.content .row .sidebar {
  padding-top: 20px;
  height: auto;
}
.content .row .sidebar ul li a i {
  margin-right: 10px;
  width: 20px;
}
</style>
