# generate-lesson-audio.ps1
# Lista todas as 48 cenas para geracao de audio via IA de voz.

$baseDir = "public/audio/lessons"

Write-Host "=== GERADOR DE AUDIO DAS LICOES ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prompt universal (copie e cole uma vez na IA de voz):" -ForegroundColor Yellow
Write-Host ""
Write-Host 'Narracao em portugues do Brasil para um app que ajuda pequenos empresarios. Voz masculina adulta, brasileira, calorosa e natural - tom de parceiro de confianca, nao de locutor de radio nem de professor. Ritmo pausado e claro, sem pressa, sem dramatizacao. Pronuncia natural das palavras, sem soletrar nada. Grave exatamente o texto abaixo, palavra por palavra, sem acrescentar, remover ou improvisar nada:' -ForegroundColor Gray
Write-Host ""

$scenes = @(
  @{ Id="N1";  L="accurate-business-info";            S="intro";        T="Quando as informacoes do seu Perfil da Empresa estao corretas e completas, o Google entende melhor o seu negocio - e pode mostrar-lo para mais pessoas que procuram por ele." },
  @{ Id="N2";  L="accurate-business-info";            S="what-matters";  T="Nome, endereco, telefone, categoria e horario de funcionamento estao entre as informacoes que ajudam o Google a relacionar o seu negocio a buscas relevantes. Vale lembrar: informacoes completas e corretas ajudam o Google a entender seu negocio, mas isso nao garante uma posicao especifica nos resultados." },
  @{ Id="N3";  L="accurate-business-info";            S="keep-updated";  T="O trabalho nao termina na primeira configuracao. Sempre que algo mudar - um novo horario, um novo telefone, um novo endereco - atualize o quanto antes, porque um perfil desatualizado pode confundir seus clientes." },
  @{ Id="N4";  L="accurate-business-info";            S="action";        T="Voce ja sabe por que manter as informacoes corretas importa. A proxima missao e revisar uma informacao essencial do seu negocio." },
  @{ Id="N5";  L="business-hours-matter";             S="intro";        T="Um horario errado pode fazer um cliente ir ate o seu negocio e encontrar a porta fechada - e isso ja e uma ma primeira experiencia." },
  @{ Id="N6";  L="business-hours-matter";             S="special-hours"; T="Alem do horario normal, o Google permite informar horarios especiais, como feriados e fechamentos temporarios. Esses horarios podem e devem ser atualizados sempre que mudarem - no so no dia a dia comum, mas tambem nessas situacoes especiais." },
  @{ Id="N7";  L="business-hours-matter";             S="consequence";  T="Na pratica, um cliente que ve aberto no perfil, vai ate la num feriado e encontra tudo fechado, acaba perdendo confianca - mesmo sem culpa do negocio em si." },
  @{ Id="N8";  L="business-hours-matter";             S="action";        T="Agora e sua vez: confira se o horario do seu perfil esta correto, incluindo os proximos feriados ou excecoes que voce ja souber." },
  @{ Id="N9";  L="choose-your-next-action";           S="intro";        T="Voce chegou ao fim do curriculo, mas nao ao fim da jornada. Cuidar da presenca do seu negocio no Google e uma rotina continua." },
  @{ Id="N10"; L="choose-your-next-action";           S="choose";        T="De tudo que voce aprendeu, escolha uma acao concreta para fazer agora. O objetivo nao e terminar o curso do Estrelar - e saber cuidar do seu negocio no Google, de forma continua." },
  @{ Id="N11"; L="choose-your-next-action";           S="example";      T="Pode ser qualquer uma das tres melhorias que voce identificou na missao anterior - o importante e escolher uma e executar." },
  @{ Id="N12"; L="choose-your-next-action";           S="action";        T="Escolha uma das melhorias que voce identificou e coloque em pratica agora. Voce ja sabe cuidar disso sozinho - e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por voce, sempre com a sua aprovacao antes de qualquer mudanca." },
  @{ Id="N13"; L="explain-what-you-offer";            S="intro";        T="Antes de entrar em contato, o cliente quer entender rapidamente o que o seu negocio oferece." },
  @{ Id="N14"; L="explain-what-you-offer";            S="clarity";      T="Descrever com clareza os servicos ou produtos ajuda o cliente a decidir sem precisar perguntar o basico primeiro. E o criterio aqui e simples: nao coloque uma informacao porque o Google gosta dela. Coloque porque o cliente precisa dela para decidir." },
  @{ Id="N15"; L="explain-what-you-offer";            S="example";      T="Na pratica, uma lista de servicos clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas." },
  @{ Id="N16"; L="explain-what-you-offer";            S="action";        T="Voce ja sabe por que isso importa. A proxima missao e revisar como o seu negocio descreve o que oferece." },
  @{ Id="N17"; L="first-profile-checkup";             S="intro";        T="Voce ja aprendeu varias partes do seu perfil, uma de cada vez. Agora e hora de olhar para ele como um todo." },
  @{ Id="N18"; L="first-profile-checkup";             S="what-it-means"; T="Esse check-up completo junta tudo o que voce ja revisou - informacoes, horarios, servicos, fotos, avaliacoes - num unico olhar." },
  @{ Id="N19"; L="first-profile-checkup";             S="purpose";      T="Mas esse olhar nao e sobre nota ou posicao no Google. E sobre identificar o que ainda pode representar melhor o seu negocio real." },
  @{ Id="N20"; L="first-profile-checkup";             S="action";        T="Agora e sua vez: faca esse olhar completo e identifique o que ainda pode melhorar." },
  @{ Id="N21"; L="how-to-respond-to-reviews";         S="intro";        T="Receber uma avaliacao e so metade do caminho. Responder tambem faz parte de cuidar da reputacao do seu negocio." },
  @{ Id="N22"; L="how-to-respond-to-reviews";         S="why-respond";  T="O Google recomenda responder as avaliacoes e tratar o feedback dos clientes com atencao. Responder bem a uma avaliacao positiva agradece; responder bem a uma negativa mostra que voce se importa, sem hostilidade." },
  @{ Id="N23"; L="how-to-respond-to-reviews";         S="example";      T="Numa avaliacao positiva, um agradecimento simples e especifico ja ajuda. Numa negativa, reconhecer o problema e mostrar disposicao para resolver vale muito mais do que se justificar ou discutir." },
  @{ Id="N24"; L="how-to-respond-to-reviews";         S="action";        T="Voce ja sabe como pensar sobre isso. A proxima missao e responder a uma avaliacao de verdade." },
  @{ Id="N25"; L="keep-your-profile-updated";         S="intro";        T="Configurar o perfil uma vez nao e o fim do trabalho - e so o comeco." },
  @{ Id="N26"; L="keep-your-profile-updated";         S="living-profile"; T="Sempre que algo mudar no seu negocio - horario, servico, endereco - o perfil deve mudar junto. Ele nao e uma configuracao feita uma unica vez; e uma representacao viva do seu negocio." },
  @{ Id="N27"; L="keep-your-profile-updated";         S="consequence";  T="Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negocio em si esteja otimo." },
  @{ Id="N28"; L="keep-your-profile-updated";         S="action";        T="Voce ja entende por que isso e uma rotina, nao uma tarefa unica. A proxima missao e fazer uma revisao rapida agora." },
  @{ Id="N29"; L="photos-help-customers-decide";      S="intro";        T="Fotos sao, muitas vezes, a primeira coisa que uma pessoa olha - antes mesmo de ler qualquer texto sobre o negocio." },
  @{ Id="N30"; L="photos-help-customers-decide";      S="what-photos-do"; T="Fotos e videos ajudam o cliente a conhecer o que o negocio oferece, e podem destacar caracteristicas da empresa. O importante e usar fotos reais - do ambiente, dos produtos, do resultado do seu trabalho. Nao e sobre ter fotos bonitas, e sobre mostrar a verdade." },
  @{ Id="N31"; L="photos-help-customers-decide";      S="trust";        T="Isso tem efeito direto na confianca: um cliente que ve fotos reais e recentes se sente mais seguro do que quando nao ve nenhuma foto, ou ve fotos antigas e genericas." },
  @{ Id="N32"; L="photos-help-customers-decide";      S="action";        T="Agora e sua vez: de uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negocio hoje." },
  @{ Id="N33"; L="profile-represents-your-business";  S="intro";        T="O Perfil da Empresa no Google costuma ser o primeiro contato de alguem com o seu negocio - muitas vezes antes mesmo de visitar ou ligar." },
  @{ Id="N34"; L="profile-represents-your-business";  S="first-impression"; T="Nome, fotos e descricao ajudam a formar essa primeira impressao. Um perfil desatualizado pode passar a impressao errada, mesmo quando o negocio real e otimo. O perfil nao substitui o negocio - ele representa o negocio para quem ainda nao o conhece." },
  @{ Id="N35"; L="profile-represents-your-business";  S="control";      T="A boa noticia e que isso esta sob o seu controle: voce pode revisar e ajustar as informacoes do perfil sempre que quiser, para que ele reflita melhor o negocio de verdade." },
  @{ Id="N36"; L="profile-represents-your-business";  S="action";        T="Voce ja entende o papel do perfil. Agora, a proxima missao e dar uma olhada geral nele." },
  @{ Id="N37"; L="review-request-message";            S="intro";        T="Pedir uma avaliacao e normal, e ajuda o seu negocio a ser conhecido. Mas a forma como voce pede tambem importa." },
  @{ Id="N38"; L="review-request-message";            S="right-way";    T="Um pedido genuino e educado e sincero: voce convida a pessoa a compartilhar a opiniao real dela, sem tentar controlar o resultado. Por isso, nunca peca uma nota especifica, nem ofereca desconto, brinde ou qualquer troca por uma avaliacao." },
  @{ Id="N39"; L="review-request-message";            S="timing";       T="O melhor momento para pedir e logo depois de uma experiencia positiva real, quando a lembranca ainda esta fresca para o cliente." },
  @{ Id="N40"; L="review-request-message";            S="action";        T="Voce ja sabe como pedir avaliacoes de forma genuina. A proxima missao e preparar a sua propria mensagem de solicitacao." },
  @{ Id="N41"; L="reviews-importance";                S="cena-01";      T="Antes de escolher uma empresa, muitas pessoas pesquisam no Google. Nesse momento, as avaliacoes mostram como foi a experiencia de outros clientes. E ajudam quem esta pesquisando a conhecer melhor o seu negocio." },
  @{ Id="N42"; L="reviews-importance";                S="trust";        T="Avaliacoes tambem ajudam a gerar confianca: experiencias reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer o seu negocio." },
  @{ Id="N43"; L="reviews-importance";                S="timing";       T="O melhor momento para pedir uma avaliacao e depois de um atendimento ou experiencia real - voce pode convidar o cliente a compartilhar espontaneamente a opiniao dele. E o importante e pedir uma opiniao sincera, nunca uma nota especifica." },
  @{ Id="N44"; L="reviews-importance";                S="action";        T="Voce ja sabe por que avaliacoes autenticas sao importantes. O proximo passo e colocar isso em pratica." },
  @{ Id="N45"; L="why-appear-in-local-search";        S="intro";        T="Quando alguem precisa de algo perto de casa ou do trabalho, a primeira coisa que costuma fazer e pesquisar no Google. Essa busca ja representa uma necessidade concreta, acontecendo naquele exato momento." },
  @{ Id="N46"; L="why-appear-in-local-search";        S="first-step";   T="Essa pessoa nao so esta curiosa: ela ja esta tentando resolver algo agora. E aparecer nessas buscas e o primeiro passo - antes de ser escolhido, o negocio precisa ser encontrado." },
  @{ Id="N47"; L="why-appear-in-local-search";        S="where";        T="Esses resultados locais aparecem em mais de um lugar: tanto na Pesquisa Google quanto no Google Maps." },
  @{ Id="N48"; L="why-appear-in-local-search";        S="action";        T="Voce ja entende por que aparecer nas buscas locais importa. Agora, a proxima missao e descobrir como o seu negocio aparece hoje." }
)

foreach ($sc in $scenes) {
  $destDir = "$baseDir/$($sc.L)/$($sc.S)"
  $destFile = "$destDir/narration-v001.mp3"
  $exists = Test-Path -LiteralPath $destFile

  $status = if ($exists) { "OK" } else { "PENDENTE" }
  $color = if ($exists) { "Green" } else { "Red" }

  Write-Host "--- $($sc.Id) - $($sc.L) / $($sc.S) [$status]" -ForegroundColor $color
  Write-Host "  Destino: $destFile"
  Write-Host "  Script: $($sc.T)"
  Write-Host ""
}

$pending = ($scenes | Where-Object { -not (Test-Path -LiteralPath "$baseDir/$($_.L)/$($_.S)/narration-v001.mp3") }).Count
$done = $scenes.Count - $pending

Write-Host "=== RESUMO ===" -ForegroundColor Cyan
Write-Host "Total: $($scenes.Count) cenas | Prontas: $done | Pendentes: $pending"
