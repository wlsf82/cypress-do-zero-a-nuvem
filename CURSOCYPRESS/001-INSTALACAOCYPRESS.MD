# Capítulo 1 – Iniciando com Cypress

## 1.1 Requisitos para utilizar o Cypress

Antes de instalar o Cypress, é necessário garantir que alguns pré-requisitos estejam presentes no seu ambiente de desenvolvimento:

✅ **Requisitos mínimos:**
- Node.js (versão recomendada: LTS mais recente)
- npm (vem junto com o Node.js)
- Editor de código (Visual Studio Code é o mais usado)
- Terminal de comandos (ex: Terminal do VS Code, CMD, PowerShell, ou Git Bash)

## 1.2 Instalação do Node.js

### Passo a passo:
1. Acesse o site oficial: [Node.js](https://nodejs.org)
2. Baixe a versão **LTS (Long Term Support)**, que é mais estável.
3. Execute o instalador e siga as instruções padrão.

Para confirmar que a instalação foi concluída com sucesso, use os comandos:

```bash
node -v
```
## 1.3 Instalando o Cypress

Com o Node.js e o npm já instalados, execute o seguinte comando na raiz do seu projeto para instalar o Cypress:

```bash
npm install cypress@13.12.0 --save-dev
```
### Explicação dos componentes do comando:
- `npm install`: Comando para instalar pacotes.
- `cypress@13.12.0`: Define a versão específica do Cypress.
- `--save-dev`: Indica que é uma dependência de desenvolvimento.
- **Alternativa abreviada:** `-D`

**Boas práticas:** Fixar a versão do Cypress evita que atualizações inesperadas causem incompatibilidades.

## 1.4 Abrindo o Cypress

Após a instalação, abra a interface gráfica com:

```bash
npx cypress open
```
Esse comando irá:
- Iniciar o **Cypress Test Runner** (interface visual).
- Criar a estrutura padrão no projeto (pastas como `cypress/` e `e2e/`).
- Ajudar na criação da primeira suíte de testes **end-to-end**.

**Dica para iniciantes:** Use essa interface nas primeiras execuções para se familiarizar com o funcionamento do Cypress.

# Capítulo 2 – Configurando o Cypress pela primeira vez

## 2.1 Escolhendo o tipo de teste

Ao abrir o Cypress pela primeira vez, você verá a seguinte tela. Você deve escolher entre dois tipos de testes:

### E2E Testing (End-to-End)
Essa é a opção mais usada para automação de testes funcionais.

**Descrição:**
- Permite simular o comportamento do usuário em um navegador real.
- Testa o fluxo completo de uma aplicação web (ex: login → navegação → checkout).
- Ideal para validar a aplicação como um todo, do início ao fim.

**O que acontece ao escolher essa opção:**
- O Cypress criará uma estrutura de diretórios (`cypress/e2e`, `cypress/support`, `cypress/fixtures`) e um arquivo de configuração (`cypress.config.js` ou `.ts`).
- Você poderá começar a escrever seus testes E2E logo em seguida.

### Component Testing
Mais indicado para desenvolvedores que usam frameworks como React, Vue ou Angular.

**Descrição:**
- Permite testar componentes de forma isolada, fora do fluxo completo da aplicação.
- Ideal para garantir que cada parte visual (botões, inputs, cards, etc.) esteja funcionando corretamente individualmente.

**Requisitos extras:**
- Essa opção geralmente precisa de integração com o framework usado na sua aplicação.
- Requer configuração adicional com ferramentas como Webpack ou Vite.

# Capítulo 3 – Arquivos de Configuração Criados pelo Cypress

Após selecionar o tipo de teste E2E, o Cypress exibe a seguinte tela:  
Esses são os arquivos gerados automaticamente:

## 🔹 cypress.config.js
**Descrição:** Arquivo principal de configuração do Cypress.  

**Função:** Define opções globais como `baseUrl`, `timeout`, diretórios, etc.  

**Exemplo de uso:**
```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000"
  },
});
```
## 🔹 cypress/support/e2e.js
**Descrição:** Arquivo de suporte que é executado antes de cada teste E2E.  

**Função:** Ideal para importar comandos personalizados ou configurar plugins/globais.  

**Exemplo:** Aqui você pode adicionar:
```js
import './commands';
```
## 🔹 cypress/support/commands.js
**Descrição:** Arquivo destinado a comandos personalizados do Cypress.  

**Função:** Permite criar comandos reutilizáveis para testes.  

**Exemplo:**
```js
Cypress.Commands.add('login', (email, senha) => {
  cy.get('#email').type(email);
  cy.get('#password').type(senha);
  cy.get('#submit').click();
});
```
## 🔹 cypress/fixtures/example.json
**Descrição:** Exemplo de arquivo fixture, usado para simular dados.  

**Função:** Fornece dados estáticos que podem ser usados nos testes.  

**Exemplo de uso em teste:**
```js
cy.fixture('example').then((data) => {
  cy.get('input[name="nome"]').type(data.nome);
});
```
Esses arquivos já oferecem uma estrutura básica para começar a criar seus testes.  

# Capítulo 4 – Escolhendo o Navegador para Testes E2E

Após a configuração inicial, o Cypress exibe a tela abaixo para que você escolha o navegador em que os testes serão executados:

## ✅ O que essa tela exibe?
O Cypress detecta automaticamente os navegadores instalados na sua máquina e apresenta as opções disponíveis. No exemplo acima, temos:

- **Chrome** (v136)
- **Edge** (v136)
- **Electron** (v118) – navegador interno do próprio Cypress
- **Firefox** (v135)

## ✅ O que fazer?
1. **Selecione o navegador** desejado.
2. **Clique em** `Start E2E Testing in [nome do navegador]`.

No exemplo, o botão é `Start E2E Testing in Chrome`.

## 💡 Dica:
O navegador **Electron** é útil para testes rápidos, mas para resultados mais reais, **Chrome, Edge ou Firefox** são recomendados, pois simulam melhor o ambiente do usuário final.

# Capítulo 5 – Criando o Primeiro Teste (Spec)

Após escolher o navegador, o Cypress abrirá a seguinte tela:

## ✅ O que essa tela significa?
Aqui, o Cypress reconhece que ainda não há arquivos de teste criados no projeto e oferece duas opções:

### 📦 Scaffold example specs
- Gera vários arquivos de exemplo.
- É útil para conhecer a estrutura dos testes Cypress e entender boas práticas.

### 📄 Create new spec
- Cria um novo arquivo de teste vazio.
- Ideal para começar do zero testando sua própria aplicação.

## 🔍 Observação importante:
A mensagem abaixo dos botões informa que, se você já tiver arquivos de teste e eles não aparecerem, pode ser necessário ajustar o padrão de localização dos arquivos (**spec pattern**).

# Arquivos de Configuração do Cypress criado dentro da pasta dos testes após clicar em new spec.

## 1. cypress.config.js
Este é o arquivo de configuração principal do Cypress.

Define o comportamento do Cypress durante os testes.

Pode conter:
- Diretórios onde ficam os testes.
- Resoluções de tela.
- Padrões de arquivos (specPattern).
- Timeout padrão, entre outros.

É altamente customizável e usado para adaptar o Cypress à estrutura do seu projeto.

📌 **Exemplo de uso**:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
```
## 📦 2. package.json

Este arquivo é o coração do seu projeto Node.js.

Armazena:
- Nome e versão do projeto.
- Scripts disponíveis (como test ou cypress open).
- Dependências instaladas, como o Cypress.

Permite rodar comandos como:

```bash
npm run cypress:open
```
 Exemplo de conteúdo:
```bash
{
  "name": "projeto-cypress",
  "version": "1.0.0",
  "scripts": {
    "cypress:open": "cypress open"
  },
  "dependencies": {
    "cypress": "^13.12.0"
  }
}
```
## 3. package-lock.json

Arquivo gerado automaticamente quando você instala pacotes com npm.

Garante que as mesmas versões exatas das dependências sejam instaladas por todos que usam o projeto.

Ajuda a evitar conflitos de versão e manter o ambiente de testes estável.

📌 **Observação**: Você não edita esse arquivo manualmente. Ele é gerado e atualizado pelo npm.

---

## ✅ Resumo

| Arquivo                  | Função Principal                                         |
|--------------------------|----------------------------------------------------------|
| cypress.config.js         | Configura o comportamento do Cypress.                    |
| package.json              | Gerencia scripts e dependências do projeto.              |
| package-lock.json         | Garante instalação consistente das dependências.         |

---

# Capítulo 6 – Visão Geral da Tela: Interface Principal do Cypress
A imagem mostra a interface do Cypress logo após a escolha do navegador, onde podemos:
- Criar arquivos de teste (**specs**),
- Acompanhar execuções,
- Depurar erros,
- Ajustar configurações do projeto.

### 🔍 Lado Esquerdo (Menu de Navegação)
#### 📁 Specs
- Onde ficam listados os arquivos de teste (**specs**).
- Aqui você pode criar, visualizar e executar testes.
- É a aba padrão ao abrir o Cypress.

#### ▶️ Runs
- Lista as execuções dos testes.
- Se você integrar com o **Cypress Dashboard** (plano pago), verá o histórico de execuções nesta aba.

#### 🐞 Debug
- Usado para depuração de testes.
- Permite inspecionar comportamentos durante o teste, útil para identificar falhas.

#### ⚙️ Settings
- Área para configurar o projeto.
- Permite definir diretórios, padrões de arquivos de testes, variáveis de ambiente, entre outros.

---

## 📄 Área Central (Conteúdo Principal)
### **Título:** *Create your first spec*
- O Cypress detectou que não existem arquivos de teste no projeto ainda.
- Ele recomenda criar **specs de exemplo** ou **um novo do zero**.

#### Duas opções principais:
**📦 Scaffold example specs**
- Cria automaticamente vários arquivos com exemplos de testes Cypress.
- Ideal para iniciantes aprenderem pela prática.

**📄 Create new spec**
- Gera um arquivo de teste em branco.
- Recomendado para quem já sabe o que vai testar e quer começar do zero.

### ⚠️ Mensagem informativa
*"If you feel that you're seeing this screen in error..."*
- Se você já tem arquivos de testes e nada aparece, provavelmente o Cypress não está encontrando os arquivos porque o padrão de busca (**spec pattern**) precisa ser ajustado.
- Você pode clicar no botão **"View spec pattern"** para ver ou editar esse padrão.

---

## 🔝 Parte Superior Direita
- **Versão do Cypress:** Aqui vemos que é a `v13.12.0`.
- **Navegador ativo:** Está usando `Electron v118` neste exemplo.
- **Docs:** Acesso rápido à documentação oficial do Cypress.
- **Log in:** Permite se conectar ao **Cypress Dashboard**.

