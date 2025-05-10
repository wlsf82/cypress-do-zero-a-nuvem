# Capítulo 01 - Configurando o arquivo `cypress.config.js`

O arquivo `cypress.config.js` é utilizado para configurar diversos parâmetros e opções de execução do Cypress. Esse arquivo contém configurações importantes para personalizar o comportamento dos testes, como tamanho da tela, URL base, timeout, entre outros.

No exemplo fornecido, o conteúdo do arquivo `cypress.config.js` foi modificado para a seguinte configuração:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
})
```
## O que foi alterado e o que cada configuração faz:

- **`const { defineConfig } = require('cypress')`:**

  Esse código importa a função `defineConfig` da biblioteca do Cypress. A função `defineConfig` ajuda a definir a configuração de forma mais estruturada e proporciona melhor suporte ao editor de código, como sugestões automáticas e validações.

- **`module.exports = defineConfig({ ... })`:**

  Aqui, a configuração do Cypress é exportada para o módulo, para que o Cypress consiga ler e aplicar as configurações quando os testes forem executados.

- **`viewportHeight: 880,` e `viewportWidth: 1280,`:**

  Essas configurações definem o tamanho da janela do navegador utilizado nos testes.

  - `viewportHeight` define a altura da janela (em pixels), enquanto `viewportWidth` define a largura da janela.

  - No caso, foi definido um tamanho de 1280px de largura por 880px de altura para simular a tela do navegador.

- **`e2e: {}`:**

  O bloco `e2e` é onde você pode definir configurações específicas para testes de ponta a ponta (end-to-end).

  Atualmente, está vazio, o que significa que não há configurações adicionais específicas para testes E2E nesse momento, mas você poderia adicionar opções como o diretório dos testes, a URL base, ou outros parâmetros relacionados aos testes end-to-end.

## Explicação do que foi feito:

O arquivo `cypress.config.js` foi configurado para:

- Utilizar um tamanho de janela específico durante a execução dos testes, o que ajuda a garantir que os testes sejam realizados em uma tela de dimensões específicas, garantindo maior consistência nos resultados, especialmente ao testar interfaces responsivas.
- Definir que a configuração do Cypress para testes E2E será vazia (não foi especificado nenhum valor adicional para o momento).

Essa configuração é um ponto de partida básico, e você pode adicionar mais configurações conforme necessário, dependendo das necessidades do seu projeto, como especificar um diretório de testes ou outras opções de execução.