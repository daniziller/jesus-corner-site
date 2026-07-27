// Usado só pelo script de pré-renderização (scripts/prerender.mjs), nunca
// carregado no navegador — não faz parte do bundle do cliente (main.jsx
// continua sendo o entry point de verdade). Renderiza a árvore de
// componentes pra uma string de HTML, direto no Node, sem precisar de
// navegador nenhum durante o build.
import { renderToString } from 'react-dom/server'
import App from './App'

export function render(path) {
  return renderToString(<App initialPath={path} />)
}
