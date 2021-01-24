<template>
  <footer class="footer">
    <span>
      Copyright -
      <strong>Portal Comunitário</strong> - 2020
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background: #ddd;
  color: #333;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.footer span {
  margin-right: 20px;
}
</style>
