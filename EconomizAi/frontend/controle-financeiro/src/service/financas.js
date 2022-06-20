import { http } from "./config";

export default {
  listar: () => {
    return http.get("/get-all");
  },
  cadastrar: (transacao) => {
    return http.post("/create", transacao);
  },
  editar: (id) => {
    return http.put("/transacao/" + id);
  },
  excluir: (id) => {
    return http.delete("/transacao/" + id);
  },
};
