import { createStore } from "vuex";
import { http } from "../service/config";

const store = createStore({
  state: {
    transacoes: [],
    categorias: [],
  },
  mutations: {
    setTransacoes(state, payload) {
      state.transacoes = payload;
    },
    setCategorias(state, payload) {
      state.categorias = payload;
    },
  },
  actions: {
    async getTransacoes({ commit }) {
      try {
        const response = await http.get("/get-all");
        commit("setTransacoes", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getCategorias({ commit }) {
      try {
        const response = await http.get("/categoria");
        commit("setCategorias", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async addTransacao({ commit }, payload) {
      try {
        const response = await http.post("/create", payload);
        commit("setTransacoes", response.data);
        alert("Transação adicionada com sucesso!");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTransacao({ commit }, payload) {
      try {
        await http.delete(`/transacao/${payload}`);
        alert("Transação excluída com sucesso!");
      } catch (err) {
        console.log(err);
      }
    },
    async updateTransacao({ commit }, payload) {
      try {
        await http.put(`/transacao/${payload.id}`, payload);
        alert("Transação atualizada com sucesso!");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    saldoTotal(state) {
      return state.transacoes.reduce((total, transacao) => {
        if (transacao.tipo === "receita") {
          return total + parseFloat(transacao.valor);
        } else {
          return total - parseFloat(transacao.valor);
        }
      }, 0);
    },
    valorReceitas(state) {
      return state.transacoes.reduce((total, transacao) => {
        if (transacao.tipo === "receita") {
          return total + parseFloat(transacao.valor);
        } else {
          return total;
        }
      }, 0);
    },
    valorDespesas(state) {
      return state.transacoes.reduce((total, transacao) => {
        if (transacao.tipo === "despesa") {
          return total + parseFloat(transacao.valor);
        } else {
          return total;
        }
      }, 0);
    },
    despesasDiarias(state) {
      const dataAtual = new Date().toLocaleDateString("en-GB");
      const despesas = state.transacoes.filter(
        (transacao) => transacao.tipo === "despesa"
      );

      return despesas.filter((transacao) => transacao.data === dataAtual);
    },
    receitasDiarias(state) {
      const dataAtual = new Date().toLocaleDateString("en-GB");
      const receitas = state.transacoes.filter(
        (transacao) => transacao.tipo === "receita"
      );

      return receitas.filter((transacao) => transacao.data === dataAtual);
    },
    categoriasDespesas(state) {
      return state.categorias.filter(
        (categoria) => categoria.tipo === "despesa"
      );
    },
    categoriasReceitas(state) {
      return state.categorias.filter(
        (categoria) => categoria.tipo === "receita"
      );
    },
  },
});

export default store;
