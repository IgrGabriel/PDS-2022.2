<script setup>
import Footer from "./components/Footer.vue";
// import Navbar from "./components/Navbar.vue";
import ModalHeader from "./components/ModalHeader.vue";
import FormularioModal from "./components/FormularioModal.vue";
</script>

<script>
import { useStore } from "vuex";
import { mapActions } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      getTransacoes: () => store.dispatch("getTransacoes"),
      getCategorias: () => store.dispatch("getCategorias"),
    };
  },
  methods: {
    ...mapActions(["getTransacoes", "getCategorias"]),
  },
  mounted() {
    this.getTransacoes();
    this.getCategorias();
  },
};
</script>

<template>
  <main>
    <router-view></router-view>
    <Footer />
    <FormularioModal>
      <ModalHeader title="Adicionar nova transação" />
    </FormularioModal>
  </main>
</template>
