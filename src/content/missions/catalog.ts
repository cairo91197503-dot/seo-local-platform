import type { MissionCatalogItem } from './types'

/**
 * Catálogo de missões, indexado pelo `missionId` referenciado em
 * `src/content/lessons/catalog.ts`. Cada missão liberada por uma lição
 * concluída deve ter uma entrada aqui. Ordem e objetivo de cada missão em
 * `docs/13-CURRICULO-MVP.md`.
 */
export const missionCatalog: MissionCatalogItem[] = [
  // Módulo 1 — Comece pelo básico
  {
    id: 'discover-search-presence',
    title: 'Descubra como seu negócio aparece nas buscas',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Veja com os próprios olhos o que aparece hoje quando alguém procura pelo seu negócio no Google.',
    explanation:
      'Antes de melhorar qualquer coisa, é preciso saber o ponto de partida: o que já existe, o que está faltando ou desatualizado.',
    steps: [
      'Pesquise o nome do seu negócio no Google, como um cliente faria.',
      'Observe o que aparece: nome, endereço, telefone, horário, fotos, avaliações.',
      'Anote (mesmo que só de cabeça) o que te chamou atenção — bom ou ruim.',
    ],
    confirmationPrompt: 'Já pesquisou pelo seu negócio e observou o que aparece hoje?',
  },
  {
    id: 'basic-profile-checkup',
    title: 'Faça um check-up básico do seu perfil',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Dar uma primeira olhada geral no seu Perfil da Empresa, sem se aprofundar ainda em nenhum item específico.',
    explanation:
      'Esse check-up rápido serve para você ter uma visão geral de como está seu perfil hoje, antes de revisar cada informação em detalhe nas próximas lições.',
    steps: [
      'Abra o Perfil da Empresa do seu negócio (pesquise o nome no Google ou acesse business.google.com).',
      'Passe o olho pelas principais seções: informações, fotos, avaliações.',
      'Note, de forma geral, o que parece completo e o que parece faltando.',
    ],
    confirmationPrompt: 'Já deu uma olhada geral no seu perfil?',
  },
  {
    id: 'review-business-info',
    title: 'Revise uma informação essencial do negócio',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Confira se uma informação essencial do seu Perfil da Empresa no Google — como telefone ou horário de funcionamento — está correta e atualizada.',
    explanation:
      'Informações desatualizadas podem confundir clientes e fazer o negócio perder oportunidades. Conferir esses dados regularmente é uma das formas mais simples de cuidar do seu perfil.',
    steps: [
      'Abra o Perfil da Empresa do seu negócio (pesquise o nome do seu negócio no Google ou acesse business.google.com).',
      'Escolha uma informação essencial para revisar: telefone ou horário de funcionamento.',
      'Confira se está correta e, se precisar, atualize.',
    ],
    confirmationPrompt:
      'Já conferiu e, se necessário, atualizou a informação no seu Perfil da Empresa?',
  },
  {
    id: 'review-business-hours',
    title: 'Confira seus horários de funcionamento',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Revisar o horário de funcionamento do seu perfil, incluindo horários especiais para datas conhecidas (feriados, fechamentos).',
    explanation:
      'Horário errado é um dos motivos mais simples e mais evitáveis de frustrar um cliente que decidiu ir até o seu negócio.',
    steps: [
      'Abra a seção de horário de funcionamento do seu Perfil da Empresa.',
      'Confira se o horário normal de cada dia está correto.',
      'Se souber de algum feriado ou fechamento próximo, adicione um horário especial para essa data.',
    ],
    confirmationPrompt:
      'Já conferiu (e, se necessário, ajustou) seus horários, incluindo exceções conhecidas?',
  },
  // Módulo 2 — Faça o cliente entender seu negócio
  {
    id: 'review-services',
    title: 'Revise a lista de serviços do seu perfil',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Conferir se os serviços ou produtos listados no seu Perfil da Empresa realmente representam o que você oferece hoje.',
    explanation:
      'Serviços desatualizados ou incompletos podem fazer o cliente achar que você não oferece algo que na verdade oferece — ou o contrário.',
    steps: [
      'Abra a seção de serviços ou produtos do seu perfil.',
      'Compare com o que seu negócio realmente oferece hoje.',
      'Adicione o que estiver faltando e remova o que não existe mais.',
    ],
    confirmationPrompt: 'Já revisou se a lista de serviços/produtos está correta?',
  },
  {
    id: 'review-photos',
    title: 'Revise ou adicione fotos reais do seu negócio',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Conferir as fotos atuais do seu perfil e adicionar ou atualizar pelo menos uma foto real.',
    explanation:
      'Fotos desatualizadas ou a ausência de fotos passam a impressão de um perfil abandonado, mesmo que o negócio esteja funcionando bem.',
    steps: [
      'Abra a seção de fotos do seu Perfil da Empresa.',
      'Veja se as fotos atuais realmente representam o negócio hoje.',
      'Adicione ou substitua pelo menos uma foto real e recente.',
    ],
    confirmationPrompt: 'Já revisou as fotos e adicionou ou atualizou pelo menos uma?',
  },
  // Módulo 3 — Transforme experiência em confiança
  {
    id: 'request-first-review',
    title: 'Peça sua primeira avaliação',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Transforme um bom atendimento em uma oportunidade de receber uma avaliação autêntica no Google.',
    explanation:
      'As avaliações ajudam novos clientes a conhecerem a experiência de outras pessoas com seu negócio. O melhor momento para pedir uma avaliação é depois de uma experiência positiva e real.',
    steps: [
      'Escolha um cliente que acabou de ter uma experiência real com seu negócio.',
      'Agradeça pela preferência e pergunte educadamente se ele gostaria de deixar uma avaliação.',
      'Envie o link de avaliação do seu Perfil da Empresa no Google.',
    ],
    confirmationPrompt: 'Já realizou a ação com um cliente que teve uma boa experiência?',
    messageExample:
      'Obrigado pela preferência! Se você gostou do nosso atendimento, poderia compartilhar sua experiência no Google? Sua avaliação ajuda muito nosso negócio.',
    messageExampleNote:
      'Este é apenas um modelo de mensagem. Você poderá personalizá-lo no futuro.',
  },
  {
    id: 'prepare-request-message',
    title: 'Prepare uma mensagem de solicitação respeitosa',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Escreva sua própria mensagem para pedir avaliações, seguindo boas práticas de um pedido genuíno.',
    explanation:
      'Uma mensagem bem preparada facilita o pedido no dia a dia e evita erros comuns, como pedir uma nota específica ou oferecer algo em troca.',
    steps: [
      'Revise o exemplo de mensagem da lição anterior.',
      'Escreva sua própria versão, usando palavras que combinem com o jeito do seu negócio atender.',
      'Releia e confirme que ela não pede uma nota específica nem oferece nada em troca.',
    ],
    confirmationPrompt: 'Já preparou sua própria mensagem de solicitação?',
    messageExample:
      'Obrigado por visitar nosso negócio! Se puder, compartilhe sua opinião sincera no Google — isso ajuda outras pessoas a nos conhecer.',
    messageExampleNote:
      'Use este exemplo como ponto de partida e adapte para o seu jeito de atender.',
  },
  {
    id: 'respond-to-a-review',
    title: 'Responda a uma avaliação recebida',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Responder a pelo menos uma avaliação real do seu negócio, seja ela positiva ou negativa.',
    explanation:
      'Responder demonstra atenção ao cliente e pode influenciar positivamente quem lê as avaliações depois.',
    steps: [
      'Abra as avaliações do seu Perfil da Empresa.',
      'Escolha uma avaliação (de preferência uma que ainda não tenha resposta).',
      'Escreva uma resposta educada e específica — sem hostilidade, mesmo se a avaliação for negativa.',
    ],
    confirmationPrompt: 'Já respondeu a uma avaliação real do seu negócio?',
  },
  // Módulo 4 — Mantenha seu negócio atualizado
  {
    id: 'quick-profile-review',
    title: 'Faça uma revisão rápida do seu perfil',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Passar rapidamente pelo perfil e atualizar qualquer informação que tiver mudado desde a última revisão.',
    explanation:
      'Uma revisão rápida e periódica evita que pequenas mudanças no negócio real demorem para aparecer no perfil.',
    steps: [
      'Abra seu Perfil da Empresa.',
      'Percorra as principais informações: horário, telefone, serviços, fotos.',
      'Atualize qualquer coisa que tiver mudado desde a última vez que você revisou.',
    ],
    confirmationPrompt: 'Já fez essa revisão rápida do seu perfil?',
  },
  // Módulo 5 — Descubra o que melhorar
  {
    id: 'identify-three-improvements',
    title: 'Identifique 3 melhorias possíveis',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Olhar para o perfil como um todo e listar 3 pontos que podem melhorar, com base no que você aprendeu no currículo.',
    explanation:
      'Ter uma lista curta e concreta de melhorias é mais útil do que tentar mudar tudo de uma vez.',
    steps: [
      'Revise seu perfil como um todo: informações, horários, serviços, fotos, avaliações.',
      'Anote 3 pontos específicos que ainda podem melhorar.',
      'Guarde essa lista — você vai usá-la na próxima missão.',
    ],
    confirmationPrompt: 'Já identificou e anotou 3 melhorias possíveis?',
  },
  {
    id: 'execute-one-improvement',
    title: 'Execute uma melhoria escolhida',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective: 'Executar, de fato, uma das 3 melhorias identificadas na missão anterior.',
    explanation:
      'Fechar esse ciclo — aprender, aplicar, revisar, melhorar — é o que transforma conhecimento em rotina real de cuidado com o negócio.',
    steps: [
      'Volte à lista de 3 melhorias que você identificou.',
      'Escolha uma delas para executar agora.',
      'Faça a mudança de verdade no seu Perfil da Empresa ou no seu negócio.',
    ],
    confirmationPrompt: 'Já executou a melhoria escolhida?',
  },
]
