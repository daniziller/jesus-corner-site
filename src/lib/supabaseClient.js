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
