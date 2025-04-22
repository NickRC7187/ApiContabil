require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

async function buscaCnpj(cnpj) {
  const cnpjLimpo = String(cnpj).replace(/[^0-9]/g, ""); // Remove caracteres não numéricos do CNPJ
  if (cnpjLimpo.length !== 14) {
    throw new Error("CNPJ deve conter 14 dígitos."); // Verifica se o CNPJ tem 14 dígitos
  }
  const token = process.env.NUVEM_FISCAL_TOKEN; // Token de autenticação da API
  const url = `https://api.nuvemfiscal.com.br/cnpj/${cnpjLimpo}`; // URL da API para buscar o CNPJ
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
  } catch (error) {
    console.error("Erro ao buscar o CNPJ:", error); // Exibe o erro no console
  }
}

const cnpj = "26.049.876/0001-16";
buscaCnpj(cnpj); // Chama a função com o CNPJ desejado;
