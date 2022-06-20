<template>
  <div>
    <div class="row justify-content-around">
      <div class="col-12">
        <div id="paginate">
          <table class="table text-white bg-color-secondary">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Categoria</th>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>

            <tbody class="list">
              <tr v-for="transacao in transacoes" :key="transacao.id">
                <td>{{ transacao.data }}</td>
                <td>{{ transacao.categoria }}</td>
                <td>{{ transacao.descricao }}</td>
                <td
                  :class="[
                    transacao.tipo === 'receita' ? 'receita' : 'despesa',
                  ]"
                >
                  {{ transacao.valor }}
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="excluir(transacao._id)"
                  >
                    <i class="bx bxs-trash"></i>
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-warning"
                    @click="editar(transacao)"
                    data-bs-toggle="modal"
                    data-bs-target="#fomularioEditar"
                  >
                    <i class="bx bxs-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
            <h5 class="modal-title" id="staticBackdropLabel">
              Editar transaçao
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Formulario -->
          <div class="modal-body">
            <form autocomplete="off" @submit.prevent="updateTransation">
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
                  <!-- <option selected disabled>Tipo da transação</option> -->
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
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      transacoes: computed(() => store.state.transacoes),
      categoriasDespesas: computed(() => store.getters.categoriasDespesas),
      categoriasReceitas: computed(() => store.getters.categoriasReceitas),
      deleteTransacao: (id) => store.dispatch("deleteTransacao", id),
      updateTransacao: (transacao) =>
        store.dispatch("updateTransacao", transacao),
      getTransacoes: () => store.dispatch("getTransacoes"),
    };
  },
  methods: {
    async excluir(id) {
      await this.deleteTransacao(id);
      this.getTransacoes();
    },
    // preenche os campos do formulário com a transacao selecionada
    editar(transacao) {
      this.id = transacao._id;
      this.valor = transacao.valor;
      this.tipo = transacao.tipo;
      this.categoria = transacao.categoria;
      this.descricao = transacao.descricao;

      // dd/mm/yy -> yy-mm-dd
      const convertDate = transacao.data.split("/");
      this.data = convertDate[2] + "-" + convertDate[1] + "-" + convertDate[0];
    },
    async updateTransation() {
      // yy-mm-dd -> dd/mm/yy
      const dataArray = this.data.split("-");
      const _data = dataArray[2] + "/" + dataArray[1] + "/" + dataArray[0];

      const transacao = {
        id: this.id,
        valor: parseFloat(this.valor),
        descricao: this.descricao,
        categoria: this.categoria,
        data: _data,
        tipo: this.tipo,
      };

      await this.updateTransacao(transacao);
      this.getTransacoes();
    },
  },
  data() {
    return {
      id: "",
      valor: "",
      tipo: "",
      categoria: "",
      descricao: "",
      data: "",
    };
  },
};
</script>

<style scoped>
.receita {
  color: var(--receita-color);
}
.despesa {
  color: var(--despesa-color);
}
</style>
