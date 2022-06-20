<template>
  <div class="col-sm-11 col-md-auto">
    <p class="saldo-value">R$ {{ saldoTotal }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      saldoTotal: computed(() => store.getters.saldoTotal),
    };
  },
};
</script>
