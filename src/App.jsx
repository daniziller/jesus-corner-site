import { useState, useEffect } from 'react'
import {
  BookOpen, HandHeart, Compass, BarChart3, Award, Globe, GraduationCap, Users, User,
  ArrowRight, Check, Smartphone, ChevronRight, ArrowLeft, Flame, PenLine, CheckCircle2,
  Menu, X,
} from 'lucide-react'

// A versão de lucide-react instalada (1.23.0) não inclui o ícone do
// Instagram — desenhado à mão no mesmo estilo (traço, sem preenchimento)
// dos demais, pra ficar visualmente idêntico aos ícones do Lucide.
function InstagramIcon({ size = 18, color = 'currentColor', ...props }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
import { content } from './content'
import { privacyContent } from './privacyContent'
import { termsContent } from './termsContent'
import { detectLanguageFromIp } from './langDetect'
import { submitContactMessage } from './lib/supabaseClient'

const APP_URL = 'https://app.jesuscorner.app'
const ICONS = { BookOpen, HandHeart, Compass, BarChart3, Award, Globe, GraduationCap, Users, User, Flame, PenLine }
const LANG_KEY = 'jc_site_lang'

// O app (outro domínio, outro localStorage) linka pras páginas legais com
// ?lang=pt|en pra abrir no mesmo idioma da conta — sem isso não teria como
// o site saber em que idioma o app estava. Tratamos como escolha explícita,
// no mesmo nível do toggle manual (vence a detecção por IP, e persiste pro
// resto da navegação no site).
const queryLang = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('lang') : null
const isValidLang = (l) => l === 'pt' || l === 'en'

// initialPath: só usado pelo script de pré-renderização (scripts/prerender.mjs),
// que roda o mesmo componente várias vezes no mesmo processo Node — sem
// window disponível ali, precisa injetar a rota de fora em vez de ler de
// window.location. No navegador normal, o parâmetro nunca é passado e cai
// no window.location de sempre.
export default function App({ initialPath } = {}) {
  const currentPath = initialPath ?? (typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '')
  const isPrivacyPath = currentPath === '/privacidade'
  const isTermsPath = currentPath === '/termos'
  const isInstallPath = currentPath === '/instalar'

  const [lang, setLangState] = useState(() => {
    if (isValidLang(queryLang)) return queryLang
    if (typeof localStorage === 'undefined') return 'pt'
    return localStorage.getItem(LANG_KEY) ?? 'pt'
  })

  // Só detecta por IP se a pessoa nunca escolheu um idioma manualmente
  // aqui no site — uma escolha explícita (o toggle PT/EN, ou um ?lang= vindo
  // do app) sempre vence.
  useEffect(() => {
    if (isValidLang(queryLang)) {
      localStorage.setItem(LANG_KEY, queryLang)
      return
    }
    if (localStorage.getItem(LANG_KEY)) return
    detectLanguageFromIp().then(detected => {
      if (detected && !localStorage.getItem(LANG_KEY)) setLangState(detected)
    })
  }, [])

  // Escolha manual pelo toggle — grava a preferência, pra nunca mais ser
  // sobrescrita pela detecção por IP (inclusive em visitas futuras).
  function setLang(l) {
    localStorage.setItem(LANG_KEY, l)
    setLangState(l)
  }

  const t = content[lang]

  if (isPrivacyPath || isTermsPath) {
    const legalContent = isPrivacyPath ? privacyContent : termsContent
    return (
      <div className="page">
        <Nav lang={lang} setLang={setLang} t={t} />
        <LegalPage lang={lang} content={legalContent} />
        <Footer t={t} />
      </div>
    )
  }

  if (isInstallPath) {
    return (
      <div className="page">
        <Nav lang={lang} setLang={setLang} t={t} />
        <InstallGuide t={t} lang={lang} />
        <Footer t={t} />
      </div>
    )
  }

  return (
    <div className="page">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Purpose t={t} />
      <AboutName t={t} />
      <Showcase t={t} lang={lang} />
      <Features t={t} />
      <Pricing t={t} />
      <Download t={t} />
      <Faq t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  )
}

function LegalPage({ lang, content }) {
  const p = content[lang]
  return (
    <section className="legal">
      <div className="legal-inner">
        <a href="/" className="legal-back"><ArrowLeft size={16} /> {lang === 'en' ? 'Back to home' : 'Voltar pro início'}</a>
        <h1>{p.title}</h1>
        <p className="legal-updated">{p.updated}</p>
        <p className="legal-intro">{p.intro}</p>
        {p.sections.map((s, i) => (
          <div key={i} className="legal-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Tutorial de "adicionar à tela inicial" — pra quem clica no card "Web App"
// da seção de Download em vez de ir direto pro app, já que instalar um PWA
// não é um fluxo óbvio pra quem nunca fez isso. Mostra as duas plataformas
// sempre (sem detectar o aparelho), pra funcionar igual pra quem compartilha
// o link com alguém de outro sistema.
function InstallGuide({ t, lang }) {
  return (
    <section className="legal">
      <div className="legal-inner">
        <a href="/" className="legal-back"><ArrowLeft size={16} /> {lang === 'en' ? 'Back to home' : 'Voltar pro início'}</a>
        <h1>{t.installTitle}</h1>
        <p className="legal-intro">{t.installSubtitle}</p>

        <div className="install-section">
          <h2>{t.installIosTitle}</h2>
          <ol className="install-steps">
            {t.installIosSteps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>

        <div className="install-section">
          <h2>{t.installAndroidTitle}</h2>
          <ol className="install-steps">
            {t.installAndroidSteps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>

        <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg install-cta">
          {t.installCta}
        </a>
      </div>
    </section>
  )
}

function Nav({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Fecha o menu ao trocar de idioma ou ao navegar por um link — sem isso
  // ficaria aberto cobrindo a seção que a pessoa acabou de escolher.
  function closeMenu() { setMenuOpen(false) }

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="/#top" className="brand">
          <img src="/icon-192.png" alt="" className="brand-icon" />
          <span>Jesus' Corner</span>
        </a>
        <nav className="nav-links">
          <a href="/#features">{t.navFeatures}</a>
          <a href="/#pricing">{t.navPricing}</a>
          <a href="/#faq">{t.navFaq}</a>
          <a href="/#contact">{t.navContact}</a>
        </nav>
        <div className="nav-actions">
          <a
            href="https://www.instagram.com/jesuscorner.app/"
            target="_blank" rel="noreferrer"
            className="nav-instagram-link"
            aria-label={t.footerInstagramLabel}
          >
            <InstagramIcon size={18} />
          </a>
          {/* Alterna idioma — mostra as duas opções lado a lado (em vez de só
              a atual) pra deixar claro que dá pra trocar, não é só um rótulo. */}
          <div className="lang-toggle" role="group" aria-label="Idioma / Language">
            <button
              className={`lang-option ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => setLang('pt')}
              aria-pressed={lang === 'pt'}
            >
              🇧🇷 PT
            </button>
            <button
              className={`lang-option ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              🇺🇸 EN
            </button>
          </div>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            {t.navCta}
          </a>
          {/* Só aparece em telas ≤860px (ver CSS) — abaixo desse ponto
              .nav-links vira display:none, então esse é o único jeito de
              chegar nas seções sem rolar a página inteira. */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? t.navCloseMenu : t.navOpenMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="nav-mobile-menu">
          <a href="/#features" onClick={closeMenu}>{t.navFeatures}</a>
          <a href="/#pricing" onClick={closeMenu}>{t.navPricing}</a>
          <a href="/#faq" onClick={closeMenu}>{t.navFaq}</a>
          <a href="/#contact" onClick={closeMenu}>{t.navContact}</a>
        </nav>
      )}
    </header>
  )
}

function Hero({ t, lang }) {
  return (
    <section id="top" className="hero">
      <div className="hero-glow" />
      <BookGlow variant="hero" />
      <div className="hero-text">
        <span className="badge">{t.heroBadge}</span>
        <h1>{t.heroTitle}</h1>
        <p className="hero-sub">{t.heroSubtitle}</p>
        <div className="hero-ctas">
          <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
            {t.heroCtaPrimary} <ArrowRight size={18} />
          </a>
          <a href="#features" className="btn btn-ghost btn-lg">{t.heroCtaSecondary}</a>
        </div>
        <p className="hero-note">{t.heroNote}</p>
      </div>
      <div className="hero-visual">
        {/* A tela de leitura é a imagem mais forte do app hoje (texto largo,
            legível, com o capítulo em destaque) — vira o rosto do Hero em
            vez de um screenshot genérico da Home. */}
        <Phone src={screenshotSrc('leitura', lang)} alt={t.mockSessionLabel} tilt="left" lg />
      </div>
    </section>
  )
}

// Os screenshots são capturados direto do app rodando em cada idioma (não
// são traduzidos via CSS/overlay) — por isso o sufixo de arquivo, em vez de
// depender de uma imagem só e confiar em alt text.
function screenshotSrc(name, lang) {
  return `/screenshot-${name}${lang === 'en' ? '-en' : ''}.png`
}

// Motivo ilustrado (só CSS, sem depender de fotos de banco que não temos
// como buscar): um brilho quente + "páginas" abertas em leque, evocando um
// livro aberto com luz — pano de fundo decorativo atrás do Hero, e versão
// mais discreta como divisor antes do Showcase. Puramente decorativo
// (aria-hidden) e com um brilho sutil que respeita prefers-reduced-motion
// (ver index.css).
function BookGlow({ variant = 'hero' }) {
  return (
    <div className={`book-glow book-glow-${variant}`} aria-hidden="true">
      <div className="book-glow-orb" />
      <div className="book-glow-rays">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="book-glow-ray" style={{ '--i': i }} />
        ))}
      </div>
      <div className="book-glow-pages">
        <span className="book-glow-page page-1" />
        <span className="book-glow-page page-2" />
        <span className="book-glow-page page-3" />
      </div>
    </div>
  )
}

function Phone({ src, alt, small, lg, tilt = 'left' }) {
  return (
    <div className={`phone tilt-${tilt} ${small ? 'phone-sm' : ''} ${lg ? 'phone-lg' : ''}`}>
      <div className="phone-glow" />
      <div className="phone-shadow" />
      <img src={src} alt={alt} className="phone-screenshot" />
    </div>
  )
}

// Botão de registro reaproveitado depois de várias seções — pra manter o
// caminho de cadastro sempre à mão conforme a pessoa rola a página, em vez
// de só no Hero e na Pricing lá embaixo.
function SectionCta({ text, cta }) {
  return (
    <div className="section-cta">
      <p className="section-cta-text">{text}</p>
      <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">
        {cta} <ArrowRight size={18} />
      </a>
    </div>
  )
}

function Purpose({ t }) {
  return (
    <section className="purpose">
      <div className="purpose-card">
        <span className="eyebrow">{t.purposeEyebrow}</span>
        <h2 className="purpose-title">{t.purposeTitle}</h2>
        <p className="purpose-subtitle">{t.purposeSubtitle}</p>
        <p className="purpose-body">{t.purposeBody}</p>
      </div>
      <SectionCta text={t.ctaPurposeText} cta={t.ctaPurposeBtn} />
    </section>
  )
}

function AboutName({ t }) {
  return (
    <section className="about-name">
      <div className="about-name-card">
        <span className="eyebrow">{t.aboutNameEyebrow}</span>
        <h2>{t.aboutNameTitle}</h2>
        <blockquote>"{t.aboutNameVerseText}"</blockquote>
        <p className="about-name-ref">{t.aboutNameVerseRef}</p>
        <p className="about-name-body">{t.aboutNameBody}</p>
      </div>
      <SectionCta text={t.ctaAboutNameText} cta={t.ctaAboutNameBtn} />
    </section>
  )
}

function Showcase({ t, lang }) {
  return (
    <section className="showcase">
      <BookGlow variant="divider" />
      <span className="eyebrow">{t.showcaseEyebrow}</span>
      {t.showcase.map((item, i) => {
        // O tracker de progresso ganha um tratamento visual à parte (cartão
        // com fundo/borda em degradê) pra se destacar das outras 2 linhas,
        // que ficam só com texto + telefone soltos no fundo escuro.
        const isHighlight = item.image === 'progresso'
        return (
          <div key={i} className={`showcase-row ${i % 2 === 1 ? 'reverse' : ''} ${isHighlight ? 'showcase-row-highlight' : ''}`}>
            <div className="showcase-text">
              {isHighlight && (
                <span className="showcase-highlight-tag">
                  <BarChart3 size={12} /> {t.showcaseFeaturedTag}
                </span>
              )}
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="showcase-visual">
              <Phone src={screenshotSrc(item.image, lang)} alt={item.title} small tilt={i % 2 === 1 ? 'right' : 'left'} />
            </div>
          </div>
        )
      })}
      <SectionCta text={t.ctaShowcaseText} cta={t.ctaShowcaseBtn} />
    </section>
  )
}

function Features({ t }) {
  return (
    <section id="features" className="section">
      <h2>{t.featuresTitle}</h2>
      <p className="section-sub">{t.featuresSubtitle}</p>
      <div className="features-grid">
        {t.features.map((f, i) => {
          const Icon = ICONS[f.icon]
          return (
            <div key={i} className="feature-card">
              <div className="feature-icon"><Icon size={22} color="#F97316" /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          )
        })}
      </div>
      <SectionCta text={t.ctaFeaturesText} cta={t.ctaFeaturesBtn} />
    </section>
  )
}

function Pricing({ t }) {
  return (
    <section id="pricing" className="section section-alt">
      <h2>{t.pricingTitle}</h2>
      <p className="section-sub">{t.pricingSubtitle}</p>
      <div className="pricing-single">
        <div className="pricing-card pricing-premium">
          <p className="pricing-body">{t.pricingBody}</p>
          <ul>
            {t.pricingMemberItems.map((item, i) => (
              <li key={i}><Check size={16} color="var(--or-lt)" /> {item}</li>
            ))}
          </ul>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg">{t.pricingCta}</a>
        </div>
      </div>
    </section>
  )
}

function Download({ t }) {
  const items = [
    // Leva pro tutorial de instalação (mesma aba), não direto pro app —
    // "adicionar à tela inicial" não é um fluxo óbvio pra quem nunca
    // instalou um PWA antes (ver InstallGuide).
    { title: t.downloadWebTitle, desc: t.downloadWebDesc, href: '/instalar', live: true, external: false },
    { title: t.downloadPlayTitle, desc: t.comingSoon, href: null, live: false },
    { title: t.downloadAppleTitle, desc: t.comingSoon, href: null, live: false },
  ]
  return (
    <section className="section">
      <h2>{t.downloadTitle}</h2>
      <p className="section-sub">{t.downloadSubtitle}</p>
      <div className="download-grid">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href ?? undefined}
            target={item.href && item.external !== false ? '_blank' : undefined}
            rel={item.href && item.external !== false ? 'noreferrer' : undefined}
            className={`download-card ${item.live ? '' : 'download-disabled'}`}
            onClick={e => { if (!item.href) e.preventDefault() }}
          >
            <Smartphone size={22} color={item.live ? '#F97316' : '#71717A'} />
            <div>
              <p className="download-title">{item.title}</p>
              <p className="download-desc">{item.desc}</p>
            </div>
            {item.live && <ChevronRight size={18} color="#71717A" />}
          </a>
        ))}
      </div>
    </section>
  )
}

function Faq({ t }) {
  return (
    <section id="faq" className="section section-alt">
      <h2>{t.faqTitle}</h2>
      <div className="faq-list">
        {t.faq.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <SectionCta text={t.ctaFaqText} cta={t.ctaFaqBtn} />
    </section>
  )
}

function Contact({ t }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t.contactRequiredError)
      return
    }
    setSending(true)
    setError('')
    try {
      await submitContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() })
      setSent(true)
      setMessage('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section">
      <h2>{t.contactTitle}</h2>
      <p className="section-sub">{t.contactSubtitle}</p>
      {sent ? (
        <div className="contact-success">
          <CheckCircle2 size={38} color="#22C55E" />
          <h3>{t.contactSuccessTitle}</h3>
          <p>{t.contactSuccessSub}</p>
          <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>{t.contactSendAnother}</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-name">{t.contactNameLabel}</label>
            <input id="contact-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.contactNamePlaceholder} />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">{t.contactEmailLabel}</label>
            <input id="contact-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.contactEmailPlaceholder} />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">{t.contactMessageLabel}</label>
            <textarea id="contact-message" rows={6} value={message} onChange={e => setMessage(e.target.value)} placeholder={t.contactMessagePlaceholder} />
          </div>
          {error && <p className="contact-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
            {sending ? t.contactSending : t.contactSubmitBtn}
          </button>
        </form>
      )}
    </section>
  )
}

function Footer({ t }) {
  return (
    <footer className="footer">
      <img src="/icon-192.png" alt="" className="footer-icon" />
      <p className="footer-tagline">{t.footerTagline}</p>
      <a
        href="https://www.instagram.com/jesuscorner.app/"
        target="_blank" rel="noreferrer"
        className="footer-instagram-link"
        aria-label={t.footerInstagramLabel}
      >
        <InstagramIcon size={20} />
      </a>
      <div className="footer-legal-links">
        <a href="/privacidade" className="footer-privacy-link">{t.footerPrivacyLink}</a>
        <span className="footer-legal-dot">·</span>
        <a href="/termos" className="footer-privacy-link">{t.footerTermsLink}</a>
      </div>
      <p className="footer-rights">Jesus' Corner © {new Date().getFullYear()} · {t.footerRights}</p>
    </footer>
  )
}
