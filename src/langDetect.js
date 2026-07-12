// Idioma padrão por geolocalização: português no Brasil, inglês em
// qualquer outro lugar — só usado quando o visitante ainda não escolheu um
// idioma manualmente (ver localStorage 'jc_site_lang' em App.jsx). Nunca
// sobrescreve uma escolha já feita.
const TIMEOUT_MS = 2500

export async function detectLanguageFromIp() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('/api/geo', { signal: controller.signal })
    if (!res.ok) return null
    const { country } = await res.json()
    if (!country) return null
    return country === 'BR' ? 'pt' : 'en'
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
