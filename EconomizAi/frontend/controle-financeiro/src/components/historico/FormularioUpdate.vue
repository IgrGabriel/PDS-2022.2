<template>
  <!-- Fomulário Modal -->
  <div
    class="modal fade"
    id="fomularioEditar"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Editar transaçao</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Formulario -->
        <div class="modal-body">
          <form autocomplete="off" @submit="updateTransation">
            <!-- Valor da transação -->
            <div class="input-box">
              <label for="valor" class="labelInput">
                <i class="bx bx-calculator"></i>
              </label>

              <input
                type="text"
                name="valor"
                id="valor"
                v-model="valor"
                class="input-user"
                placeholder="R$ 0,00"
                required
              />
            </div>

            <!-- Escolher o tipo da transação -->
            <div class="input-box">
              <label for="tipo">
                <i class="bx bx-dollar"></i>
              </label>
              <select v-model="tipo" id="tipo" name="tipo" class="text-reset">
                <option selected disabled>Tipo da transação</option>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>

            <!-- Opções de categoria para despesa -->
            <div class="input-box" v-if="tipo == 'despesa'">
              <label for="categoria">
                <i class="bx bx-category"></i>
              </label>
              <select id="categoria" name="categoria" v-model="categoria">
                <option selected disabled>Categoria</option>
                <option
                  v-for="item in categoriasDespesas"
                  :key="item.id"
                  :value="item.categoria"
                >
                  {{ item.categoria }}
                </option>
              </select>
            </div>

            <!-- Opções de categoria para receita -->
            <div class="input-box" v-if="tipo == 'receita'">
              <label for="categoria">
                <i class="bx bx-category"></i>
              </label>
              <select id="categoria" name="categoria" v-model="categoria">
                <option selected disabled>Categoria</option>
                <option
                  v-for="item in categoriasReceitas"
                  :key="item.id"
                  :value="item.categoria"
                >
                  {{ item.categoria }}
                </option>
              </select>
            </div>

            <!-- Descrição da transação -->
            <div class="input-box">
              <label for="descricao" class="labelInput">
                <i class="bx bx-detail"></i>
              </label>
              <input
                type="text"
                name="descricao"
                id="descricao"
                class="input-user"
                placeholder="Descrição"
                v-model="descricao"
                required
              />
            </div>

            <!-- Data da transação -->
            <div class="data-container">
              <input
                type="date"
                name="data"
                id="data"
                v-model="data"
                required
              />
            </div>

            <hr />
            <input
              class="btn btn-primary"
              type="submit"
              name="submit"
              id="submit"
            />
          </form>
        </div>
      </div>
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
      categoriasDespesas: computed(() => store.getters.categoriasDespesas),
      categoriasReceitas: computed(() => store.getters.categoriasReceitas),
      getTransacoes: () => store.dispatch("getTransacoes"),
      updateTransacao: (transacao) =>
        store.dispatch("updateTransacao", transacao),
    };
  },
  props: {
    transacao: Array,
  },
  data() {
    return {
      valor: "",
      descricao: "",
      categoria: "",
      data: "",
      tipo: "",
    };
  },
  methods: {
    async updateTransation() {
      // yy-mm-dd -> dd/mm/yy
      const dataArray = this.data.split("-");
      const _data = dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0];

      const transacao = {
        valor: parseFloat(this.valor),
        descricao: this.descricao,
        categoria: this.categoria,
        data: _data,
        tipo: this.tipo,
      };
    },
  },
};
</script>
