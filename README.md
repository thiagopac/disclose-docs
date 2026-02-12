# disclose-docs

Documentação oficial do **Disclose DSL**, construída com Docusaurus.

## Stack

- Docusaurus 3
- React 18
- TypeScript

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalação

```bash
npm install
```

## Desenvolvimento local

```bash
npm run start
```

Abre o site em ambiente de desenvolvimento com hot reload.

## Build de produção

```bash
npm run build
```

Gera o site estático em `build/`.

## Servir build local

```bash
npm run serve
```

Serve localmente o conteúdo gerado em `build/`.

## Scripts disponíveis

- `npm run start`: inicia o ambiente local
- `npm run build`: gera build estático
- `npm run serve`: serve o build estático
- `npm run clear`: limpa cache do Docusaurus
- `npm run deploy`: publica no GitHub Pages

## Estrutura principal

- `docs/`: conteúdo MDX da documentação
- `src/pages/`: páginas customizadas (`/play`, `/examples`, `/demos`)
- `src/data/`: catálogo de examples/demos
- `src/components/`: componentes React reutilizáveis
- `src/css/custom.css`: estilos globais customizados
- `docusaurus.config.ts`: configuração principal do site
- `sidebars.ts`: sidebar da documentação

## URL pública

https://thiagopac.github.io/disclose-docs/

