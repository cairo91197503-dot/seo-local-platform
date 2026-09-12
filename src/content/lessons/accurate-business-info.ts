import type { Lesson } from './types.js'

export const accurateBusinessInfoLesson: Lesson = {
  id: 'accurate-business-info',
  title: 'Informações corretas ajudam o cliente a entender o negócio',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'O Google precisa entender seu negócio',
      text: 'Quando as informações do seu Perfil da Empresa estão corretas e completas, o Google entende melhor o seu negócio — e pode mostrá-lo para mais pessoas que procuram por ele.',
      illustration: {
        src: '/images/lessons/accurate-business-info/cena-01.jpg',
        alt: 'Empresária revisando no celular os campos de nome, endereço, telefone, categoria e horário do perfil do negócio.',
      },
    },
    {
      id: 'what-matters',
      title: 'O que faz diferença',
      text: 'Nome, endereço, telefone, categoria e horário de funcionamento estão entre as informações que ajudam o Google a relacionar seu negócio a buscas relevantes.',
      highlight:
        'Informações completas e corretas ajudam o Google a entender seu negócio — isso não garante uma posição específica nos resultados.',
      illustration: {
        src: '/images/lessons/accurate-business-info/cena-02.jpg',
        alt: 'Ícones de nome, endereço, telefone, categoria e horário ao redor de uma lupa, representando o Google entendendo o negócio.',
      },
    },
    {
      id: 'keep-updated',
      title: 'O trabalho não termina na primeira configuração',
      text: 'Sempre que algo mudar — um novo horário, um novo telefone, um novo endereço — atualize o quanto antes. Um perfil desatualizado pode confundir clientes.',
      illustration: {
        src: '/images/lessons/accurate-business-info/cena-03.jpg',
        alt: 'Empresário atualizando o telefone no perfil logo depois de uma mudança real no negócio.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe por que manter as informações corretas importa. A próxima missão é revisar uma informação essencial do seu negócio.',
      illustration: {
        src: '/images/lessons/accurate-business-info/cena-04.jpg',
        alt: 'Empresário conferindo o horário de funcionamento no próprio perfil, com selo de "conferido".',
      },
    },
  ],
}
