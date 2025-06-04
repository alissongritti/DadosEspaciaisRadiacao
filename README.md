# Visualização de Dados Espaciais de Irradiação Solar

![image](https://github.com/user-attachments/assets/63018fe4-d479-403b-88b2-7e490c096686)

Aplicação web para visualização interativa de dados de irradiação solar em cidades brasileiras, desenvolvida como parte da disciplina de Desenvolvimento Web II.

## 📋 Sumário

- [Objetivos do Projeto](#-objetivos-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação e Execução](#-instalação-e-execução)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Estrutura da API](#-estrutura-da-api)
- [Componentes Principais](#-componentes-principais)
- [Licença](#-licença)

## 🎯 Objetivos do Projeto

- Consumir dados espaciais de irradiação solar
- Visualizar dados em mapa interativo
- Implementar gerenciamento de estado com React Context
- Estilizar componentes com Styled Components

## ✨ Funcionalidades

✔ Listagem de todas as cidades brasileiras disponíveis  
✔ Visualização do mapa do Brasil com zoom inicial  
✔ Seleção de cidade para exibir dados detalhados  
✔ Exibição de marcador e polígono no mapa  
✔ Gráfico mensal de irradiação solar  

## 🛠 Tecnologias Utilizadas

**Backend:**
- Node.js
- Express
- PostgreSQL + PostGIS
- TypeScript

**Frontend:**
- React 18
- TypeScript
- Leaflet (mapas interativos)
- Styled Components
- Axios (requisições HTTP)
- Vite (build tool)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+
- PostgreSQL 12+ com PostGIS
- Yarn ou npm

### Backend

1. Configure o banco de dados:
createdb irradiacao_solar
psql irradiacao_solar < backend/data/comandos.sql


2. Instale as dependências:
cd backend
npm install

3. Configure o ambiente:
.env Edite o .env com suas credenciais

4. Inicie o servidor:
npm run dev

### Frontend

1. Instale as dependências:
cd frontend
npm install

2. Inicie a aplicação:
npm run dev

Acesse: http://localhost:5173

🌐 Estrutura da API
Endpoint	Método	Descrição
/cidade	GET	Lista todas as cidades
/cidade/:id	GET	Dados de irradiação para uma cidade

🧩 Componentes Principais
CityList: Lista interativa de cidades
RadiationMap: Mapa Leaflet com marcadores
CityDetails: Tabela de dados mensais
RadiationContext: Gerenciamento de estado global
