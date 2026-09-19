// Conteúdo da página "Excluir sua conta" — existe pra atender a exigência
// da Google Play de um link público (fora do app) onde a pessoa consiga
// pedir a exclusão da conta mesmo sem o app instalado. O texto só resume o
// que já está na Política de Privacidade, seção 14 — mantido separado por
// ser um requisito específico de loja, não parte do documento legal em si.

export const deleteAccountContent = {
  pt: {
    title: 'Excluir sua conta',
    updated: 'Última atualização: setembro de 2026',
    intro: 'Você pode excluir sua conta do Jesus\' Corner e todos os seus dados a qualquer momento, de duas formas — direto pelo app, ou por e-mail se preferir (ou se já tiver desinstalado o app).',
    sections: [
      {
        heading: 'Direto pelo app',
        body: 'Abra o Jesus\' Corner, vá em Perfil → Excluir conta, e confirme digitando seu e-mail. A exclusão é imediata e não pode ser desfeita: seu e-mail, senha, anotações, pedidos de oração privados, progresso de leitura e assinatura são apagados de vez do nosso banco de dados. A única exceção são comentários que você tenha postado em grupos de leitura — eles continuam visíveis para os outros membros do grupo, mas totalmente desvinculados da sua identidade.',
      },
      {
        heading: 'Por e-mail',
        body: 'Sem abrir o app (por exemplo, se já desinstalou), escreva pra info@jesuscorner.app pedindo a exclusão da sua conta, do e-mail cadastrado. Atendemos o pedido em até 15 dias, com o mesmo resultado da exclusão pelo app.',
      },
      {
        heading: 'Mais detalhes',
        body: 'Pra saber exatamente quais dados guardamos e por quanto tempo, veja a nossa Política de Privacidade, seção 14 (Seus direitos).',
      },
    ],
  },
  en: {
    title: 'Delete your account',
    updated: 'Last updated: September 2026',
    intro: 'You can delete your Jesus\' Corner account and all your data at any time, in two ways — right from the app, or by email if you\'d rather (or if you\'ve already uninstalled the app).',
    sections: [
      {
        heading: 'From the app',
        body: 'Open Jesus\' Corner, go to Profile → Delete account, and confirm by typing your email. Deletion is immediate and cannot be undone: your email, password, notes, private prayer requests, reading progress, and subscription are permanently erased from our database. The one exception is comments you posted in reading groups — they stay visible to other members, but fully unlinked from your identity.',
      },
      {
        heading: 'By email',
        body: "Without opening the app (for example, if you've already uninstalled it), write to info@jesuscorner.app asking us to delete your account, from the email address on file. We'll handle the request within 15 days, with the same result as deleting from the app.",
      },
      {
        heading: 'More details',
        body: 'To see exactly what data we store and for how long, check our Privacy Policy, section 14 (Your rights).',
      },
    ],
  },
}
