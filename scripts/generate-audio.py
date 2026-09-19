import asyncio
import edge_tts
import os

VOICE = "pt-BR-AntonioNeural"
BASE_DIR = "public/audio/lessons"

SCENES = [
    ("accurate-business-info", "intro", "Quando as informações do seu Perfil da Empresa estão corretas e completas, o Google entende melhor o seu negócio — e pode mostrá-lo para mais pessoas que procuram por ele."),
    ("accurate-business-info", "what-matters", "Nome, endereço, telefone, categoria e horário de funcionamento estão entre as informações que ajudam o Google a relacionar o seu negócio a buscas relevantes. Vale lembrar: informações completas e corretas ajudam o Google a entender seu negócio, mas isso não garante uma posição específica nos resultados."),
    ("accurate-business-info", "keep-updated", "O trabalho não termina na primeira configuração. Sempre que algo mudar — um novo horário, um novo telefone, um novo endereço — atualize o quanto antes, porque um perfil desatualizado pode confundir seus clientes."),
    ("accurate-business-info", "action", "Você já sabe por que manter as informações corretas importa. A próxima missão é revisar uma informação essencial do seu negócio."),
    ("business-hours-matter", "intro", "Um horário errado pode fazer um cliente ir até o seu negócio e encontrar a porta fechada — e isso já é uma má primeira experiência."),
    ("business-hours-matter", "special-hours", "Além do horário normal, o Google permite informar horários especiais, como feriados e fechamentos temporários. Esses horários podem e devem ser atualizados sempre que mudarem — não só no dia a dia comum, mas também nessas situações especiais."),
    ("business-hours-matter", "consequence", "Na prática, um cliente que vê \"aberto\" no perfil, vai até lá num feriado e encontra tudo fechado, acaba perdendo confiança — mesmo sem culpa do negócio em si."),
    ("business-hours-matter", "action", "Agora é sua vez: confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber."),
    ("choose-your-next-action", "intro", "Você chegou ao fim do currículo, mas não ao fim da jornada. Cuidar da presença do seu negócio no Google é uma rotina contínua."),
    ("choose-your-next-action", "choose", "De tudo que você aprendeu, escolha uma ação concreta para fazer agora. O objetivo não é terminar o curso do Estrelar — é saber cuidar do seu negócio no Google, de forma contínua."),
    ("choose-your-next-action", "example", "Pode ser qualquer uma das três melhorias que você identificou na missão anterior — o importante é escolher uma e executar."),
    ("choose-your-next-action", "action", "Escolha uma das melhorias que você identificou e coloque em prática agora. Você já sabe cuidar disso sozinho — e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por você, sempre com a sua aprovação antes de qualquer mudança."),
    ("explain-what-you-offer", "intro", "Antes de entrar em contato, o cliente quer entender rapidamente o que o seu negócio oferece."),
    ("explain-what-you-offer", "clarity", "Descrever com clareza os serviços ou produtos ajuda o cliente a decidir sem precisar perguntar o básico primeiro. E o critério aqui é simples: não coloque uma informação porque o Google gosta dela. Coloque porque o cliente precisa dela para decidir."),
    ("explain-what-you-offer", "example", "Na prática, uma lista de serviços clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas."),
    ("explain-what-you-offer", "action", "Você já sabe por que isso importa. A próxima missão é revisar como o seu negócio descreve o que oferece."),
    ("first-profile-checkup", "intro", "Você já aprendeu várias partes do seu perfil, uma de cada vez. Agora é hora de olhar para ele como um todo."),
    ("first-profile-checkup", "what-it-means", "Esse check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar."),
    ("first-profile-checkup", "purpose", "Mas esse olhar não é sobre nota ou posição no Google. É sobre identificar o que ainda pode representar melhor o seu negócio real."),
    ("first-profile-checkup", "action", "Agora é sua vez: faça esse olhar completo e identifique o que ainda pode melhorar."),
    ("how-to-respond-to-reviews", "intro", "Receber uma avaliação é só metade do caminho. Responder também faz parte de cuidar da reputação do seu negócio."),
    ("how-to-respond-to-reviews", "why-respond", "O Google recomenda responder às avaliações e tratar o feedback dos clientes com atenção. Responder bem a uma avaliação positiva agradece; responder bem a uma negativa mostra que você se importa, sem hostilidade."),
    ("how-to-respond-to-reviews", "example", "Numa avaliação positiva, um agradecimento simples e específico já ajuda. Numa negativa, reconhecer o problema e mostrar disposição para resolver vale muito mais do que se justificar ou discutir."),
    ("how-to-respond-to-reviews", "action", "Você já sabe como pensar sobre isso. A próxima missão é responder a uma avaliação de verdade."),
    ("keep-your-profile-updated", "intro", "Configurar o perfil uma vez não é o fim do trabalho — é só o começo."),
    ("keep-your-profile-updated", "living-profile", "Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto. Ele não é uma configuração feita uma única vez; é uma representação viva do seu negócio."),
    ("keep-your-profile-updated", "consequence", "Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo."),
    ("keep-your-profile-updated", "action", "Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora."),
    ("photos-help-customers-decide", "intro", "Fotos são, muitas vezes, a primeira coisa que uma pessoa olha — antes mesmo de ler qualquer texto sobre o negócio."),
    ("photos-help-customers-decide", "what-photos-do", "Fotos e vídeos ajudam o cliente a conhecer o que o negócio oferece, e podem destacar características da empresa. O importante é usar fotos reais — do ambiente, dos produtos, do resultado do seu trabalho. Não é sobre ter fotos bonitas, é sobre mostrar a verdade."),
    ("photos-help-customers-decide", "trust", "Isso tem efeito direto na confiança: um cliente que vê fotos reais e recentes se sente mais seguro do que quando não vê nenhuma foto, ou vê fotos antigas e genéricas."),
    ("photos-help-customers-decide", "action", "Agora é sua vez: dê uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negócio hoje."),
    ("profile-represents-your-business", "intro", "O Perfil da Empresa no Google costuma ser o primeiro contato de alguém com o seu negócio — muitas vezes antes mesmo de visitar ou ligar."),
    ("profile-represents-your-business", "first-impression", "Nome, fotos e descrição ajudam a formar essa primeira impressão. Um perfil desatualizado pode passar a impressão errada, mesmo quando o negócio real é ótimo. O perfil não substitui o negócio — ele representa o negócio para quem ainda não o conhece."),
    ("profile-represents-your-business", "control", "A boa notícia é que isso está sob o seu controle: você pode revisar e ajustar as informações do perfil sempre que quiser, para que ele reflita melhor o negócio de verdade."),
    ("profile-represents-your-business", "action", "Você já entende o papel do perfil. Agora, a próxima missão é dar uma olhada geral nele."),
    ("review-request-message", "intro", "Pedir uma avaliação é normal, e ajuda o seu negócio a ser conhecido. Mas a forma como você pede também importa."),
    ("review-request-message", "right-way", "Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado. Por isso, nunca peça uma nota específica, nem ofereça desconto, brinde ou qualquer troca por uma avaliação."),
    ("review-request-message", "timing", "O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente."),
    ("review-request-message", "action", "Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar a sua própria mensagem de solicitação."),
    ("reviews-importance", "cena-01", "Antes de escolher uma empresa, muitas pessoas pesquisam no Google. Nesse momento, as avaliações mostram como foi a experiência de outros clientes. E ajudam quem está pesquisando a conhecer melhor o seu negócio."),
    ("reviews-importance", "trust", "Avaliações também ajudam a gerar confiança: experiências reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer o seu negócio."),
    ("reviews-importance", "timing", "O melhor momento para pedir uma avaliação é depois de um atendimento ou experiência real — você pode convidar o cliente a compartilhar espontaneamente a opinião dele. E o importante é pedir uma opinião sincera, nunca uma nota específica."),
    ("reviews-importance", "action", "Você já sabe por que avaliações autênticas são importantes. O próximo passo é colocar isso em prática."),
    ("why-appear-in-local-search", "intro", "Quando alguém precisa de algo perto de casa ou do trabalho, a primeira coisa que costuma fazer é pesquisar no Google. Essa busca já representa uma necessidade concreta, acontecendo naquele exato momento."),
    ("why-appear-in-local-search", "first-step", "Essa pessoa não está só curiosa: ela já está tentando resolver algo agora. E aparecer nessas buscas é o primeiro passo — antes de ser escolhido, o negócio precisa ser encontrado."),
    ("why-appear-in-local-search", "where", "Esses resultados locais aparecem em mais de um lugar: tanto na Pesquisa Google quanto no Google Maps."),
    ("why-appear-in-local-search", "action", "Você já entende por que aparecer nas buscas locais importa. Agora, a próxima missão é descobrir como o seu negócio aparece hoje."),
]

# Prompt universal de voz — DOCUMENTAÇÃO, não enviar ao edge-tts (ver
# comentário em generate()). Mantido aqui para referência e paridade com
# scripts/generate-lesson-audio.ps1 e docs/09-PADRAO-DE-LICOES.md.
PROMPT = """Narração em português do Brasil para um app que ajuda pequenos empresários. Voz masculina adulta, brasileira, calorosa e natural — tom de parceiro de confiança, não de locutor de rádio nem de professor. Ritmo pausado e claro, sem pressa, sem dramatização. Pronúncia natural das palavras, sem soletrar nada. Grave exatamente o texto abaixo, palavra por palavra, sem acrescentar, remover ou improvisar nada:"""

async def generate(scene_id, lesson_id, scene_name, text):
    dest_dir = os.path.join(BASE_DIR, lesson_id, scene_name)
    dest_file = os.path.join(dest_dir, "narration-v001.mp3")
    
    if os.path.exists(dest_file):
        print(f"  SKIP (ja existe): {lesson_id}/{scene_name}")
        return True
    
    # ATENÇÃO (correção 2026-09-19): enviar SÓ o roteiro da cena.
    # O edge-tts é um TTS literal — ele narra em voz alta tudo que recebe,
    # inclusive instruções. Enviar o PROMPT junto (como a versão anterior
    # fazia) produziu 48 áudios com ~30 s de instrução narrada antes do
    # roteiro (ver docs/07-CHANGELOG.md). O prompt universal de voz serve
    # só para IAs de voz que seguem instruções (Gemini TTS, ChatGPT com
    # voz) — ver docs/09-PADRAO-DE-LICOES.md.
    full_text = text
    
    try:
        communicate = edge_tts.Communicate(full_text, VOICE)
        await communicate.save(dest_file)
        size_kb = os.path.getsize(dest_file) / 1024
        print(f"  OK [{size_kb:.0f}KB]: {lesson_id}/{scene_name}")
        return True
    except Exception as e:
        print(f"  ERRO: {lesson_id}/{scene_name} - {e}")
        return False

async def main():
    print(f"Gerando 48 audios com voz {VOICE}...")
    print(f"Destino: {BASE_DIR}/")
    print()
    
    ok = 0
    erro = 0
    skip = 0
    
    for i, (lesson_id, scene_name, text) in enumerate(SCENES, 1):
        print(f"[{i:02d}/48] {lesson_id} / {scene_name}")
        result = await generate(i, lesson_id, scene_name, text)
        if result:
            if os.path.exists(os.path.join(BASE_DIR, lesson_id, scene_name, "narration-v001.mp3")):
                ok += 1
            else:
                skip += 1
        else:
            erro += 1
    
    print()
    print(f"=== CONCLUIDO ===")
    print(f"Gerados: {ok} | Erros: {erro}")

if __name__ == "__main__":
    asyncio.run(main())
