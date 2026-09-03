// Cliente Supabase do site — mesmo projeto do app (fbnfgpnjlrxufcwooojw),
// só pra gravar mensagens do formulário "Fale Conosco" (tabela
// contact_messages). O site não tem login nem lê nenhum dado do usuário; a
// anon key é pública por natureza (protegida por RLS no banco), então é
// seguro ela ir pro bundle do site.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function submitContactMessage({ name, email, message }) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message, source: 'site' })
  if (error) throw error
}

// Lista de espera do Google Play/App Store (redesign 1h, seção Instalar) —
// mesma tabela do formulário "Fale Conosco" (sem tabela nova pra isso).
// `source` tem CHECK constraint só aceitando 'app'/'site' (ver
// 0014_contact_messages.sql no repo do app) — por isso o texto fixo em
// `name`/`message` é o que diferencia um cadastro de lista de espera de
// uma mensagem de contato de verdade, não uma coluna própria.
export async function submitWaitlistSignup({ email }) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name: '[Lista de espera Play/App Store]', email, message: 'Quer ser avisado(a) quando o app nativo (Google Play / App Store) estiver disponível.', source: 'site' })
  if (error) throw error
}
