<template>
  <div class="row justify-content-around">
    <div class="col-sm-5 align-self-end">
      <p class="borda subtitle borda-verde">Receitas</p>
    </div>
    <div class="col-sm-5 align-self-end">
      <p class="values receita-value">R$ {{ valorReceitas }}</p>
    </div>
    <div class="col-sm-5 align-self-end">
      <p class="borda subtitle borda-vermelha">Despesas</p>
    </div>
    <div class="col-sm-5 align-self-end">
      <p class="values despesa-value">R$ {{ valorDespesas }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      valorReceitas: computed(() => store.getters.valorReceitas),
      valorDespesas: computed(() => store.getters.valorDespesas),
    };
  },
};
</script>
