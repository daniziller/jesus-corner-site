// Conteúdo da Política de Privacidade — texto legal, mantido separado de
// content.js (textos de marketing) por ser mais longo e menos frequentemente
// editado. Uma única fonte da verdade: o app apenas linka pra essa página no
// site, em vez de duplicar o texto nas duas plataformas.

export const privacyContent = {
  pt: {
    title: 'Política de Privacidade',
    updated: 'Última atualização: julho de 2026',
    intro: 'Esta política explica quais dados o Jesus\' Corner coleta, como eles são usados e guardados, e quais são os seus direitos. Escrevemos em linguagem simples — sem juridiquês desnecessário — porque acreditamos que privacidade só funciona quando é compreensível.',
    sections: [
      {
        heading: '1. Quem somos',
        body: 'O Jesus\' Corner é operado pela JCORNER DESENVOLVIMENTO DE SOFTWARE LTDA, CNPJ 68.029.736/0001-26. Para qualquer dúvida sobre privacidade, entre em contato pelo e-mail no fim desta página.',
      },
      {
        heading: '2. Quais dados coletamos',
        body: 'Para criar uma conta, pedimos seu nome, e-mail, data de nascimento e uma senha numérica de 6 dígitos — a data de nascimento é usada só pra liberar recursos com restrição de idade (como a Comunidade, disponível a partir de 16 anos) e não é compartilhada com outros usuários. Como o Jesus\' Corner funciona por contribuição de valor livre, também guardamos o status da sua contribuição (ativa, cancelada, valor e moeda escolhidos, mensal ou anual, e até quando ela vale) — ver seção 9 pra detalhes de pagamento. Conforme você usa o app, também são registrados: seu progresso de leitura (capítulos e reflexões concluídos), sequência de dias de uso, plano de leitura escolhido, idioma preferido, pedidos de oração e anotações que você escrever, estatísticas de oração (quantos pedidos, quantas orações cronometradas) e progresso nos estudos temáticos. Você também pode, de forma totalmente opcional, adicionar uma foto de perfil e uma mensagem curta ao seu perfil. Se você usar os recursos sociais do app (a aba Comunidade), também registramos pedidos de amizade (enviados e recebidos), os grupos de leitura dos quais você participa, os desafios propostos nesses grupos, os comentários que você postar no mural de cada grupo, e um pequeno histórico com data/hora de marcos como livros concluídos, subidas de nível e entradas em grupos — ver seção 6 para saber quem consegue ver esses dados.',
      },
      {
        heading: '3. Formulário de Contato',
        body: 'Se você usar o formulário "Fale Conosco" — dentro do app ou no site — guardamos o nome, e-mail e mensagem que você escrever, só pra podermos te responder. Diferente dos outros dados listados acima, esse não exige uma conta: qualquer visitante do site pode enviar uma mensagem, mesmo sem nunca ter se cadastrado no app. Essas mensagens não ficam visíveis a outros usuários, não são usadas pra nenhuma outra finalidade além de responder você, e não recebem nenhum tratamento automatizado — só são lidas por nós.',
      },
      {
        heading: '4. Onde esses dados ficam guardados',
        body: 'O Jesus\' Corner guarda sua conta e todo o conteúdo listado acima — progresso de leitura, sequência de dias, plano escolhido, pedidos de oração, anotações, estatísticas e status da sua contribuição — em um banco de dados hospedado pelo Supabase Inc., nosso provedor de autenticação e banco de dados. É esse banco de dados compartilhado que permite abrir o Jesus\' Corner em mais de um aparelho (por exemplo, celular e computador) e ver exatamente o mesmo progresso nos dois, com login pelo mesmo e-mail e senha. O Supabase atua como nosso processador de dados: ele guarda essas informações em nosso nome, sob as mesmas regras desta política, e não usa seu conteúdo para nenhuma outra finalidade própria. Sua senha nunca é guardada em texto simples — o Supabase a armazena de forma criptografada (hash), e nem nós temos acesso a ela. Se você apagar sua conta (pelo contato abaixo), seus dados são removidos permanentemente desse banco de dados.',
      },
      {
        heading: '5. O que acontece quando você visita nosso site ou app',
        body: 'Como qualquer site, ao acessar o Jesus\' Corner alguns dados técnicos passam pela nossa infraestrutura de hospedagem (Vercel Inc.) — como endereço IP, tipo de navegador e horário de acesso — usados para entregar o conteúdo, sugerir a moeda inicial de contribuição (reais ou dólares, com base no país detectado — você pode trocar manualmente na tela de contribuição) e por segurança. Também carregamos fontes de texto através do Google Fonts, o que envia uma requisição aos servidores do Google, usamos o Supabase Inc. (ver seção 4) para autenticação e armazenamento de dados e, se você escolher contribuir com um valor acima de zero, usamos o Stripe Inc. para processar o pagamento (ver seção 9). Nenhum desses dados técnicos é combinado com o conteúdo da sua conta para fins de publicidade.',
      },
      {
        heading: '6. Amigos, grupos e desafios',
        body: 'Se você adicionar amigos ou participar de grupos de leitura dentro do app (a aba Comunidade), alguns dados passam a ficar visíveis para outras pessoas, não só para você. Pra quem você adiciona como amigo (ou colega de grupo), seu nome, foto de perfil e mensagem do perfil sempre ficam visíveis. Além disso, seu perfil já nasce público pros seus amigos por padrão (essa é a opção padrão no cadastro, ajustável a qualquer momento em Perfil) — nesse caso, seus amigos também conseguem ver seu progresso geral de leitura, o que você está lendo no momento, em quais grupos você está, e um feed com marcos recentes seus (um livro que você concluiu, um nível que você alcançou, um grupo que você entrou), cada um com a data/hora em que aconteceu. Se preferir, você pode deixar o perfil privado a qualquer momento — nesse caso, só nome, foto e mensagem continuam visíveis pros amigos, e nada do feed de atividade aparece. Já dentro de um desafio de leitura em grupo (por exemplo, "ler Marcos em 1 semana"), o quanto você já leu daquele desafio específico — nunca o seu progresso pessoal completo da Bíblia — sempre fica visível pros outros membros do mesmo grupo, num placar de acompanhamento, independente da configuração de perfil público; e qualquer comentário que você postar no mural de discussão de um grupo fica visível para todos os membros daquele grupo, podendo ser apagado por você mesmo ou por um moderador do grupo. Pedidos de amizade enviados e aceitos também ficam registrados. Você pode sair de um grupo, desfazer uma amizade ou trocar entre perfil público e privado a qualquer momento pelo próprio app.',
      },
      {
        heading: '7. Não vendemos nem compartilhamos seus dados',
        body: 'Não usamos rastreadores de publicidade, não vendemos dados a terceiros e não exibimos anúncios. Não usamos ferramentas de analytics que identifiquem você pessoalmente.',
      },
      {
        heading: '8. Cookies',
        body: 'Não usamos cookies de rastreamento ou publicidade. O app usa apenas armazenamento local do navegador, necessário para o funcionamento básico (manter você logado, salvar seu progresso).',
      },
      {
        heading: '9. Pagamentos',
        body: 'O Jesus\' Corner funciona por contribuição de valor livre — você escolhe quanto contribuir, inclusive R$0 (acesso completo, sem cobrança nenhuma); veja o site pra mais detalhes. Se você escolher um valor acima de zero, os dados de pagamento (número do cartão, validade, etc.) são inseridos e processados diretamente pelo Stripe, nosso provedor de pagamentos — nunca vemos nem armazenamos esses dados em nossos próprios sistemas. Compartilhamos com o Stripe apenas o necessário pra processar a cobrança, como seu e-mail e um identificador da sua contribuição. Em nosso próprio banco de dados guardamos só o status da sua contribuição (ativa, cancelada, etc.), o valor e a moeda escolhidos, a periodicidade (mensal ou anual) e até quando ela vale — nunca os dados do seu cartão. Você escolhe a moeda (reais ou dólares) diretamente na tela de contribuição. Você pode cancelar ou trocar seu valor quando quiser direto pelo app (Perfil → Minha assinatura); se tiver uma cobrança ativa, isso te leva a um painel hospedado pelo próprio Stripe, onde também dá pra trocar o cartão cadastrado e baixar recibos. Ao cancelar, o acesso ao app continua até o fim do período já pago (ver Termos de Uso, seção 3).',
      },
      {
        heading: '10. Seus direitos (LGPD)',
        body: 'Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir ou apagar seus dados. Dentro do app, você pode reiniciar seu progresso de leitura a qualquer momento (Perfil → Reiniciar leitura), sair de um grupo, desfazer uma amizade, apagar um comentário que você escreveu, ou sair da sua conta (Perfil → Sair). Para excluir sua conta por completo — removendo permanentemente seus dados do nosso banco de dados, incluindo amizades, participação em grupos e o histórico de atividade da Comunidade — entre em contato pelo e-mail abaixo; atenderemos o pedido em até 15 dias.',
      },
      {
        heading: '11. Crianças',
        body: 'O Jesus\' Corner pede a data de nascimento no cadastro (ver seção 2) justamente para restringir recursos sensíveis a menores de idade — os grupos de leitura e desafios em grupo, por exemplo, são liberados só a partir de 16 anos, com base na data informada pelo próprio usuário no cadastro.',
      },
      {
        heading: '12. Mudanças nesta política',
        body: 'Podemos atualizar esta política conforme o app evolui. Sempre que isso acontecer, atualizaremos a data no topo desta página.',
      },
      {
        heading: '13. Contato',
        body: 'Dúvidas sobre privacidade? Escreva pra gente: info@jesuscorner.app',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: July 2026',
    intro: 'This policy explains what data Jesus\' Corner collects, how it\'s used and stored, and what your rights are. We\'ve written it in plain language — no unnecessary legalese — because we believe privacy only works when it\'s actually understandable.',
    sections: [
      {
        heading: '1. Who we are',
        body: 'Jesus\' Corner is operated by JCORNER DESENVOLVIMENTO DE SOFTWARE LTDA, Brazilian company registration (CNPJ) 68.029.736/0001-26. For any privacy questions, reach out via the email at the bottom of this page.',
      },
      {
        heading: '2. What data we collect',
        body: 'To create an account, we ask for your name, email, date of birth, and a 6-digit numeric password — your date of birth is only used to unlock age-restricted features (like the Community tab, available from age 16) and isn\'t shared with other users. Since Jesus\' Corner runs on a pay-what-you-want model, we also store your contribution status (active, canceled, the amount and currency you chose, monthly or annual, and its current expiration) — see section 9 for payment details. As you use the app, we also record: your reading progress (completed chapters and reflections), daily usage streak, chosen reading plan, preferred language, prayer requests and notes you write, prayer statistics (how many requests, how many timed prayers), and your progress in thematic studies. You can also, entirely optionally, add a profile photo and a short bio to your profile. If you use the app\'s social features (the Community tab), we also record friend requests (sent and received), the reading groups you\'re part of, the challenges proposed in those groups, any comments you post on a group\'s discussion board, and a small timestamped history of milestones like books completed, levels reached, and groups joined — see section 6 for who can see this data.',
      },
      {
        heading: '3. Contact Form',
        body: 'If you use the "Contact Us" form — inside the app or on the site — we store the name, email, and message you write, only so we can reply to you. Unlike the other data listed above, this doesn\'t require an account: any site visitor can send a message, even without ever signing up for the app. These messages aren\'t visible to other users, aren\'t used for any purpose beyond replying to you, and don\'t receive any automated processing — they\'re only read by us.',
      },
      {
        heading: '4. Where this data is stored',
        body: 'Jesus\' Corner stores your account and all the content listed above — reading progress, daily streak, chosen plan, prayer requests, notes, stats, and contribution status — in a database hosted by Supabase Inc., our authentication and database provider. This shared database is what lets you open Jesus\' Corner on more than one device (for example, your phone and your computer) and see the exact same progress on both, by logging in with the same email and password. Supabase acts as our data processor: it stores this information on our behalf, under the same rules described in this policy, and does not use your content for any purpose of its own. Your password is never stored in plain text — Supabase stores it encrypted (hashed), and we ourselves have no access to it. If you delete your account (via the contact below), your data is permanently removed from that database.',
      },
      {
        heading: '5. What happens when you visit our site or app',
        body: 'Like any website, when you access Jesus\' Corner some technical data passes through our hosting infrastructure (Vercel Inc.) — such as IP address, browser type, and access time — used to deliver content, suggest an initial contribution currency (Brazilian reais or US dollars, based on your detected country — you can switch it manually on the contribution screen), and for security. We also load fonts through Google Fonts, which sends a request to Google\'s servers, use Supabase Inc. (see section 4) for authentication and data storage, and, if you choose to contribute an amount above zero, use Stripe Inc. to process the payment (see section 9). None of this technical data is combined with your account content for advertising purposes.',
      },
      {
        heading: '6. Friends, groups, and challenges',
        body: 'If you add friends or join reading groups inside the app (the Community tab), some data becomes visible to other people, not just you. Anyone you add as a friend (or share a group with) can always see your name, profile photo, and bio. On top of that, your profile starts out public to friends by default (this is the default option at signup, adjustable anytime in Profile) — in that case, your friends can also see your overall reading progress, what you\'re currently reading, which groups you\'re in, and a feed of your recent milestones (a book you finished, a level you reached, a group you joined), each with the date/time it happened. If you\'d prefer, you can switch to a private profile at any time — in that case, only your name, photo, and bio stay visible to friends, and none of the activity feed shows up. Separately, inside a group reading challenge (for example, "read Mark in 1 week"), how much of that specific challenge you\'ve completed — never your full personal Bible reading progress — is always visible to the other members of the same group, in a shared leaderboard, regardless of your public-profile setting; and any comment you post on a group\'s discussion board is visible to every member of that group, and can be deleted by you or by a group moderator. Sent and accepted friend requests are also stored. You can leave a group, unfriend someone, or switch between a public and private profile at any time from within the app.',
      },
      {
        heading: '7. We don\'t sell or share your data',
        body: 'We don\'t use advertising trackers, don\'t sell data to third parties, and don\'t show ads. We don\'t use analytics tools that identify you personally.',
      },
      {
        heading: '8. Cookies',
        body: 'We don\'t use tracking or advertising cookies. The app only uses browser local storage, needed for basic functionality (keeping you logged in, saving your progress).',
      },
      {
        heading: '9. Payments',
        body: 'Jesus\' Corner runs on a pay-what-you-want model — you choose how much to contribute, including $0 (full access, no charge at all); see the site for more details. If you choose an amount above zero, payment data (card number, expiration date, etc.) is entered and processed directly by Stripe, our payment provider — we never see or store that data on our own systems. We share with Stripe only what\'s needed to process billing, such as your email and a contribution identifier. In our own database, we store only your contribution status (active, canceled, etc.), the amount and currency you chose, the billing interval (monthly or annual), and its current expiration — never your card details. You choose the currency (Brazilian reais or US dollars) yourself, right on the contribution screen. You can cancel or change your amount anytime from within the app (Profile → My subscription); if you have an active charge, this takes you to a portal hosted directly by Stripe, where you can also update your card on file and download receipts. When you cancel, access to the app continues until the end of the period already paid for (see Terms of Use, section 3).',
      },
      {
        heading: '10. Your rights',
        body: 'Depending on where you live, you may have rights to access, correct, or delete your data (for example, under Brazil\'s LGPD or similar laws elsewhere). Inside the app, you can restart your reading progress at any time (Profile → Restart reading), leave a group, unfriend someone, delete a comment you wrote, or log out (Profile → Log out). To delete your account entirely — permanently removing your data from our database, including friendships, group membership, and your Community activity history — contact us at the email below; we\'ll handle the request within 15 days.',
      },
      {
        heading: '11. Children',
        body: 'Jesus\' Corner asks for your date of birth at signup (see section 2) specifically to restrict sensitive features to minors — reading groups and group challenges, for example, are only unlocked from age 16, based on the date the user enters at signup.',
      },
      {
        heading: '12. Changes to this policy',
        body: 'We may update this policy as the app evolves. Whenever that happens, we\'ll update the date at the top of this page.',
      },
      {
        heading: '13. Contact',
        body: 'Questions about privacy? Write to us: info@jesuscorner.app',
      },
    ],
  },
}
