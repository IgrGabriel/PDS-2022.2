<script setup>
import Container from "../components/Container.vue";
import Saldo from "../components/home/Saldo.vue";
import Titulo from "../components/Titulo.vue";
import Financas from "../components/home/Financas.vue";
import TituloSaldo from "../components/home/TituloSaldo.vue";
import DespesasDiaria from "../components/home/DespesasDiaria.vue";
import ReceitasDiaria from "../components/home/ReceitasDiaria.vue";
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar userName="NomeUsuario" :isHistorico="isHistorico" />
    <!-- Saldo da Conta -->
    <Container>
      <TituloSaldo title="Saldo da Conta" />
      <Saldo />
    </Container>

    <!-- Visão geral -->
    <Container>
      <Titulo title="Visão geral" />
      <Financas />
    </Container>

    <!-- Despesas Diarias-->
    <Container>
      <Titulo title="Despesas do dia" />
      <DespesasDiaria />
    </Container>

    <!-- Receitas Diarias -->
    <Container>
      <Titulo title="Receitas do dia" />
      <ReceitasDiaria />
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHistorico: false,
    };
  },
};
</script>
