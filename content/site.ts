// ============================================================================
// Conteúdo do site Tecjato — fonte única de textos (i18n-ready).
// v1 publica apenas em português. Para adicionar inglês, replicar a estrutura
// em `content/site.en.ts` e selecionar pelo locale. Nada de copy hardcoded fora
// daqui (com exceção de labels triviais de UI já isolados nos componentes).
// ============================================================================

export type ProductCategoryId =
  | "equipamentos"
  | "pintura"
  | "abrasivos"
  | "reposicao"
  | "assistencia";

/** Sub-equipamento (nível 4): tem página própria com foto + "Fale conosco". */
export interface ProductSubItem {
  /** Âncora da rota interna (/produtos/categoria/item/slug). */
  slug: string;
  name: string;
  /** Texto curto exibido no card da grade. */
  description: string;
  /**
   * Texto completo da página do equipamento, em blocos. Cada string é um
   * parágrafo; linhas iniciadas por "•" viram item de lista; linhas
   * terminadas em ":" viram subtítulo. Sem isso, usa description.
   */
  detail?: string[];
  /** Foto do equipamento (em /public). Sem isso, usa placeholder. */
  image?: string;
  /**
   * Nome do PDF de especificação em /public/documentos/especificacoes/.
   * O botão de download só aparece ativo quando o arquivo existe; sem ele,
   * mostra "em breve".
   */
  specFile?: string;
  /** Texto curto de abertura da grade de variantes (quando há `subItems`). */
  intro?: string;
  /** Variantes (nível 5): exibidas em grade na página do sub-equipamento. */
  subItems?: ProductSubItem[];
}

/** Item dentro de uma categoria (nível 2 do fluxo, estilo Winoa). */
export interface ProductItem {
  /** Âncora dentro da página da categoria. */
  slug: string;
  name: string;
  description: string;
  /**
   * Texto completo da página do item quando ele não tem sub-equipamentos.
   * Mesmo formato do `detail` do sub-equipamento (parágrafos, "•" vira lista,
   * linha terminada em ":" vira subtítulo).
   */
  detail?: string[];
  /** Rótulos curtos (nomes comerciais, variantes). */
  tags?: string[];
  /** Foto real do item (em /public). Sem isso, usa placeholder. */
  image?: string;
  /** Foto de fundo do cabeçalho azul da página do item. Sem isso, fundo azul. */
  heroImage?: string;
  /** Texto de abertura da grade de sub-equipamentos (nível 4). */
  intro?: string;
  /** Sub-equipamentos exibidos em grade na página do item. */
  subItems?: ProductSubItem[];
  /** Nome do PDF de especificação em /public/documentos/especificacoes/. */
  specFile?: string;
  /** Nome do PDF de catálogo em /public/documentos/catalogos/. */
  catalogFile?: string;
  /** Nome do PDF de FDS (ficha de dados de segurança) em /public/documentos/seguranca/. */
  fdsFile?: string;
}

export interface ProductCategory {
  id: ProductCategoryId;
  /** Rótulo curto para nav, dropdown e cards. */
  label: string;
  /** Título completo da página da categoria. */
  title: string;
  /** Frase curta para o card na vitrine. */
  tagline: string;
  /** Descrição da categoria (intro da página + card). */
  description: string;
  /** Texto do placeholder de foto industrial. */
  imageAlt: string;
  /** Foto real da categoria (em /public). Sem isso, usa placeholder. */
  image?: string;
  /** Foto de fundo do cabeçalho da página da categoria. Sem isso, fundo azul. */
  heroImage?: string;
  /** Produtos/serviços dentro da categoria. */
  items: ProductItem[];
}

export const company = {
  name: "Tecjato",
  group: "Grupo Febratec",
  foundedYear: 1987,
  city: "Araquari/SC",
  phoneDisplay: "(47) 2101-0250",
  phoneHref: "+554721010250",
  email: "vendas@tecjato.com.br",
  whatsapp: "https://wa.me/554721010250",
  address: {
    line: "Estr. Geral Porto Grande, 111 — Porto Grande",
    city: "Araquari — SC",
    zip: "89245-000",
    country: "Brasil",
    full: "Estr. Geral Porto Grande, 111, Porto Grande, Araquari — SC, 89245-000, Brasil",
    mapsQuery: "Tecjato Estr. Geral Porto Grande 111 Araquari SC 89245-000",
  },
  social: {
    facebook: "https://www.facebook.com/tecjatofebratec",
    linkedin: "https://www.linkedin.com/company/febratec",
    instagram: "https://www.instagram.com/tecjatofebratec",
  },
} as const;

export const productCategories: ProductCategory[] = [
  {
    id: "equipamentos",
    label: "Equipamentos de jateamento",
    title: "Equipamentos de jateamento",
    tagline: "Máquinas turbinadas e a ar comprimido, projetadas sob medida.",
    description:
      "Equipamentos de jateamento turbinados e por ar comprimido, dimensionados para a sua peça, o seu volume e o seu acabamento. Fazemos também a linha completa, integrando jateamento e pintura no mesmo processo, com engenharia própria do dimensionamento à automação.",
    imageAlt: "Máquina de jateamento Tecjato em operação",
    image: "/fotos/maquinas.jpg",
    heroImage: "/fotos/Maquinas_4.avif",
    items: [
      {
        slug: "jateamento-turbinado",
        name: "Jateamento turbinado",
        description:
          "Máquinas de turbina de alta produtividade para limpeza, decapagem e preparação de superfície em grandes volumes.",
        image: "/fotos/maquinas_3.jpg",
        intro:
          "Linha completa de equipamentos de jateamento por turbina marca Tecjato, com construção mecânica robusta e materiais de excelente qualidade, o que garante longa vida e baixo custo de manutenção.",
        subItems: [
          {
            slug: "gancheiras",
            name: "Gancheiras",
            description:
              "As gancheiras Tecjato são ideais para o jateamento de peças de alta produção que não possam sofrer tombamento.",
            detail: [
              "As gancheiras Tecjato são ideais para o jateamento de peças de alta produção que não possam sofrer tombamento, mantendo a peça suspensa durante todo o ciclo.",
              "A série MGF é compacta, versátil e oferece excelente custo-benefício. A série MOF é modular e pode ser configurada com uma ou mais turbinas, conforme a necessidade de produção.",
              "Características:",
              "• Séries MGF (compacta) e MOF (modular)",
              "• Gancho com capacidade de peso adequada a cada caso",
              "• Turbinas com acionamento direto pelo motor",
              "• Monovia em Y, T ou L em circuito fechado (série MOF)",
            ],
            image: "/fotos/Gancheira.jpg",
          },
          {
            slug: "mesa-rotativa",
            name: "Mesa rotativa",
            description:
              "Oferecem grande flexibilidade aliada a eventual necessidade de produção, podendo receber peças mais pesadas e/ou de geometria mais complicada.",
            detail: [
              "As máquinas tipo mesa rotativa são altamente adaptáveis às mais variadas aplicações, moldando o leque da máquina de acordo com a geometria de cada superfície a ser jateada, independente da sua complexidade.",
              "Características:",
              "• Múltiplas aplicações",
              "• Adicionador automático de abrasivos",
              "• Sistema de vedação eficiente",
              "• Painel de comando com PLC e IHM",
              "Aplicações comuns:",
              "• Peças fundidas",
              "• Limpeza de moldes",
              "• Peças forjadas",
            ],
            image: "/fotos/mesarotativa.jpg",
          },
          {
            slug: "shot-peening",
            name: "Shot peening",
            description:
              "As máquinas de “shot peening” da Tecjato são equipadas com componentes de última geração para ótimo controle do processo.",
            detail: [
              "As máquinas Tecjato de “shot peening” realizam um trabalho de martelamento da superfície das peças, induzindo-as a tensões residuais previamente estabelecidas com o objetivo de aumentar a resistência à fadiga.",
              "São equipadas com componentes de última geração para ótimo controle do processo, que se tornou indispensável em aplicações de alta exigência mecânica.",
              "Aplicações comuns:",
              "• Molas helicoidais",
              "• Engrenagens e rodas dentadas",
              "• Virabrequins",
            ],
            image: "/fotos/shot-peening.jpg",
          },
          {
            slug: "monovias",
            name: "Monovias",
            description:
              "Utilizadas em linhas de peças com alta produtividade e em geral utilizam elevado número de turbinas.",
            detail: [
              "As Monovias de Linha Contínua são muito utilizadas em linhas de peças com alta produtividade e em geral utilizam elevado número de turbinas.",
              "Têm como principal característica a automatização do processo produtivo, tornando o ambiente de trabalho mais seguro devido à redução de contato humano, eficiente por causa da uniformidade do processo e econômico em função de desprezar a necessidade de uma estocagem entre processos.",
              "Características:",
              "• Processo automatizado e contínuo",
              "• Elevado número de turbinas",
              "• Uniformidade de tratamento em toda a linha",
              "• Dispensa estocagem entre processos",
              "• Redução do contato humano com o processo",
            ],
            image: "/fotos/monovias.jpg",
          },
          {
            slug: "esteira-horizontal",
            name: "Esteira horizontal",
            description:
              "Desenvolvidas para um jateamento de fluxo contínuo em componentes planos, volumosos ou de geometria mais complexa.",
            detail: [
              "As máquinas de esteira horizontal Tecjato são desenvolvidas para um jateamento de fluxo contínuo em componentes planos, volumosos ou de geometria mais complexa, atendendo o grau de limpeza ou shot peening desejado.",
              "Características:",
              "• Esteira de aço Mn 12/14%",
              "• Adicionador automático de abrasivo",
              "• Sistema de vedação eficiente",
              "• Painel de comando com PLC e IHM",
              "• Alta produção",
              "• Ciclo contínuo",
              "• Fácil integração",
              "• 1 a 12 turbinas",
            ],
            image: "/fotos/mesahorizontal.jpg",
          },
          {
            slug: "esteira-tamboreadora",
            name: "Esteira tamboreadora",
            description:
              "As máquinas de jateamento tipo esteira tamboreadora limpam com rapidez e eficiência grande quantidade de peças que possam ser tombadas.",
            detail: [
              "Os equipamentos de jateamento tipo esteira tamboreadora são destinados à limpeza, rebarbação, “shot peening” e acabamento superficial de peças que possam ser tombadas, limpando com rapidez e eficiência grande quantidade de peças por ciclo.",
              "O compartimento de jateamento é revestido com materiais altamente resistentes à abrasão, garantindo durabilidade ao equipamento. Está disponível em várias capacidades, existindo sempre uma adequada a cada cliente.",
              "Características:",
              "• Esteira em aço (TBA) ou borracha (TBB)",
              "• Compartimento revestido contra abrasão",
              "• Diversas capacidades disponíveis",
              "• Limpeza, rebarbação e “shot peening” no mesmo equipamento",
              "Aplicações comuns:",
              "• Peças forjadas",
              "• Peças fundidas",
              "• Peças laminadas",
            ],
            image: "/fotos/esteira-tamboreadora.jpg",
          },
          {
            slug: "decapagem-tubos-barras",
            name: "Decapagem de tubos e barras",
            description:
              "Os equipamentos para decapagem mecânica Tecjato são projetados para limpeza, decapagem mecânica e tratamento de superfície de peças.",
            detail: [
              "Os equipamentos para decapagem mecânica Tecjato são projetados para limpeza, decapagem mecânica e tratamento de superfície de perfis metálicos em fluxo contínuo.",
              "As máquinas oferecem alto rendimento e baixo custo operacional, existindo sempre um modelo adequado à sua necessidade de produção. O compartimento de jateamento é completamente revestido com materiais resistentes à abrasão.",
              "Características:",
              "• Compartimento totalmente revestido contra abrasão",
              "• Alto rendimento e baixo custo operacional",
              "• Sistema de carga e descarga automático (opcional)",
              "• Modelos dimensionados por necessidade de produção",
              "Aplicações comuns:",
              "• Chapas, tubos e barras",
              "• Vigas e perfis",
              "• Estrutura metálica em geral",
            ],
            image: "/fotos/decapagem-tubos-barras.jpg",
          },
          {
            slug: "jateamento-botijoes-gas",
            name: "Jateamento de botijões de gás",
            description:
              "Os equipamentos para jateamento de botijões de gás Tecjato são altamente eficientes para jateamento em larga escala.",
            detail: [
              "Os equipamentos para jateamento de botijões de gás Tecjato são altamente eficientes para jateamento em larga escala.",
              "Sua construção modular e os opcionais da linha facilitam a integração em instalações já existentes.",
              "Características:",
              "• Roletes cônicos para movimentação contínua e econômica",
              "• Compatível com os modelos de botijões P-13, P-20 e P-45",
              "• Turbinas de alto desempenho de fundição própria",
              "• Ligas resistentes à abrasão com certificação ISO 9001",
              "• Sistemas calculados para equilíbrio entre custo e produtividade",
              "• Construção modular para integração em linhas existentes",
            ],
            image: "/fotos/botijao-gas.jpg",
          },
        ],
      },
      {
        slug: "linha-completa",
        name: "Linha completa: jateamento + pintura",
        description:
          "Linha integrada de preparação de superfície e pintura, projetada de ponta a ponta pela mesma engenharia.",
        image: "/fotos/linha-completa.jpg",
        heroImage: "/fotos/Pintura_1.avif",
        detail: [
          "A linha completa Tecjato integra em um único fluxo a preparação de superfície e a pintura: o jateamento que limpa a peça e cria o perfil de ancoragem, o transporte entre as etapas, a cabine de pintura e a estufa de cura.",
          "Tudo é projetado pela mesma engenharia, do dimensionamento à automação. Isso elimina as emendas entre fornecedores diferentes e garante que cada etapa trabalhe no ritmo da seguinte.",
          "A tecnologia de pintura é definida conforme o seu produto e o seu volume de produção:",
          "• Pintura eletrostática a pó — camada uniforme, alta aderência e ótimo aproveitamento de material, com cura em estufa",
          "• Pintura a seco — processo sem solventes, mais limpo e com menor impacto ambiental",
          "• Pintura líquida — ampla gama de cores, brilhos e texturas, para acabamentos especiais",
          "O que a integração entrega:",
          "• Um único responsável pelo projeto, pela fabricação e pela instalação",
          "• Fluxo contínuo entre jateamento, pintura e cura, sem acúmulo entre etapas",
          "• Automação e comandos integrados no mesmo painel",
          "• Layout dimensionado conforme o espaço disponível na sua fábrica",
        ],
      },
      {
        slug: "jateamento-ar-comprimido",
        name: "Jateamento por ar comprimido",
        description:
          "Cabines e sistemas a ar comprimido para peças complexas, áreas internas e acabamento controlado.",
        image: "/fotos/arcomprimido_1.jpg",
        intro:
          "Linha de jateamento por ar comprimido Tecjato, para peças que pedem acesso a áreas internas, geometria complexa ou controle fino do acabamento. O operador conduz o jato, e o equipamento é dimensionado conforme a peça e o volume de produção.",
        subItems: [
          {
            slug: "cabine-de-jato",
            name: "Cabine de jato",
            description:
              "Compartimento fechado em que o operador jateia a peça por dentro, com recuperação do abrasivo.",
            detail: [
              "As cabines de jato Tecjato são compartimentos fechados em que o operador trabalha no interior do equipamento, conduzindo o bico de jateamento diretamente sobre a peça.",
              "Indicadas para peças grandes ou de geometria complexa, em que o jateamento manual dá o controle de acabamento que um equipamento automático não alcança. O abrasivo é recolhido no fundo e devolvido ao circuito.",
              "Características:",
              "• Compartimento revestido com material resistente à abrasão",
              "• Sistema de recuperação e reaproveitamento do abrasivo",
              "• Iluminação e exaustão dimensionadas para o trabalho interno",
              "• Dimensões definidas conforme a peça e o volume de produção",
            ],
          },
          {
            slug: "tanque-de-jato",
            name: "Tanque de jato",
            description:
              "Vaso de pressão que alimenta o bico com abrasivo, para jateamento fora da cabine.",
            detail: [
              "O tanque de jato é o vaso de pressão que armazena o abrasivo e o conduz pressurizado até o bico de jateamento.",
              "É a solução para o trabalho que não cabe em cabine: estruturas montadas, tanques, embarcações e serviços em campo. Também atende como alimentação de cabines e gabinetes do tipo pressão.",
              "Características:",
              "• Operação por ar comprimido, com controle de vazão do abrasivo",
              "• Uso em campo ou integrado a cabines e gabinetes",
              "• Modelos dimensionados conforme a autonomia desejada",
            ],
            image: "/fotos/tanque-de-jato.jpg",
          },
          {
            slug: "gabinetes",
            name: "Gabinetes",
            description:
              "Gabinetes de pressão e de sucção para peças menores, com o operador trabalhando por fora.",
            image: "/fotos/gabinete-pressao.jpg",
            intro:
              "Nos gabinetes de jateamento a peça fica dentro do equipamento e o operador trabalha por fora, com luvas acopladas e visor de acompanhamento. Disponíveis nos sistemas de pressão e de sucção, cada um indicado para um tipo de trabalho.",
            subItems: [
              {
                slug: "gabinete-pressao",
                name: "Gabinete de pressão",
                description:
                  "O abrasivo sai pressurizado de um tanque, com maior energia de impacto e produtividade em trabalhos mais pesados.",
                detail: [
                  "No gabinete de pressão o abrasivo é armazenado em um tanque pressurizado e conduzido já sob pressão até o bico de jateamento.",
                  "Esse arranjo entrega maior energia de impacto e maior produtividade, sendo indicado para remoção de carepa, ferrugem e revestimentos, e para peças que exigem perfil de ancoragem mais acentuado.",
                  "Características:",
                  "• Maior velocidade de jateamento e menor tempo de ciclo",
                  "• Indicado para trabalhos pesados de decapagem e preparação de superfície",
                  "• Recuperação e reaproveitamento contínuo do abrasivo",
                  "• Visor, iluminação interna, luvas de manipulação e despoeiramento acoplado",
                ],
                image: "/fotos/gabinete-pressao.jpg",
              },
              {
                slug: "gabinete-succao",
                name: "Gabinete de sucção",
                description:
                  "O abrasivo é arrastado por efeito venturi: solução mais simples e econômica para acabamento e limpeza leve.",
                detail: [
                  "No gabinete de sucção o abrasivo é arrastado até o bico por efeito venturi, sem tanque pressurizado. É a solução mais simples e de menor custo de operação e manutenção.",
                  "Indicado para limpeza leve, fosqueamento, acabamento e peças delicadas, em que o controle do operador importa mais do que a velocidade de remoção.",
                  "Características:",
                  "• Construção mais simples, com menor custo de aquisição e manutenção",
                  "• Ideal para acabamento, fosqueamento e limpeza fina",
                  "• Recuperação e reaproveitamento contínuo do abrasivo",
                  "• Visor, iluminação interna, luvas de manipulação e despoeiramento acoplado",
                ],
                image: "/fotos/gabinete-succao.jpg",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pintura",
    label: "Equipamentos de pintura",
    title: "Equipamentos de pintura",
    tagline: "Cabines de pintura e estufas de cura para a linha de pintura.",
    description:
      "Equipamentos de pintura industrial dimensionados para o seu produto e o seu volume: cabines com o sistema de filtragem mais adequado ao processo e estufas para a cura. Fazemos também a linha completa, integrando jateamento e pintura no mesmo processo.",
    imageAlt: "Cabine de pintura Tecjato em operação",
    image: "/fotos/cabine-pintura.jpg",
    heroImage: "/fotos/Pintura_1.avif",
    items: [
      {
        slug: "cabine-pintura",
        name: "Cabine de pintura",
        description:
          "Cabines de pintura com o sistema de filtragem mais adequado ao seu processo: a seco, líquida ou eletrostática a pó.",
        image: "/fotos/cabine-pintura-seco.jpg",
        intro:
          "Cabines de pintura Tecjato, dimensionadas conforme a peça, o volume de produção e a tecnologia de pintura escolhida.",
        subItems: [
          {
            slug: "cabine-pintura-filtragem-seco",
            name: "Cabine de pintura — filtragem a seco",
            description:
              "Retenção do overspray por filtros, sem uso de água, para linhas de pintura a pó ou líquida.",
          },
          {
            slug: "cabine-pintura-filtragem-liquida",
            name: "Cabine de pintura — filtragem líquida",
            description:
              "Retenção do overspray por cortina de água, indicada para processos de maior volume de tinta líquida.",
          },
          {
            slug: "cabine-pintura-a-po",
            name: "Cabine de pintura a pó",
            description:
              "Aplicação eletrostática de tinta em pó, com sistema de recuperação de material e acabamento uniforme.",
          },
        ],
      },
      {
        slug: "estufa-pintura",
        name: "Estufa de pintura",
        description:
          "Estufas para cura e secagem da pintura, nas versões estacionária ou de passagem.",
        image: "/fotos/estufa-pintura.jpg",
        intro:
          "Estufas de pintura Tecjato, dimensionadas conforme o volume de produção e o fluxo da linha.",
        subItems: [
          {
            slug: "estufa-pintura-estacionaria",
            name: "Estufa de pintura estacionária",
            description:
              "Câmara única para cura em lote, indicada para produções menores ou peças de maior porte.",
            image: "/fotos/estufa-pintura-estacionaria.jpg",
          },
          {
            slug: "estufa-pintura-passagem",
            name: "Estufa de pintura de passagem",
            description:
              "Túnel contínuo integrado à linha, para cura em fluxo constante e maior produtividade.",
          },
        ],
      },
      {
        slug: "linha-completa",
        name: "Linha completa: jateamento + pintura",
        description:
          "Linha integrada de preparação de superfície e pintura, projetada de ponta a ponta pela mesma engenharia.",
        image: "/fotos/linha-completa.jpg",
        heroImage: "/fotos/Pintura_1.avif",
        detail: [
          "A linha completa Tecjato integra em um único fluxo a preparação de superfície e a pintura: o jateamento que limpa a peça e cria o perfil de ancoragem, o transporte entre as etapas, a cabine de pintura e a estufa de cura.",
          "Tudo é projetado pela mesma engenharia, do dimensionamento à automação. Isso elimina as emendas entre fornecedores diferentes e garante que cada etapa trabalhe no ritmo da seguinte.",
          "A tecnologia de pintura é definida conforme o seu produto e o seu volume de produção:",
          "• Pintura eletrostática a pó — camada uniforme, alta aderência e ótimo aproveitamento de material, com cura em estufa",
          "• Pintura a seco — processo sem solventes, mais limpo e com menor impacto ambiental",
          "• Pintura líquida — ampla gama de cores, brilhos e texturas, para acabamentos especiais",
          "O que a integração entrega:",
          "• Um único responsável pelo projeto, pela fabricação e pela instalação",
          "• Fluxo contínuo entre jateamento, pintura e cura, sem acúmulo entre etapas",
          "• Automação e comandos integrados no mesmo painel",
          "• Layout dimensionado conforme o espaço disponível na sua fábrica",
        ],
      },
    ],
  },
  {
    id: "abrasivos",
    label: "Abrasivos",
    title: "Abrasivos e granalha de aço",
    tagline: "Diversos abrasivos para as variadas aplicações.",
    description:
      "Linha completa de abrasivos para jateamento — da granalha de aço alto carbono de produção própria aos abrasivos especiais em inox, vidro e óxido de alumínio. Controle metalúrgico e granulométrico para um resultado consistente lote após lote.",
    imageAlt: "Granalha de aço produzida pela Tecjato",
    image: "/fotos/abrasivos-granalha.jpeg",
    items: [
      {
        slug: "granalha-aco-alto-carbono",
        name: "Granalha de Aço Alto Carbono",
        description:
          "Steel Shot esférica (Tecshot) e Steel Grit angular (Tecgrit). Abrasivo de alta durabilidade para limpeza, decapagem e preparação de superfície.",
        image: "/fotos/tecshot.jpg",
        catalogFile: "granalha-aco-alto-carbono.pdf",
        fdsFile: "granalha-aco-alto-carbono.pdf",
        intro:
          "Granalha de aço alto carbono de produção própria, com controle metalúrgico e granulométrico lote a lote. Disponível nas versões esférica (Tecshot) e angular (Tecgrit), cada uma indicada para um tipo de acabamento.",
        subItems: [
          {
            slug: "tecshot",
            name: "Tecshot — Steel Shot esférica",
            description:
              "Granalha esférica de aço alto carbono para limpeza, shot peening e acabamento uniforme sem agredir a superfície.",
            detail: [
              "A Tecshot é a granalha de aço alto carbono esférica (Steel Shot) produzida pela Tecjato, indicada para limpeza, decapagem e shot peening.",
              "Seu formato esférico gera uma superfície limpa e levemente texturizada, sem ângulos agressivos, ideal para processos que exigem acabamento uniforme e aumento da resistência à fadiga.",
              "Características:",
              "• Produção própria com controle metalúrgico lote a lote",
              "• Alta durabilidade e baixo consumo",
              "• Granulometria controlada conforme a aplicação",
            ],
            image: "/fotos/tecshot.jpg",
            specFile: "tecshot.pdf",
          },
          {
            slug: "tecgrit",
            name: "Tecgrit — Steel Grit angular",
            description:
              "Granalha angular de aço alto carbono para decapagem agressiva, remoção de carepa e maior rugosidade de ancoragem.",
            detail: [
              "A Tecgrit é a granalha de aço alto carbono angular (Steel Grit) da Tecjato, indicada para decapagem agressiva e preparação de superfície com perfil de ancoragem acentuado.",
              "Seu formato angular remove carepa, ferrugem e revestimentos com rapidez, criando a rugosidade ideal para a aderência de tintas e revestimentos.",
              "Características:",
              "• Alto poder de corte e decapagem",
              "• Perfil de ancoragem controlado",
              "• Produção própria com qualidade consistente",
            ],
            image: "/fotos/tecgrit.jpg",
            specFile: "tecgrit.pdf",
          },
        ],
      },
      {
        slug: "micro-esfera-vidro",
        name: "Micro Esfera de Vidro",
        description:
          "Acabamento fosco acetinado e limpeza suave sem alterar a dimensão da peça. Ideal para inox e ligas não ferrosas.",
        image: "/fotos/micro-esfera-vidro.jpg",
        specFile: "micro-esfera-vidro.pdf",
      },
      {
        slug: "oxido-aluminio",
        name: "Óxido de Alumínio",
        description:
          "Abrasivo angular de alta dureza para decapagem agressiva, fosqueamento e preparação para revestimento.",
        image: "/fotos/oxido-aluminio.jpg",
        specFile: "oxido-aluminio.pdf",
      },
    ],
  },
  {
    id: "reposicao",
    label: "Peças",
    title: "Peças",
    tagline: "Componentes originais em estoque para minimizar parada de linha.",
    description:
      "Peças de reposição para equipamentos de jateamento, com estoque mantido em fábrica e a engenharia que projetou o equipamento por trás. Atendemos tanto a linha turbinada quanto a linha de ar comprimido.",
    imageAlt: "Peças de reposição em estoque na Tecjato",
    image: "/fotos/pecas.jpg",
    items: [
      {
        slug: "linha-turbinada",
        name: "Linha turbinada",
        description:
          "Palhetas, rotores, blades, distribuidores e demais componentes de desgaste para máquinas de turbina.",
      },
      {
        slug: "linha-ar-comprimido",
        name: "Linha ar comprimido",
        description:
          "Bicos, mangueiras, válvulas e componentes para sistemas de jateamento a ar comprimido.",
      },
    ],
  },
  {
    id: "assistencia",
    label: "Assistência técnica",
    title: "Assistência técnica especializada",
    tagline: "Manutenção, start-up e treinamento in loco.",
    description:
      "Assistência técnica especializada para manter o seu processo em operação: manutenção preventiva e corretiva, start-up de máquinas e treinamento da sua equipe in loco. Também somos distribuidora oficial Electronics Inc. (EUA) em shot peening para a América do Sul.",
    imageAlt: "Equipe de assistência técnica Tecjato em campo",
    image: "/fotos/assistencia-tec.jpg",
    items: [
      {
        slug: "manutencao",
        name: "Manutenção",
        description:
          "Manutenção preventiva e corretiva de equipamentos de jateamento, com peças originais e técnicos especializados.",
      },
      {
        slug: "start-up",
        name: "Start-up de máquinas",
        description:
          "Instalação, comissionamento e start-up de equipamentos novos, garantindo desempenho desde o primeiro ciclo.",
      },
      {
        slug: "treinamento",
        name: "Treinamento in loco",
        description:
          "Capacitação da sua equipe na operação e manutenção do equipamento, direto no seu chão de fábrica.",
      },
    ],
  },
];

export const productCategoryById = (
  id: ProductCategoryId
): ProductCategory =>
  productCategories.find((p) => p.id === id) ?? productCategories[0];

/** Busca um item (nível 3) por categoria + slug. Null se não existir. */
export const productItemBy = (
  categoryId: string,
  slug: string
): { category: ProductCategory; item: ProductItem } | null => {
  const category = productCategories.find((c) => c.id === categoryId);
  if (!category) return null;
  const item = category.items.find((it) => it.slug === slug);
  if (!item) return null;
  return { category, item };
};

/** Busca um sub-equipamento (nível 4) por categoria + item + slug. */
export const productSubItemBy = (
  categoryId: string,
  itemSlug: string,
  subSlug: string
): {
  category: ProductCategory;
  item: ProductItem;
  sub: ProductSubItem;
} | null => {
  const found = productItemBy(categoryId, itemSlug);
  if (!found) return null;
  const sub = found.item.subItems?.find((s) => s.slug === subSlug);
  if (!sub) return null;
  return { category: found.category, item: found.item, sub };
};

/** Busca uma variante (nível 5) por categoria + item + sub + slug. */
export const productVariantBy = (
  categoryId: string,
  itemSlug: string,
  subSlug: string,
  variantSlug: string
): {
  category: ProductCategory;
  item: ProductItem;
  sub: ProductSubItem;
  variant: ProductSubItem;
} | null => {
  const found = productSubItemBy(categoryId, itemSlug, subSlug);
  if (!found) return null;
  const variant = found.sub.subItems?.find((v) => v.slug === variantSlug);
  if (!variant) return null;
  return { ...found, variant };
};

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const nav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Produtos", href: "/produtos", hasDropdown: true },
  { label: "Contato", href: "/contato" },
];

export const home = {
  hero: {
    // Fixos em todos os slides do rodízio.
    eyebrow: "Preparação de superfícies desde 1987",
    ctaPrimary: "Solicitar cotação",
    /** Slides do herói rotativo (15s, cross-fade). Começa sempre no 1º. */
    slides: [
      {
        id: "maquinas",
        title: "Máquinas de jateamento e linha contínua",
        subtitle:
          "Projeto, fabricação e integração conforme a necessidade do seu processo.",
        image: "/fotos/maquinadejato_2.jpg",
        imageAlt: "Máquina de jateamento Tecjato em operação",
        interest: "equipamentos" as ProductCategoryId,
        ctaSecondary: "Conheça nossas máquinas",
        ctaSecondaryHref: "/produtos/equipamentos",
      },
      {
        id: "abrasivos",
        title: "Abrasivos de fundição própria",
        subtitle:
          "A granalha certa para cada tipo de jateamento, produzida na nossa fábrica.",
        image: "/fotos/granalhas_2.jpg",
        imageAlt: "Granalhas e abrasivos produzidos pela Tecjato",
        interest: "abrasivos" as ProductCategoryId,
        ctaSecondary: "Ver abrasivos",
        ctaSecondaryHref: "/produtos/abrasivos",
      },
      {
        id: "fundicao",
        title: "Fundição própria de peças de aço",
        subtitle:
          "Da matéria-prima à peça acabada, com controle total do processo.",
        image: "/fotos/Peças_2.avif",
        imageAlt: "Peças de aço fundidas pela Tecjato",
        interest: "reposicao" as ProductCategoryId,
        ctaSecondary: "Ver peças",
        ctaSecondaryHref: "/produtos/reposicao",
      },
      {
        id: "ecossistema",
        title: "Ecossistema completo de preparação de superfície",
        subtitle:
          "Máquinas, abrasivos, peças e assistência técnica em um só lugar.",
        image: "/fotos/equipe_feira_tec.JPG",
        imageAlt: "Equipe Tecjato em feira do setor industrial",
        interest: undefined,
        ctaSecondary: "Conheça a Tecjato",
        ctaSecondaryHref: "/quem-somos",
      },
      {
        id: "solucoes",
        title: "Soluções em jateamento industrial",
        subtitle:
          "Engenharia própria atendendo a América do Sul, a Europa e o Oriente Médio.",
        image: "/fotos/mapamundi_tec.jpg",
        imageAlt: "Presença global da Tecjato no mercado de jateamento",
        interest: undefined,
        ctaSecondary: "Ver produtos",
        ctaSecondaryHref: "/produtos",
      },
    ],
  },
  proof: [
    { value: "desde 1987", label: "fabricando no Brasil" },
    { value: "+2000", label: "clientes atendidos" },
    { value: "ISO 9001:2015", label: "qualidade certificada" },
    { value: "3 continentes", label: "América do Sul, Europa e Oriente Médio" },
  ],
  clientsStrip: {
    title: "Quem confia na Tecjato",
    subtitle: "Indústrias que dependem de preparação de superfície sem falha.",
  },
  about: {
    eyebrow: "Quem somos",
    title: "Uma fábrica que controla o processo inteiro.",
    paragraphs: [
      "A Tecjato nasceu em 1987, em São Paulo/SP, e cresceu fazendo o que poucos fabricantes fazem: dominar cada etapa da preparação de superfícies. Integrada ao Grupo Febratec, projeta máquinas de jateamento e linha contínua, funde as próprias peças, produz o próprio abrasivo e mantém estoque de reposição, tudo sob o mesmo teto.",
      "Essa verticalização, somada à certificação ISO 9001:2015 e à parceria oficial com a Electronics Inc. em shot peening, sustenta entregas confiáveis para a indústria na América do Sul, na Europa e no Oriente Médio.",
    ],
    cta: "Conheça nossa história",
  },
  productsGrid: {
    title: "O que a Tecjato fabrica",
    subtitle:
      "Cinco categorias que se sustentam: os equipamentos de jateamento e de pintura, o abrasivo que os alimenta, as peças de reposição e a assistência que os mantêm em operação.",
  },
  why: {
    title: "Por que Tecjato",
    reasons: [
      {
        title: "Verticalização com fundição própria",
        text: "Da peça fundida ao equipamento montado, controlamos cada etapa. Menos fornecedores, mais prazo cumprido e qualidade rastreável.",
      },
      {
        title: "Engenharia sob medida",
        text: "Cada máquina é dimensionada para a sua peça, o seu volume e o seu acabamento. Não vendemos catálogo, projetamos solução.",
      },
      {
        title: "Abrasivo próprio com controle metalúrgico",
        text: "Granalha de aço produzida internamente, com controle metalúrgico e granulométrico. Resultado de jateamento consistente, lote após lote.",
      },
      {
        title: "Shot peening e exportação habilitada",
        text: "Distribuidora oficial Electronics Inc. (EUA) para a América do Sul e habilitada no Siscomex para exportar. Tecnologia de ponta e alcance global.",
      },
    ],
  },
  certifications: {
    title: "Credenciais que garantem o seu processo",
  },
  testimonial: {
    quote:
      "Deixo registrado meus parabéns a toda a equipe envolvida no projeto e minha gratidão por mais um equipamento que vai elevar o nível de qualidade de nossos produtos.",
    author: "Fábio Bearzi",
    role: "Diretor da Aesa",
  },
  finalCta: {
    title: "Pronto para especificar a sua máquina?",
    subtitle:
      "Conte a sua aplicação. Nossa engenharia responde com uma proposta dimensionada para o seu processo.",
    cta: "Solicitar cotação",
  },
};

export const aboutPage = {
  title: "Quem somos",
  intro:
    "Há mais de três décadas, a Tecjato fabrica preparação de superfícies do jeito mais difícil e mais confiável: controlando cada etapa dentro de casa.",
  story: {
    title: "Nossa história",
    paragraphs: [
      "Tradição, inovação e qualidade em jateamento desde 1987. Com mais de três décadas de atuação, a Tecjato desenvolve, fabrica e fornece equipamentos e insumos para preparação de superfícies, shot peening e processos industriais especiais.",
      "Com engenharia própria, produção nacional e estrutura verticalizada, a Tecjato garante alto controle de qualidade em todas as etapas, da fundição à montagem final dos equipamentos.",
      "A empresa investe continuamente em tecnologia, laboratórios, capacitação técnica e melhoria de processos, entregando soluções confiáveis, duráveis e alinhadas às necessidades reais da indústria.",
      "Além disso, a Tecjato é distribuidora oficial da Electronics Inc. (EUA) para acessórios de shot peening na América do Sul.",
    ],
  },
  // Linha do tempo: 1987 é fato. Os marcos sem ano confirmado estão marcados
  // como placeholder para a Tecjato preencher — não inventamos datas.
  timeline: [
    {
      year: "1987",
      title: "O começo",
      text: "João e Guilherme Meduna fundam a Tecjato em São Paulo, na edícula de uma casa. Desde o primeiro dia, o propósito é claro: jateamento e preparação de superfícies para a indústria.",
    },
    {
      year: "2006",
      title: "A grande aposta",
      text: "Após quase vinte anos crescendo em SP, a Tecjato transfere a fábrica para Araquari/SC. A decisão que consolidou o futuro da empresa.",
    },
    {
      year: "2008",
      title: "Fundição própria",
      text: "Inauguração da fundição em Araquari. A Tecjato passa a produzir suas próprias peças, com controle total sobre qualidade e prazo.",
    },
    {
      year: "2012",
      title: "Abrasivo próprio",
      text: "Inauguração da fábrica de granalha de aço. A verticalização se completa: a mesma empresa que fabrica a máquina produz o abrasivo que ela usa.",
    },
    {
      year: "2015",
      title: "Perda e continuidade",
      text: "A Tecjato perde João Meduna, co-fundador e engenheiro que ergueu a empresa do zero. Guilherme Meduna, que construiu a Tecjato ao lado do pai desde o primeiro dia, segue em frente e conduz a equipe pelo período mais difícil da história da empresa.",
    },
    {
      year: "2018",
      title: "Retomada",
      text: "Superado o período de crise, a Tecjato retoma o crescimento com equipe, fábrica e portfólio mais maduros do que antes.",
    },
    {
      year: "2021–2026",
      title: "Crescimento acelerado",
      text: "Três turnos, sete dias por semana. Internalização de corte, dobra e caldeiraria. Expansão de 1.500 m² iniciada em 2025. A Tecjato chega a 2026 maior e mais integrada do que em qualquer outro momento da sua história.",
    },
  ],
  pillars: {
    title: "O que nos torna diferentes",
    items: [
      {
        title: "Verticalização real",
        text: "Da peça fundida ao equipamento montado, controlamos cada etapa — menos fornecedores, mais prazo cumprido.",
      },
      {
        title: "Engenharia sob medida",
        text: "Cada máquina é dimensionada para a peça, o volume e o acabamento do cliente. Projetamos solução, não catálogo.",
      },
      {
        title: "Qualidade certificada",
        text: "ISO 9001:2015 e controle metalúrgico do abrasivo garantem repetibilidade lote após lote.",
      },
      {
        title: "Tecnologia e alcance global",
        text: "Distribuidora oficial Electronics Inc. em shot peening e habilitada para exportar a três continentes.",
      },
    ],
  },
  cta: {
    title: "Quer conhecer a Tecjato de perto?",
    subtitle: "Fale com a nossa equipe e descubra como a verticalização trabalha a favor do seu processo.",
    button: "Solicitar cotação",
  },
};

export const productsPage = {
  title: "Produtos",
  intro:
    "Cinco categorias verticalizadas de preparação de superfícies. Escolha uma categoria para ver a linha completa e solicitar uma cotação — a engenharia responde com proposta sob medida.",
  itemsHeading: "O que essa categoria inclui",
  cardCta: "Ver linha completa",
  backToProducts: "Todos os produtos",
  otherCategories: "Outras categorias",
};

export const clientsPage = {
  title: "Clientes",
  intro:
    "Atendemos indústrias que não admitem falha na preparação de superfície, no Brasil e no exterior.",
  sectors: {
    title: "Setores atendidos",
    items: ["Metalurgia", "Automotivo", "Aeroespacial", "Fundições"],
  },
  caseStudy: {
    title: "Caso de aplicação",
    body: "[Placeholder — caso de aplicação real a ser inserido. Descrever desafio do cliente, solução Tecjato e resultado medido.]",
  },
  testimonials: [
    {
      quote:
        "[Placeholder — depoimento real de cliente a ser inserido.]",
      author: "Nome do cliente",
      role: "Cargo — Empresa",
    },
    {
      quote:
        "[Placeholder — depoimento real de cliente a ser inserido.]",
      author: "Nome do cliente",
      role: "Cargo — Empresa",
    },
  ],
};

export const certificationsPage = {
  title: "Certificações",
  intro:
    "Credenciais auditadas que garantem qualidade, tecnologia e capacidade de exportação.",
  items: [
    {
      title: "ISO 9001:2015",
      text: "Sistema de gestão da qualidade certificado. Garante processos controlados, rastreabilidade e melhoria contínua em cada equipamento e lote de abrasivo que sai da fábrica.",
    },
    {
      title: "Distribuidora oficial Electronics Inc.",
      text: "Distribuidora oficial Electronics Inc. (EUA) para shot peening na América do Sul. Garante acesso à tecnologia de referência mundial em tratamento de fadiga e ao suporte do fabricante original.",
    },
    {
      title: "Habilitação de exportação (Siscomex)",
      text: "Empresa habilitada no Siscomex para exportar. Garante operação de comércio exterior regular e entrega de máquinas e abrasivos para América do Sul, Europa e Oriente Médio.",
    },
  ],
};

export const contactPage = {
  title: "Contato",
  intro:
    "Fale com a engenharia da Tecjato. Solicite uma cotação ou tire dúvidas sobre a sua aplicação.",
  reps: {
    title: "Representantes",
    body: "Atendemos por representantes em diversas regiões. Informe a sua localização no formulário e direcionamos você ao contato mais próximo.",
    internalLinkLabel: "Acesso interno — Representantes",
  },
};

export const quoteForm = {
  title: "Solicitar cotação",
  subtitle: "Conte a sua aplicação. Respondemos com proposta dimensionada.",
  fields: {
    name: "Nome",
    company: "Empresa",
    email: "E-mail",
    phone: "Telefone / WhatsApp",
    country: "País",
    interest: "Interesse",
    interestPlaceholder: "Selecione uma categoria",
    message: "Mensagem",
    messagePlaceholder: "Descreva sua aplicação",
  },
  submit: "Enviar cotação",
  submitting: "Enviando…",
  success: {
    title: "Cotação enviada com sucesso",
    body: "Recebemos a sua solicitação e enviamos uma confirmação ao seu e-mail. Nossa equipe responde em breve.",
    again: "Enviar outra cotação",
  },
  error: {
    title: "Não foi possível enviar",
    body: "Ocorreu um erro no envio. Tente novamente ou fale conosco pelo WhatsApp.",
    retry: "Tentar novamente",
    whatsapp: "Falar no WhatsApp",
  },
};

export const footer = {
  tagline: "Preparação de superfícies verticalizada desde 1987.",
  internalLinkLabel: "Acesso interno — Representante",
  internalLinkHref: "https://desk.auvo.com.br/Login",
  rights: "Tecjato — Grupo Febratec. Todos os direitos reservados.",
  resourcesLabel: "Recursos e downloads",
  resourcesHref: "/recursos",
};

/** Certificados institucionais em /public/documentos/certificados/. */
export const certificates: { name: string; file: string }[] = [
  { name: "Certificado ISO 9001:2015", file: "certificado-iso-9001.pdf" },
];

export const resourcesPage = {
  title: "Recursos e downloads",
  intro:
    "Certificados, catálogos, fichas de segurança e especificações técnicas dos nossos produtos, organizados por categoria.",
  certificatesLabel: "Certificados",
  catalogsLabel: "Catálogos",
  safetyLabel: "Fichas de dados de segurança (FDS)",
  specsLabel: "Especificações técnicas — Abrasivos",
  download: "Baixar",
  downloadsTitle: "Downloads",
  viewAll: "Ver recursos e downloads",
};
