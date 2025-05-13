
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [produtos, setProdutos] = useState([])
  const [form, setForm] = useState({ nome: "", custoFixo: "", custoVariavel: "", margemLucro: "" })

  const carregarProdutos = async () => {
    const res = await axios.get("http://localhost:3001/produtos")
    setProdutos(res.data)
  }

  const cadastrar = async () => {
    await axios.post("http://localhost:3001/produtos", {
      nome: form.nome,
      custoFixo: parseFloat(form.custoFixo),
      custoVariavel: parseFloat(form.custoVariavel),
      margemLucro: parseFloat(form.margemLucro),
    })
    setForm({ nome: "", custoFixo: "", custoVariavel: "", margemLucro: "" })
    carregarProdutos()
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smart Pricing MVP</h1>

      <div className="space-y-2 mb-6">
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="border w-full p-2" />
        <input placeholder="Custo Fixo" value={form.custoFixo} onChange={(e) => setForm({ ...form, custoFixo: e.target.value })} className="border w-full p-2" />
        <input placeholder="Custo Variável" value={form.custoVariavel} onChange={(e) => setForm({ ...form, custoVariavel: e.target.value })} className="border w-full p-2" />
        <input placeholder="Margem de Lucro (%)" value={form.margemLucro} onChange={(e) => setForm({ ...form, margemLucro: e.target.value })} className="border w-full p-2" />
        <button onClick={cadastrar} className="bg-blue-500 text-white px-4 py-2 rounded">Cadastrar Produto</button>
      </div>

      <ul>
        {produtos.map((p: any) => (
          <li key={p.id} className="border-b py-2">
            {p.nome} - Preço Ideal: R$ {p.precoSugerido.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
