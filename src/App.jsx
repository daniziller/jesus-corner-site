import { useState, useEffect } from 'react'
import {
  BookOpen, HandHeart, Compass, BarChart3, Award, Globe, GraduationCap, Users, User,
  ArrowRight, Check, Smartphone, ChevronRight, ArrowLeft, Flame, PenLine, CheckCircle2,
  Menu, X, Hourglass, Sparkles, Highlighter, StickyNote, HelpCircle, Mail, Share2,
  Headphones, Route,
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
import { submitContactMessage, submitWaitlistSignup } from './lib/supabaseClient'

const APP_URL = 'https://app.jesuscorner.app'
const ICONS = { BookOpen, HandHeart, Compass, BarChart3, Award, Globe, GraduationCap, Users, User, Flame, PenLine, Hourglass, Sparkles, Highlighter, StickyNote, HelpCircle, Mail, Share2, Headphones, Route }
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

  // Redesign 1h — nova ordem: Hero → Como funciona (nova) → Telas → Recursos
  // → Preço → Instalar → Por que fiz o app → Perguntas+Contato. Só duas
  // chamadas em destaque na página inteira (Hero e Preço) — as demais viram
  // link de texto (ver SectionLink) + a barra fixa discreta abaixo, que só
  // aparece depois da primeira dobra.
  return (
    <div className="page">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <HowItWorks t={t} />
      <Showcase t={t} />
      <ReadingAssistant t={t} />
      <Features t={t} />
      <Pricing t={t} />
      <Download t={t} />
      <Why t={t} />
      <FaqAndContact t={t} />
      <Footer t={t} />
      <StickyCtaBar t={t} />
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

// Marca (README, seção "Marca") — quadrado 34px com duas "páginas" e a
// lombada, desenhada em CSS (mesmas formas/gap do BrandMark do app; aqui
// recriada do zero, é outro repo). size=default 34px (header); Footer usa
// uma versão pequena na sua própria etapa.
function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark-page left" />
      <span className="brand-mark-spine" />
      <span className="brand-mark-page right" />
    </span>
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
          <BrandMark />
          <span className="brand-name">Jesus' <span style={{ color: 'var(--or)' }}>Corner</span></span>
        </a>
        <nav className="nav-links">
          <a href="/#como">{t.navHow}</a>
          <a href="/#recursos">{t.navFeatures}</a>
          <a href="/#planos">{t.navPricing}</a>
          <a href="/#perguntas">{t.navFaq}</a>
        </nav>
        <div className="nav-actions">
          {/* Alterna idioma — mostra as duas opções lado a lado (em vez de só
              a atual) pra deixar claro que dá pra trocar, não é só um rótulo. */}
          <div className="lang-toggle" role="group" aria-label="Idioma / Language">
            <button
              className={`lang-option ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => setLang('pt')}
              aria-pressed={lang === 'pt'}
            >
              PT
            </button>
            <button
              className={`lang-option ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="nav-cta">
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
          <a href="/#como" onClick={closeMenu}>{t.navHow}</a>
          <a href="/#recursos" onClick={closeMenu}>{t.navFeatures}</a>
          <a href="/#planos" onClick={closeMenu}>{t.navPricing}</a>
          <a href="/#perguntas" onClick={closeMenu}>{t.navFaq}</a>
        </nav>
      )}
    </header>
  )
}

function Hero({ t, lang }) {
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <span className="hero-eyebrow"><span className="hero-eyebrow-dot" />{t.heroBadge}</span>
        <h1>{t.heroTitle}</h1>
        <p className="hero-sub">{t.heroSubtitle}</p>
        <div className="hero-ctas">
          <a href="/#planos" className="btn btn-primary hero-btn">{t.heroCtaPrimary}</a>
          <a href="/#como" className="btn btn-ghost hero-btn">{t.heroCtaSecondary}</a>
        </div>
        <p className="hero-note">{t.heroNote}</p>
      </div>
      <div className="hero-visual">
        {/* Tela de Leitura, não a Home — é o que a pessoa vai de fato fazer
            no app, em vez de uma tela de resumo. */}
        <Phone src={screenshotSrc('leitura', lang)} alt={t.mockSessionLabel} />
      </div>
    </section>
  )
}

// Os screenshots das telas do app ainda só existem em PT (ver README,
// "Precisa de decisão" #1) — até termos capturas em EN, as duas versões
// do site mostram a mesma imagem em vez de tentar carregar um arquivo
// "-en" que não existe.
function screenshotSrc(name) {
  return `/screenshot-${name}.png`
}

// Moldura reta (sem inclinação 3D nem brilho ao redor — ver index.css).
// small = tamanho do Showcase (250px); sem small = tamanho do Hero (274px).
function Phone({ src, alt, small }) {
  return (
    <div className={`phone ${small ? 'phone-sm' : ''}`}>
      <div className="phone-viewport">
        <img src={src} alt={alt} className="phone-screenshot" />
      </div>
    </div>
  )
}

// Link de texto reaproveitado depois de seções intermediárias — redesign
// 1h: só o Hero e a Pricing têm botão em destaque; qualquer convite no meio
// da página vira um link discreto com a frase daquela seção, não o mesmo
// botão laranja repetido (ver "barra fixa" mais abaixo pra o convite que
// persiste na rolagem).
function SectionLink({ text }) {
  return (
    <a href={APP_URL} target="_blank" rel="noreferrer" className="section-link">
      {text} <ArrowRight size={15} />
    </a>
  )
}

// Seção "Como funciona" (nova, redesign 1h) — os três passos do dia (Oração
// → Leitura → Reflexão) são a ideia central do app e não apareciam em
// lugar nenhum do site.
function HowItWorks({ t }) {
  return (
    <section id="como" className="how-it-works">
      <span className="how-eyebrow">{t.howEyebrow}</span>
      <h2>{t.howTitle}</h2>
      <p className="how-subtitle">{t.howSubtitle}</p>
      <div className="how-steps">
        {t.howSteps.map((step, i) => (
          <div className="how-step" key={i}>
            <div className="how-step-head">
              <span className="how-step-number">{i + 1}</span>
              <span className="how-step-time">{step.time}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Propósito + origem do nome, fundidos num parágrafo só em primeira pessoa
// (redesign 1h) — antes eram duas seções separadas (Purpose/AboutName),
// cada uma com seu próprio botão laranja repetido.
function Why({ t }) {
  return (
    <section className="why">
      <div className="why-card">
        <span className="eyebrow">{t.whyEyebrow}</span>
        <h2>{t.whyTitle}</h2>
        <p className="why-body">{t.whyBody}</p>
        <blockquote>"{t.whyVerseText}"</blockquote>
        <p className="why-verse-ref">{t.whyVerseRef}</p>
      </div>
      <SectionLink text={t.whyLinkText} />
    </section>
  )
}

function Showcase({ t }) {
  return (
    <section className="showcase">
      <span className="showcase-eyebrow">{t.showcaseEyebrow}</span>
      {t.showcase.map((item, i) => {
        // Só o par do meio (progresso) inverte — imagem à esquerda no
        // desktop, via `order` (ver index.css). No mobile (grid em 1
        // coluna) os dois resetam pra ordem normal do DOM: texto sempre
        // primeiro (README, "Interações e comportamento").
        const reversed = i === 1
        const hasTrailing = Boolean(item.bullets || item.link)
        return (
          <div key={i} className="showcase-row">
            <div className={`showcase-text ${reversed ? 'showcase-text-last' : ''}`}>
              <h3>{item.title}</h3>
              {item.body.map((p, j) => {
                const isLast = j === item.body.length - 1
                return <p key={j} style={{ marginBottom: isLast ? (hasTrailing ? 20 : 0) : 14 }}>{p}</p>
              })}
              {item.bullets && (
                <div className="showcase-bullets">
                  {item.bullets.map((b, j) => (
                    <div key={j} className="showcase-bullet"><span className="showcase-bullet-dot" />{b}</div>
                  ))}
                </div>
              )}
              {item.link && (
                <a href={`/#${item.link}`} className="showcase-link">{t.showcaseLinkText} <ArrowRight size={15} /></a>
              )}
            </div>
            <div className={`showcase-visual ${reversed ? 'showcase-visual-first' : ''}`}>
              <Phone src={screenshotSrc(item.image)} alt={item.alt} small />
            </div>
          </div>
        )
      })}
    </section>
  )
}

// Etapa 5 (Bento) — "Assistente de leitura", seção nova: único bloco
// escuro full-width da página inteira (fora do header/footer).
function ReadingAssistant({ t }) {
  return (
    <section className="assistant">
      <div className="assistant-block">
        <div className="assistant-head">
          <span className="assistant-mark" aria-hidden="true" />
          <span className="assistant-eyebrow">{t.assistantEyebrow}</span>
        </div>
        <h3>{t.assistantTitle}</h3>
        <p>{t.assistantBody}</p>
        <div className="assistant-chips">
          {t.assistantChips.map((chip, i) => (
            <span key={i} className={`assistant-chip ${i === 0 ? 'assistant-chip-accent' : ''}`}>{chip}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features({ t }) {
  return (
    <section id="recursos" className="section">
      <h2>{t.featuresTitle}</h2>
      <p className="section-sub">{t.featuresSubtitle}</p>
      <div className="features-grid">
        {t.features.map((f, i) => {
          const Icon = ICONS[f.icon]
          return (
            <div key={i} className="feature-card">
              <div className="feature-icon"><Icon size={22} color="var(--or)" /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          )
        })}
      </div>
      <SectionLink text={t.ctaFeaturesBtn} />
    </section>
  )
}

function Pricing({ t }) {
  return (
    <section id="planos" className="section section-alt">
      <h2>{t.pricingTitle}</h2>
      <p className="section-sub">{t.pricingSubtitle}</p>
      <div className="pricing-tiers">
        {t.pricingTiers.map((tier, i) => (
          <div className={`pricing-card pricing-tier${tier.badge ? ' pricing-tier-featured' : ''}`} key={i}>
            {tier.badge && <span className="pricing-plan-badge">{tier.badge}</span>}
            <p className="pricing-tier-name">{tier.name}</p>
            <p className="pricing-tier-price">
              {tier.price}
              {tier.per && <span className="pricing-plan-per">{tier.per}</span>}
            </p>
            <p className="pricing-tier-alt">
              {tier.priceUsd}{tier.per || ''}{tier.annual ? ` · ${tier.annual}` : ''}
            </p>
            <p className="pricing-tier-tagline">{tier.tagline}</p>
            <ul>
              {tier.items.map((item, j) => (
                <li key={j}><Check size={16} color="var(--or-lt)" /> {item}</li>
              ))}
            </ul>
            <a href={APP_URL} target="_blank" rel="noreferrer" className={`btn btn-lg ${tier.badge ? 'btn-primary' : 'btn-ghost'}`}>{tier.cta}</a>
          </div>
        ))}
      </div>
      <p className="pricing-note">{t.pricingNote}</p>
    </section>
  )
}

// Redesign 1h — só o Web App vira cartão (já disponível); Google Play e
// App Store viram uma linha só de lista de espera com campo de e-mail, em
// vez de dois cartões apagados com "em breve".
function Download({ t }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'

  async function handleWaitlist(e) {
    e.preventDefault()
    if (!email.trim() || status === 'sending') return
    setStatus('sending')
    try {
      await submitWaitlistSignup({ email: email.trim() })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section">
      <h2>{t.downloadTitle}</h2>
      <p className="section-sub">{t.downloadSubtitle}</p>
      <a href="/instalar" className="download-card">
        <Smartphone size={22} color="var(--or)" />
        <div>
          <p className="download-title">{t.downloadWebTitle}</p>
          <p className="download-desc">{t.downloadWebDesc}</p>
        </div>
        <ChevronRight size={18} color="var(--g5)" />
      </a>
      {status === 'sent' ? (
        <p className="waitlist-success">{t.waitlistSuccess}</p>
      ) : (
        <form className="waitlist-row" onSubmit={handleWaitlist}>
          <p className="waitlist-text">{t.waitlistText}</p>
          <div className="waitlist-field">
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t.waitlistPlaceholder} aria-label={t.waitlistPlaceholder}
            />
            <button type="submit" className="btn btn-ghost btn-sm" disabled={status === 'sending'}>
              {status === 'sending' ? t.waitlistSending : t.waitlistBtn}
            </button>
          </div>
          {status === 'error' && <p className="contact-error">{t.waitlistError}</p>}
        </form>
      )}
    </section>
  )
}

// Fundidos (redesign 1h) — perguntas frequentes e o formulário de contato
// eram duas seções separadas, cada uma com seu próprio título grande.
function FaqAndContact({ t }) {
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
    <section id="perguntas" className="section section-alt">
      <h2>{t.faqTitle}</h2>
      <div className="faq-list">
        {t.faq.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <div id="contato" className="faq-contact-divider">
        <h3>{t.contactTitle}</h3>
        <p className="section-sub">{t.contactSubtitle}</p>
      </div>
      {sent ? (
        <div className="contact-success">
          <CheckCircle2 size={38} color="var(--gr)" />
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

// Barra fixa discreta (redesign 1h) — aparece só depois da primeira dobra
// (passar da altura do Hero), pra manter o cadastro sempre a 1 toque sem
// repetir o botão grande do Hero a cada seção. Some de novo perto do
// rodapé, que já tem seus próprios links — não faz sentido flutuar por
// cima dele.
function StickyCtaBar({ t }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const heroHeight = document.getElementById('top')?.offsetHeight ?? 600
      const footer = document.querySelector('.footer')
      const nearFooter = footer ? window.scrollY + window.innerHeight > footer.offsetTop : false
      setVisible(window.scrollY > heroHeight && !nearFooter)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null
  return (
    <div className="sticky-cta-bar" role="complementary">
      <span className="sticky-cta-text">{t.stickyBarText}</span>
      <a href={APP_URL} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
        {t.stickyBarBtn}
      </a>
    </div>
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
