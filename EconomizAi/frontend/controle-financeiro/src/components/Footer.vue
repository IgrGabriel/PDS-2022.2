<template>
  <div class="container bg-main-color footer-container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item">
          <router-link class="nav-link px-2 text-muted" to="/">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link px-2 text-muted" to="/historico">
            Historico de transacoes
          </router-link>
        </li>
      </ul>
      <a href="#" class="nav-link px-2 text-muted text-center">
        © 2022 Controle Financeiro, Inc
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer-container {
  width: 100%;
}
</style>
