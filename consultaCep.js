require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

async function buscarCep(cep) {
  const cepLimpo = String(cep).replace(/[^0-9]/g, ""); // Remove caracteres não numéricos do CEP
  if (cepLimpo.length !== 8) {
    throw new Error("CEP deve conter 8 digitos."); //Verifica se o CEP tem 8 digitos
  }
  const url = `https://api.nuvemfiscal.com.br/cep/${cep}`;
  const token = process.env.NUVEM_FISCAL_TOKEN; // Token de autenticação da API
  try {
    const response = await fetch(url, {
      // Faz a requisição para a API
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      // Verifica se a resposta da API é ok
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data); // Exibe os dados no console
    return data;
  } catch (errorr) {
    console.error("Erro ao buscar o CEP:", errorr);
  }
}
const cep = 14801722;
buscarCep(cep);
