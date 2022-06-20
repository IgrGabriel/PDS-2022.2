<script setup>
import Container from "../components/Container.vue";
import TabelaTransacoes from "../components/historico/TabelaTransacoes.vue";
import Titulo from "../components/Titulo.vue";
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar userName="Igor Gabriel" :isHistorico="isHistorico" />
    <Container>
      <Titulo title="Histórico de Transações" />
      <TabelaTransacoes />
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHistorico: true,
    };
  },
};
</script>
