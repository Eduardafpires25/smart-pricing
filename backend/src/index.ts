
import express from "express";
import cors from "cors";

type Produto = {
  id: number;
  nome: string;
  custoFixo: number;
  custoVariavel: number;
  margemLucro: number;
  precoSugerido: number;
};

const app = express();
app.use(cors());
app.use(express.json());

let produtos: Produto[] = [];

app.post("/produtos", (req, res) => {
  const { nome, custoFixo, custoVariavel, margemLucro } = req.body;
  const precoSugerido = (custoFixo + custoVariavel) * (1 + margemLucro / 100);
  const novoProduto: Produto = {
    id: produtos.length + 1,
    nome,
    custoFixo,
    custoVariavel,
    margemLucro,
    precoSugerido
  };
  produtos.push(novoProduto);
  res.json(novoProduto);
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.listen(3001, () => console.log("✅ Back-end rodando na porta 3001"));
