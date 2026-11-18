// Conteúdo dos Termos de Uso — mesma lógica do privacyContent.js: texto legal
// mantido separado dos textos de marketing, com uma única fonte da verdade
// (o app apenas linka pra essa página do site).

export const termsContent = {
  pt: {
    title: 'Termos de Uso',
    updated: 'Última atualização: novembro de 2026',
    intro: 'Estes termos explicam as regras pra usar o Jesus\' Corner. Ao criar uma conta ou usar o app, você concorda com o que está escrito aqui. Escrevemos em linguagem simples, sem juridiquês desnecessário.',
    sections: [
      {
        heading: '1. O que é o Jesus\' Corner',
        body: 'Jesus\' Corner é um aplicativo de leitura bíblica com planos de leitura personalizáveis (Leve, Padrão, Intensivo, Livre ou por tema/cronológico, gerados por IA a partir do assunto que você escolher), oração guiada (método ACTS), reflexão guiada sobre a leitura do dia com marcações e anotações por versículo, estudos temáticos — prontos ou gerados por IA a partir de um tema —, um assistente de leitura por IA pra tirar dúvidas sobre o texto durante a leitura (a resposta sempre cita o versículo que a sustenta), um modo mãos-livres que conduz a rotina do dia por áudio e a opção de ouvir qualquer capítulo da Bíblia em voz alta, uma aba "Meu Plano" onde você liga e desliga livremente cada etapa da sua rotina (Oração, Leitura, Estudo guiado e Reflexão), uma aba de Notas com busca por palavra e por tema (IA) reunindo tudo que você escreveu, um boletim semanal opcional por e-mail e notificação com o resumo da sua semana, acompanhamento de progresso e uma Comunidade opcional (amigos, grupos de leitura e desafios em conjunto). É oferecido como um Web App (PWA) e, futuramente, como app nativo nas lojas Google Play e App Store.',
      },
      {
        heading: '2. Contas de usuário',
        body: 'Pra usar o app, você cria uma conta com nome, e-mail, idade e uma senha forte (mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial). Você é responsável por manter essas informações corretas e por não compartilhar sua senha com terceiros. O Jesus\' Corner é destinado a maiores de 18 anos — é preciso ter pelo menos 18 anos para criar uma conta, e ao se cadastrar você declara que atende a esse requisito (ver também a seção 12 da nossa Política de Privacidade). Criar uma conta já dá acesso ao plano grátis; o plano pago (Premium) é opcional e libera recursos adicionais (ver seção 3).',
      },
      {
        heading: '3. Planos e pagamento',
        body: 'O Jesus\' Corner tem um plano grátis (sem custo e sem prazo) que dá acesso à leitura da Bíblia no seu ritmo, ao áudio com a voz do aparelho, à reflexão escrita depois de cada leitura, ao versículo do dia e ao acompanhamento básico de progresso. Um plano pago, o Premium, por assinatura com preço fixo — mensal (R$27/mês; US$7/mês) ou anual (R$267/ano; US$57/ano) —, libera os demais recursos, inclusive os gerados por IA; você escolhe a moeda na tela de assinatura. O plano grátis não inclui nenhum recurso gerado por IA. No Premium, os recursos que geram texto automaticamente (perguntas sobre o texto, resumos, planos e estudos por tema) têm um limite de uso mensal por conta: ao atingi-lo, ficam indisponíveis até o início do mês seguinte (horário de Brasília), e o restante do app continua funcionando normalmente. A voz natural tem um limite diário de trechos novos por conta; ao atingi-lo, a leitura em voz alta continua com a voz do aparelho. Quem assinou um plano que não é mais oferecido continua nele, no preço contratado, até cancelar. O pagamento é processado pelo Stripe (ver nossa Política de Privacidade, seção 13) ou, no app instalado a partir da Google Play Store ou da App Store, pelo sistema de cobrança da própria loja (Google Play Billing ou Apple StoreKit). A cobrança é recorrente, renovada automaticamente até que você cancele ou troque de plano. Você pode cancelar ou trocar de plano a qualquer momento pelo app (Perfil → Minha assinatura) ou, se assinou por uma loja, pelas configurações de assinatura dessa loja; ao cancelar um plano pago, o acesso aos recursos pagos continua até o fim do período já pago (depois disso a conta volta ao plano grátis), sem reembolso proporcional pelo tempo não utilizado, salvo quando exigido por lei.',
      },
      {
        heading: '4. Conteúdo bíblico, conteúdo gerado por IA, e propriedade intelectual',
        body: 'O texto bíblico exibido no app (Nova Versão Transformadora — NVT em português e New Living Translation — NLT em inglês, licenciadas via API.Bible e Tyndale House Foundation, ou outras versões que venham a ser adicionadas) pertence às suas respectivas fontes e detentoras de direitos — o Jesus\' Corner não reivindica propriedade sobre as Escrituras. O conteúdo original do app (contexto histórico e geográfico, estudos temáticos, curiosidades, design e funcionalidades) é de propriedade do Jesus\' Corner e não pode ser copiado ou redistribuído sem autorização. Alguns conteúdos — planos e estudos por tema, respostas do chat sobre o texto, o resumo do boletim semanal, e a narração em voz sintética do texto bíblico — são gerados automaticamente por um modelo de Inteligência Artificial (ver nossa Política de Privacidade, seção 3) a partir do tema que você escolhe, da pergunta que você faz, das suas próprias anotações, ou do próprio texto do capítulo; esse conteúdo pode conter imprecisões e não substitui o estudo do texto bíblico em si nem orientação pastoral — trate-o como um ponto de partida pro seu próprio estudo, não como palavra final. Suas anotações, marcações e pedidos de oração continuam sendo seus — como explicado na nossa Política de Privacidade, esse conteúdo fica salvo na sua conta e sincroniza entre os seus dispositivos.',
      },
      {
        heading: '5. Uso aceitável',
        body: 'Você concorda em não usar o app para fins ilegais, não tentar acessar indevidamente nossos sistemas, não fazer engenharia reversa do app, e não usar o serviço de forma que prejudique outros usuários ou a infraestrutura do Jesus\' Corner. Isso inclui não usar os recursos de IA (chat sobre o texto, geração de planos e estudos) pra pedir ou tentar extrair conteúdo ilegal, abusivo, ou fora do propósito devocional do app. Na Comunidade, isso também inclui não postar conteúdo ofensivo, abusivo ou fora do propósito do espaço (leitura bíblica em grupo) nos murais de discussão — moderadores de grupo podem apagar comentários que violem essa regra, e contas que abusarem repetidamente dos recursos sociais ou de IA podem ter o acesso a esses recursos suspenso.',
      },
      {
        heading: '6. Isenção de garantias',
        body: 'O Jesus\' Corner é oferecido "como está". Não garantimos disponibilidade ininterrupta do serviço, nem a exatidão de conteúdo gerado por Inteligência Artificial (ver seção 4). O app é uma ferramenta de apoio à sua vida devocional e não substitui aconselhamento pastoral, psicológico ou profissional — se você estiver passando por uma crise pessoal, de saúde mental ou espiritual, procure ajuda qualificada, incluindo sua igreja local ou um profissional de saúde.',
      },
      {
        heading: '7. Limitação de responsabilidade',
        body: 'Na máxima extensão permitida por lei, o Jesus\' Corner não se responsabiliza por danos indiretos decorrentes do uso ou da impossibilidade de uso do app, incluindo perda de dados armazenados localmente no seu dispositivo (por isso recomendamos cuidado ao limpar dados do navegador).',
      },
      {
        heading: '8. Encerramento de conta',
        body: 'Você pode parar de usar o app e apagar sua conta a qualquer momento direto pelo app (Perfil → Excluir conta) — ver nossa Política de Privacidade, seção 14, pra detalhes de como isso funciona. Podemos suspender ou encerrar o acesso de contas que violarem estes termos.',
      },
      {
        heading: '9. Alterações nestes termos',
        body: 'Podemos atualizar estes termos conforme o app evolui. Sempre que isso acontecer, atualizaremos a data no topo desta página.',
      },
      {
        heading: '10. Lei aplicável',
        body: 'Estes termos são regidos pelas leis do Brasil. O Jesus\' Corner é operado pela JCORNER DESENVOLVIMENTO DE SOFTWARE LTDA, CNPJ 68.029.736/0001-26.',
      },
      {
        heading: '11. Contato',
        body: 'Dúvidas sobre estes termos? Escreva pra gente: info@jesuscorner.app',
      },
    ],
  },
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: November 2026',
    intro: 'These terms explain the rules for using Jesus\' Corner. By creating an account or using the app, you agree to what\'s written here. We\'ve written it in plain language, without unnecessary legalese.',
    sections: [
      {
        heading: '1. What Jesus\' Corner is',
        body: 'Jesus\' Corner is a Bible reading app with customizable reading plans (Light, Standard, Intensive, Free, or topic/chronological plans generated by AI from a subject you choose), guided prayer (the ACTS method), guided reflection on the day\'s reading with verse-level highlights and notes, thematic studies — ready-made or generated by AI from a topic you choose —, an AI reading assistant to ask questions about the text as you read (the answer always cites the verse behind it), a hands-free mode that runs the day\'s routine by audio and the option to listen to any Bible chapter read aloud, a "My Plan" tab where you freely turn each routine step on or off (Prayer, Reading, Guided Study, and Reflection), a Notes tab with word and topic (AI) search across everything you\'ve written, an optional weekly digest by email and notification summarizing your week, progress tracking, and an optional Community (friends, reading groups, and shared challenges). It\'s offered as a Web App (PWA) and, in the future, as a native app on the Google Play and App Store.',
      },
      {
        heading: '2. User accounts',
        body: "To use the app, you create an account with your name, email, age, and a strong password (minimum 8 characters, with an uppercase letter, lowercase letter, number, and special character). You're responsible for keeping this information accurate and for not sharing your password with others. Jesus' Corner is intended for people 18 and older — you must be at least 18 to create an account, and by signing up you confirm that you meet this requirement (see also section 12 of our Privacy Policy). Creating an account already grants access to the free plan; the paid plan (Premium) is optional and unlocks additional features (see section 3).",
      },
      {
        heading: '3. Plans and payment',
        body: "Jesus' Corner has a free plan (no cost, no time limit) that grants access to Bible reading at your pace, audio with your device voice, a written reflection after each reading, the verse of the day, and basic progress tracking. One paid plan, Premium, on a fixed-price subscription — monthly (R$27/mo; US$7/mo) or yearly (R$267/yr; US$57/yr) —, unlocks the remaining features, including AI-generated ones; you choose the currency on the subscription screen. The free plan doesn't include any AI-generated features. On Premium, the features that generate text automatically (questions about the text, summaries, topical plans and studies) have a monthly usage limit per account: once it's reached, they're unavailable until the start of the following month (Brasília time), and the rest of the app keeps working normally. The natural voice has a daily limit of new passages per account; once it's reached, reading aloud continues with your device voice. Anyone who subscribed to a plan that is no longer offered keeps it, at the price they signed up for, until they cancel. Payment is processed by Stripe (see our Privacy Policy, section 13) or, on the app installed from the Google Play Store or App Store, by that store's own billing system (Google Play Billing or Apple StoreKit). Billing is recurring, renewing automatically until you cancel or switch plans. You can cancel or switch plans anytime from within the app (Profile → My subscription) or, if you subscribed through a store, from that store's subscription settings; when you cancel a paid plan, access to paid features continues until the end of the period already paid for (after that the account returns to the free plan), with no prorated refund for unused time, except where required by law.",
      },
      {
        heading: '4. Bible content, AI-generated content, and intellectual property',
        body: 'The Bible text shown in the app (New Living Translation — NLT in English and Nova Versão Transformadora — NVT in Portuguese, licensed through API.Bible and Tyndale House Foundation, or other versions that may be added later) belongs to its respective sources and rights holders — Jesus\' Corner does not claim ownership over Scripture. The app\'s original content (historical and geographical context, thematic studies, trivia, design, and features) is owned by Jesus\' Corner and may not be copied or redistributed without permission. Some content — topic-based plans and studies, responses from the text chat, the weekly digest summary, and the synthetic-voice narration of the Bible text — is generated automatically by an AI model (see our Privacy Policy, section 3) from a topic you choose, a question you ask, your own notes, or the chapter text itself; this content may contain inaccuracies and doesn\'t replace studying the Bible text itself or pastoral guidance — treat it as a starting point for your own study, not the final word. Your notes, highlights, and prayer requests remain yours — as explained in our Privacy Policy, that content is stored in your account and syncs across your devices.',
      },
      {
        heading: '5. Acceptable use',
        body: 'You agree not to use the app for illegal purposes, not to attempt unauthorized access to our systems, not to reverse-engineer the app, and not to use the service in a way that harms other users or Jesus\' Corner\'s infrastructure. This includes not using the AI features (text chat, plan and study generation) to request or attempt to extract illegal, abusive, or off-purpose content outside the app\'s devotional scope. In the Community, this also includes not posting offensive, abusive, or off-topic content (the space is for group Bible reading) on group discussion boards — group moderators can delete comments that violate this rule, and accounts that repeatedly abuse the social or AI features may have access to those features suspended.',
      },
      {
        heading: '6. Disclaimer of warranties',
        body: 'Jesus\' Corner is provided "as is". We don\'t guarantee uninterrupted availability of the service, nor the accuracy of AI-generated content (see section 4). The app is a tool to support your devotional life and doesn\'t replace pastoral, psychological, or professional counseling — if you\'re going through a personal, mental health, or spiritual crisis, please seek qualified help, including your local church or a healthcare professional.',
      },
      {
        heading: '7. Limitation of liability',
        body: 'To the maximum extent permitted by law, Jesus\' Corner is not liable for indirect damages arising from the use or inability to use the app, including loss of data stored locally on your device (which is why we recommend caution when clearing your browser data).',
      },
      {
        heading: '8. Account termination',
        body: 'You can stop using the app and delete your account at any time right from within the app (Profile → Delete account) — see our Privacy Policy, section 14, for details on how that works. We may suspend or terminate access for accounts that violate these terms.',
      },
      {
        heading: '9. Changes to these terms',
        body: 'We may update these terms as the app evolves. Whenever that happens, we\'ll update the date at the top of this page.',
      },
      {
        heading: '10. Governing law',
        body: 'These terms are governed by the laws of Brazil. Jesus\' Corner is operated by JCORNER DESENVOLVIMENTO DE SOFTWARE LTDA, Brazilian company registration (CNPJ) 68.029.736/0001-26.',
      },
      {
        heading: '11. Contact',
        body: 'Questions about these terms? Write to us: info@jesuscorner.app',
      },
    ],
  },
}
