# 🚗 API de Consulta de Placas

API REST simples para consultar informações básicas de veículos a partir da placa.

A API coleta dados de múltiplas fontes online e retorna as informações mais relevantes para identificação do veículo e compra de peças.

## 📌 Informações retornadas

A API retorna os seguintes dados do veículo:

- **marca**
- **modelo**
- **ano**
- **cor**
- **chassi**
- **motorização**

## ⚙️ Tecnologias utilizadas

- Node.js
- HTTP Server nativo
- Fetch API
- Web Scraping

## 📦 Instalação

### 1. Instalar Node.js

Certifique-se de possuir Node.js versão 18 ou superior.

### 2. Clonar ou baixar o projeto

Estrutura mínima:

api.js package.json

### 3. Instalar dependências

Não há dependências externas. Apenas execute:

npm install

### 4. Iniciar a API

npm start

Ou:

node api.js

Servidor iniciará em:

http://localhost:3000

---

# 📡 Endpoint da API

## Consultar veículo pela placa

### Requisição

GET /placa/{placa}

### Exemplo

GET http://localhost:3000/placa/ABC1234

---

# 📄 Resposta da API

Exemplo de resposta:

```json
{
  "placa": "ABC1234",
  "fonte": "placas.app.br",
  "veiculo": {
    "marca": "Volkswagen",
    "modelo": "Gol",
    "ano": "2019",
    "cor": "Prata",
    "chassi": "9BWXXXXXXX",
    "motorizacao": "1.6"
  }
}


---

📑 Estrutura da resposta

Campo	Tipo	Descrição

placa	string	Placa consultada
fonte	string	Fonte de dados utilizada
marca	string	Fabricante do veículo
modelo	string	Modelo do veículo
ano	string	Ano do veículo
cor	string	Cor registrada
chassi	string	Chassi parcial
motorizacao	string	Motorização do veículo



---

🔍 Fontes de consulta

A API consulta múltiplos serviços online para obter os dados:

placas.app.br

placafipe.com

consultaplaca.com.br


Caso uma fonte falhe, a API tenta automaticamente a próxima.


---

🧩 Integração com aplicações

A API pode ser integrada facilmente em qualquer aplicação web ou mobile.

Exemplo em JavaScript

fetch("https://sua-api.com/placa/ABC1234")
.then(res => res.json())
.then(data => console.log(data));


---

🤖 Integração com Lovable

Para integrar no Lovable utilize:

Método

GET

Endpoint

https://sua-api.com/placa/{placa}

Parâmetro

Nome	Tipo	Exemplo

placa	string	ABC1234


Campos disponíveis

veiculo.marca
veiculo.modelo
veiculo.ano
veiculo.cor
veiculo.chassi
veiculo.motorizacao


---

⚠️ Observações

A API depende de serviços externos para consulta.

Os dados retornados podem variar dependendo da fonte utilizada.

Recomenda-se implementar cache para reduzir consultas repetidas.



---

📜 Licença

MIT License
