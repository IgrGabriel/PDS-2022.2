<template>
  <nav class="navbar navbar-expand-lg bg-main-color">
    <div class="container-fluid">
      <div class="navbar-brand">
        <img src="/img/user.png" alt="" class="rounded-circle me-2" />
        <strong>{{ userName }}</strong>
      </div>

      <button
        class="btn btn-secondary bg-color-secondary navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <i class="bx bx-menu"></i>
      </button>

      <div
        class="offcanvas offcanvas-end bg-main-color d-flex flex-column flex-shrink-0 p-3 text-white bg-main-color"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <img src="/img/logo.png" alt="logo" />

          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/">
                <i class="bx bx-home icon"></i>
                Home
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link text-white" to="/historico">
                <i class="bx bx-history"></i>
                Historico de transacoes
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="isHistorico">
              <a
                class="nav-link dropdown-toggle text-white"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="bx bx-bar-chart-alt-2 icon"></i>
                Nova Transação
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    userName: String,
    isHistorico: Boolean,
  },
};
</script>

<style scoped>
.navbar .navbar-brand img {
  width: 60px;
  height: 60px;
}

.navbar .offcanvas li a:hover {
  background: var(--color-secondary);
}

.navbar .offcanvas .dropdown-menu li a:hover {
  background: var(--color-shadow);
}

.navbar .offcanvas .offcanvas-header img {
  max-height: 40px;
}

.navbar .container-fluid .offcanvas {
  width: 305px;
}
</style>
