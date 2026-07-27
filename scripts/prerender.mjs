// Roda depois do `vite build` (ver "postbuild" no package.json) — gera HTML
// já pronto pra cada rota, direto no Node via ReactDOMServer, sem precisar
// de navegador nenhum durante o build (mais simples e confiável que rodar
// Playwright dentro do ambiente de build da Vercel, que costuma faltar
// bibliotecas de sistema que o Chromium precisa).
//
// Por quê: o site é uma SPA pura (só JS) — o Google consegue indexar assim
// mesmo, mas robôs mais simples (preview de link do WhatsApp/Twitter,
// alguns buscadores menores) não executam JavaScript e veem a página
// vazia. Com o HTML já pronto no primeiro carregamento, isso deixa de ser
// problema, e a pessoa ainda vê conteúdo mais rápido (o React só re-monta
// por cima depois, não é hidratação de verdade — troca sem CSS por baixo,
// pra evitar mismatch entre o idioma "cru" (sempre PT aqui) e o idioma
// real detectado no navegador).
import { createServer } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const ROUTES = [
  {
    path: '/',
    outFile: 'index.html',
    title: "Jesus' Corner — Seu tempo. Sua rotina. Sua conexão com Deus.",
    description: "Jesus' Corner — a história de amor mais bonita já contada, disponível pra todo mundo. Leitura bíblica estruturada, oração guiada e acompanhamento de progresso, com contribuição de valor livre.",
  },
  {
    path: '/instalar',
    outFile: 'instalar/index.html',
    title: "Instale no seu celular — Jesus' Corner",
    description: 'Sem loja de aplicativos, sem espaço extra no celular — funciona direto do navegador, com ícone na tela inicial como qualquer outro app. Veja o passo a passo pra iPhone e Android.',
  },
  {
    path: '/privacidade',
    outFile: 'privacidade/index.html',
    title: "Política de Privacidade — Jesus' Corner",
    description: "Esta política explica quais dados o Jesus' Corner coleta, como eles são usados e guardados, e quais são os seus direitos. Em linguagem simples, sem juridiquês desnecessário.",
  },
  {
    path: '/termos',
    outFile: 'termos/index.html',
    title: "Termos de Uso — Jesus' Corner",
    description: "Estes termos explicam as regras pra usar o Jesus' Corner, em linguagem simples, sem juridiquês desnecessário.",
  },
]

function injectRoute(template, route) {
  let html = template
  const canonical = `https://jesuscorner.app${route.path === '/' ? '/' : route.path}`

  html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
  html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${route.description}" />`)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${canonical}" />`)
  html = html.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${route.title}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${route.description}" />`)
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${route.title}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${route.description}" />`)

  return html
}

async function main() {
  const template = readFileSync(path.join(distDir, 'index.html'), 'utf-8')

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

  for (const route of ROUTES) {
    const appHtml = render(route.path)
    const finalHtml = injectRoute(template, route).replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    )
    const outPath = path.join(distDir, route.outFile)
    mkdirSync(path.dirname(outPath), { recursive: true })
    writeFileSync(outPath, finalHtml)
    console.log('prerendered', route.path, '->', route.outFile)
  }

  await vite.close()
}

main().catch(err => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
