<template>
  <div class="col-sm-11 col-md-11">
    <table class="table text-white bg-color-secondary">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Categoria</th>
          <th scope="col">Descrição</th>
          <th scope="col">Valor(R$)</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in receitasDiarias" :key="item.id">
          <td>{{ item.data }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.valor.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      receitasDiarias: computed(() => store.getters.receitasDiarias),
    };
  },
};
</script>
