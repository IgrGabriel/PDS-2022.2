<script setup>
import Container from "../components/Container.vue";
</script>

<template>
  <div>
    <Container>
      <h1>Página não encontrada!</h1>

      <div class="centro">
        <router-link to="/" replace>
          <button type="button" class="btn btn-secondary">
            <i class="bx bx-arrow-back"></i> Voltar
          </button>
        </router-link>
      </div>
    </Container>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.centro {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>
