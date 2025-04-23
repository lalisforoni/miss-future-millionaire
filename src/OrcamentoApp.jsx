// Código atualizado com imagem personalizada do cabeçalho
import React, { useEffect, useState } from "react";

const nomesMeses = {
  Jan: "Janeiro",
  Fev: "Fevereiro",
  Mar: "Março",
  Abr: "Abril",
  Mai: "Maio",
  Jun: "Junho",
  Jul: "Julho",
  Ago: "Agosto",
  Set: "Setembro",
  Out: "Outubro",
  Nov: "Novembro",
  Dez: "Dezembro"
};

const modeloMes = [
  { categoria: "Dia 1", divisor: true },
  { categoria: "AWEN", valor: 65, pago: false, editavel: false },
  { categoria: "CONDOMINIO", valor: 1290.64, pago: false, editavel: false },
  { categoria: "DIARISTA", valor: 500, pago: false, editavel: false },
  { categoria: "ENEL", valor: 200, pago: false, editavel: false },
  { categoria: "Cartão de Crédito - Itau", valor: 2000, editavel: true, pago: false },
  { categoria: "SEGURO", valor: 0, pago: false, editavel: false },
  { categoria: "TOTALPASS", valor: 0, pago: false, editavel: false },
  { categoria: "VIVO", valor: 0, pago: false, editavel: false },
  { categoria: "CLARO", valor: 0, pago: false, editavel: false },
  { categoria: "Cartão de Crédito - Will", valor: 1000, editavel: true, pago: false },
  { categoria: "Cartão de Crédito - XP", valor: 1500, editavel: true, pago: false },
  { categoria: "Dia 15", divisor: true },
  { categoria: "IPTU", valor: 631.81, pago: false, editavel: false },
  { categoria: "COMGAS", valor: 60, pago: false, editavel: false },
  { categoria: "ANA - PLANO DE SAUDE", valor: 1000, pago: false, editavel: false },
  { categoria: "PAULO - CDB", valor: 1500, pago: false, editavel: false }
];

const dadosPorMes = Object.fromEntries(
  Object.keys(nomesMeses).map((mes) => [mes, JSON.parse(JSON.stringify(modeloMes))])
);

export default function OrcamentoApp() {
  const [mesSelecionado, setMesSelecionado] = useState("Jan");
  const [gastos, setGastos] = useState(dadosPorMes["Jan"]);

  const renda = 14049.03;

  useEffect(() => {
    if (dadosPorMes[mesSelecionado]) {
      setGastos(dadosPorMes[mesSelecionado]);
    }
  }, [mesSelecionado]);

  const handleTogglePago = (index) => {
    const updated = [...gastos];
    updated[index].pago = !updated[index].pago;
    setGastos(updated);
  };

  const handleEditValor = (index, newValue) => {
    const updated = [...gastos];
    const novoValor = newValue === "" ? 0 : parseFloat(newValue);
    updated[index].valor = novoValor;
    setGastos(updated);
  };

  const totalPrevisto = gastos.reduce((sum, item) => sum + (item.valor || 0), 0);
  const saldoDisponivel = renda - totalPrevisto;

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffe4ec 0%, #fff0f5 120px)', minHeight: '100vh', fontFamily: '"Quicksand", sans-serif' }}>
      <div style={{ position: 'relative' }}>
        
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '36px', color: '#e91e63', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '0' }}>Hello</h1>
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginTop: '0', marginBottom: '20px' }}>miss future Millionaire</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
      <select
        onChange={(e) => setMesSelecionado(e.target.value)}
        value={mesSelecionado}
        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
        {Object.keys(nomesMeses).map((mes) => (
          <option key={mes} value={mes}>{nomesMeses[mes]}</option>
        ))}
      </select>
    </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', textAlign: 'center', marginBottom: '20px' }}>
        <div>
          <p style={{ fontSize: '18px', color: '#000' }}>Previsão Total:</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>R$ {totalPrevisto.toFixed(2)}</p>
        </div>
        <div>
          <p style={{ fontSize: '18px', color: '#000' }}>Total Disponível:</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            <span style={{ color: saldoDisponivel >= 0 ? 'green' : 'red' }}>R$ {saldoDisponivel.toFixed(2)}</span>
          </p>
        </div>
            </div>

<div style={{ marginTop: "20px" }}>
        {gastos.map((gasto, index) => (
          gasto.divisor ? (
            <div key={index} style={{ color: '#000', fontWeight: '600', textAlign: 'left', margin: '32px 0 8px 12px', fontSize: '16px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '24px' }}>🌸</div>
              Contas do {gasto.categoria.replace("Dia", "Dia ")}
            </div>
          ) : (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <input type="checkbox" checked={gasto.pago} onChange={() => handleTogglePago(index)} />
              <span style={{ flex: 1, marginLeft: gasto.categoria.match(/seguro|totalpass|vivo|claro/i) ? '30px' : '10px', fontStyle: gasto.categoria.match(/seguro|totalpass|vivo|claro/i) ? 'italic' : 'normal', whiteSpace: 'nowrap' }}>{gasto.categoria}</span>
              {gasto.editavel || gasto.valor === 0 ? (
                <input
                  type="number"
                  style={{ width: "120px", padding: "4px" }}
                  value={gasto.valor === 0 ? "" : gasto.valor}
                  onChange={(e) => handleEditValor(index, e.target.value)}
                />
              ) : (
                <span style={{ width: "120px", textAlign: "right" }}>R$ {gasto.valor.toFixed(2)}</span>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
