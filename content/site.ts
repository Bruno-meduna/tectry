// ============================================================================
// Conteúdo do site Tecjato — fonte única de textos (i18n-ready).
// v1 publica apenas em português. Para adicionar inglês, replicar a estrutura
// em `content/site.en.ts` e selecionar pelo locale. Nada de copy hardcoded fora
// daqui (com exceção de labels triviais de UI já isolados nos componentes).
// ============================================================================

export type ProductCategoryId =
  | "equipamentos"
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
}

/** Item dentro de uma categoria (nível 2 do fluxo, estilo Winoa). */
export interface ProductItem {
  /** Âncora dentro da página da categoria. */
  slug: string;
  name: string;
  description: string;
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
              "As gancheiras Tecjato são ideais para o jateamento de peças de alta produção que não possam sofrer tombamento.",
              "A série MGF é compacta, versátil e oferece excelente custo-benefício. O gancho é montado na porta do compartimento de jato. Possui duas turbinas com acionamento direto pelo motor.",
              "A série MOF pode ter uma ou mais turbinas, monovia em Y, T ou L (monovia em circuito fechado). O gancho tem capacidade de peso adequada para cada caso específico.",
            ],
            image: "/fotos/gan1.avif",
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
            image: "/fotos/turbinado_mesa_rotativa.jpg",
          },
          {
            slug: "shot-peening",
            name: "Shot peening",
            description:
              "As máquinas de “shot peening” da Tecjato são equipadas com componentes de última geração para ótimo controle do processo.",
            detail: [
              "As máquinas Tecjato de “shot peening” realizam um trabalho de martelamento da superfície das peças induzindo-as a tensões residuais previamente estabelecidas com o objetivo de aumentar a resistência à fadiga. Este processo tornou-se indispensável na fabricação de molas helicoidais, engrenagens, rodas dentadas, virabrequim entre outros.",
            ],
            image: "/fotos/turbinado_shot_peening.avif",
          },
          {
            slug: "monovias",
            name: "Monovias",
            description:
              "Utilizadas em linhas de peças com alta produtividade e em geral utilizam elevado número de turbinas.",
            detail: [
              "As Monovias de Linha Contínua são muito utilizadas em linhas de peças com alta produtividade e em geral utilizam elevado número de turbinas.",
              "Têm como principal característica a automatização do processo produtivo, tornando o ambiente de trabalho mais seguro devido à redução de contato humano, eficiente por causa da uniformidade do processo e econômico em função de desprezar a necessidade de uma estocagem entre processos.",
            ],
            image: "/fotos/turbinado_monovias.avif",
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
            image: "/fotos/turbinado_esteira_horizontal.avif",
          },
          {
            slug: "esteira-tamboreadora",
            name: "Esteira tamboreadora",
            description:
              "As máquinas de jateamento tipo esteira tamboreadora limpam com rapidez e eficiência grande quantidade de peças que possam ser tombadas.",
            detail: [
              "Os equipamentos de jateamento tipo esteira tamboreadora são destinados à limpeza, rebarbação, “shot peening” e acabamento superficial de peças forjadas, fundidas, laminadas, entre outras peças que possam ser tombadas. A esteira pode ser de aço – TBA ou borracha – TBB.",
              "O compartimento de jateamento é revestido com materiais altamente resistentes à abrasão, garantindo durabilidade ao equipamento.",
              "Este equipamento está disponível em várias capacidades, existindo sempre uma adequada a cada cliente.",
            ],
            image: "/fotos/turbinado_esteira_tamboreadora.avif",
          },
          {
            slug: "decapagem-tubos-barras",
            name: "Decapagem de tubos e barras",
            description:
              "Os equipamentos para decapagem mecânica Tecjato são projetados para limpeza, decapagem mecânica e tratamento de superfície de peças.",
            detail: [
              "Os equipamentos para decapagem mecânica Tecjato são projetados para limpeza, decapagem mecânica e tratamento de superfície de peças como:",
              "• Chapas",
              "• Tubos",
              "• Barras",
              "• Vigas",
              "• Perfis",
              "• Estrutura metálica em geral",
              "As máquinas oferecem alto rendimento e baixo custo operacional, existindo sempre um modelo adequado à sua necessidade de produção, podendo incluir sistema de carga e descarga automático.",
              "O compartimento de jateamento é completamente revestido com materiais resistentes à abrasão.",
            ],
            image: "/fotos/turbinado_decapagem_tubos_barras.avif",
          },
          {
            slug: "jateamento-botijoes-gas",
            name: "Jateamento de botijões de gás",
            description:
              "Os equipamentos para jateamento de botijões de gás Tecjato são altamente eficientes para jateamento em larga escala.",
            detail: [
              "Os equipamentos para jateamento de botijões de gás Tecjato são altamente eficientes para jateamento em larga escala. Sua construção modular e os opcionais da linha facilitam a integração em instalações já existentes.",
              "Diferenciais:",
              "• Roletes cônicos: movimentação inteligente e econômica, admite os modelos de botijões P-13, P-20 e P-45 para jateamento contínuo.",
              "• Turbinas de alto desempenho Tecjato: concebidas em uma fundição dedicada a ligas resistentes à abrasão na própria empresa, com certificação de qualidade ISO 9001.",
              "• Baixo custo operacional: nossos equipamentos são dotados de sistemas calculados buscando maior equilíbrio entre custo operacional e produtividade.",
            ],
            image: "/fotos/turbinado_botijoes_gas.avif",
          },
        ],
      },
      {
        slug: "linha-completa",
        name: "Linha completa: jateamento + pintura",
        description:
          "Linha integrada de preparação de superfície e pintura, projetada de ponta a ponta pela mesma engenharia.",
        image: "/fotos/Pintura_turbinado.jpg",
        heroImage: "/fotos/Pintura_1.avif",
        intro:
          "Linha integrada de preparação de superfície e pintura, projetada de ponta a ponta pela mesma engenharia Tecjato. Escolha a tecnologia de pintura mais adequada ao seu produto e ao seu volume de produção.",
        subItems: [
          {
            slug: "cabine-pintura-eletrostatica-po",
            name: "Cabine de pintura eletrostática a pó",
            description:
              "Aplicação eletrostática de tinta em pó para acabamento uniforme, alta aderência e excelente aproveitamento de material.",
            detail: [
              "As cabines de pintura eletrostática a pó Tecjato aplicam tinta em pó carregada eletrostaticamente sobre a peça aterrada, garantindo uma camada uniforme com alta aderência e ótimo aproveitamento de material.",
              "Após a aplicação, a peça segue para a cura em estufa, formando um revestimento resistente à corrosão, ao impacto e à abrasão.",
              "Características:",
              "• Alto aproveitamento de tinta com sistema de recuperação de pó",
              "• Acabamento uniforme e resistente",
              "• Processo limpo, sem solventes",
              "• Fácil integração com a linha de jateamento",
            ],
            image: "/fotos/Cabine_de_pintura_cad.jpg",
          },
          {
            slug: "pintura-a-seco",
            name: "Pintura a seco",
            description:
              "Processo de pintura a pó sem uso de solventes, ideal para acabamentos resistentes e ambientes mais limpos.",
            detail: [
              "A pintura a seco utiliza tintas em pó aplicadas sem o uso de solventes, resultando em um processo mais limpo, seguro e com menor impacto ambiental.",
              "Indicada para peças que exigem acabamento resistente e durável, é integrada à linha de preparação de superfície para um fluxo de produção contínuo.",
              "Vantagens:",
              "• Sem emissão de solventes",
              "• Camada espessa e resistente em uma única aplicação",
              "• Menor desperdício de material",
            ],
            image: "/fotos/Pintura_turbinado.jpg",
          },
          {
            slug: "pintura-liquida",
            name: "Pintura líquida",
            description:
              "Aplicação de tintas líquidas para acabamentos versáteis, com ampla gama de cores e texturas.",
            detail: [
              "A pintura líquida Tecjato oferece grande versatilidade de cores, brilhos e texturas, sendo indicada para peças que exigem acabamento estético diferenciado ou especificações técnicas específicas.",
              "As cabines são projetadas com sistemas de exaustão e filtragem que garantem segurança ao operador e qualidade no acabamento.",
              "Aplicações:",
              "• Peças com geometria complexa",
              "• Acabamentos especiais e cores personalizadas",
              "• Integração com linhas de jateamento e secagem",
            ],
            image: "/fotos/Pintura_1.avif",
          },
        ],
      },
      {
        slug: "jateamento-ar-comprimido",
        name: "Jateamento por ar comprimido",
        description:
          "Cabines e sistemas a ar comprimido para peças complexas, áreas internas e acabamento controlado.",
        image: "/fotos/arcomprimido_1.jpg",
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
          },
        ],
      },
      {
        slug: "micro-esfera-vidro",
        name: "Micro Esfera de Vidro",
        description:
          "Acabamento fosco acetinado e limpeza suave sem alterar a dimensão da peça. Ideal para inox e ligas não ferrosas.",
      },
      {
        slug: "oxido-aluminio",
        name: "Óxido de Alumínio",
        description:
          "Abrasivo angular de alta dureza para decapagem agressiva, fosqueamento e preparação para revestimento.",
      },
      {
        slug: "granalha-inox-fundida",
        name: "Granalha de Aço Inox Fundida",
        description:
          "Versões angular e esférica em aço inoxidável fundido, para jateamento sem contaminação ferrosa.",
        intro:
          "Granalha de aço inoxidável fundido para jateamento sem contaminação ferrosa, indicada para inox, alumínio e ligas não ferrosas. Disponível nas versões esférica e angular, conforme o acabamento desejado.",
        subItems: [
          {
            slug: "inox-esferica",
            name: "Inox Esférica",
            description:
              "Granalha de inox fundido esférica para limpeza e acabamento sem contaminação ferrosa, preservando a dimensão da peça.",
            detail: [
              "A granalha de aço inox fundida esférica é indicada para limpeza e acabamento de peças em inox, alumínio e ligas não ferrosas, sem o risco de contaminação ferrosa.",
              "O formato esférico proporciona um acabamento uniforme e suave, preservando as dimensões da peça.",
              "Características:",
              "• Sem contaminação ferrosa",
              "• Acabamento uniforme e limpo",
              "• Alta resistência à oxidação",
            ],
          },
          {
            slug: "inox-angular",
            name: "Inox Angular",
            description:
              "Granalha de inox fundido angular para decapagem e fosqueamento sem risco de oxidação na peça.",
            detail: [
              "A granalha de aço inox fundida angular é indicada para decapagem e fosqueamento de peças não ferrosas, com perfil de ancoragem mais acentuado e sem contaminação ferrosa.",
              "Seu formato angular oferece maior poder de corte para remoção de óxidos e preparação de superfície.",
              "Características:",
              "• Maior poder de corte e rugosidade",
              "• Sem contaminação ferrosa",
              "• Ideal para inox e ligas não ferrosas",
            ],
          },
        ],
      },
      {
        slug: "arame-inox-cortado",
        name: "Granalha de Arame Inox Cortado",
        description:
          "Cut Wire em aço inox: alta resistência e vida útil prolongada, sem risco de oxidação na peça.",
      },
      {
        slug: "arame-cortado",
        name: "Granalha de Arame Carbono Cortado",
        description:
          "Carbon Cut Wire em aço carbono: uniformidade dimensional e durabilidade para grandes volumes.",
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
        image: "/fotos/mapamundi_tec.png",
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
      "Quatro categorias que se sustentam: o equipamento, o abrasivo que o alimenta, as peças de reposição e a assistência que o mantêm em operação.",
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
    "Quatro categorias verticalizadas de preparação de superfícies. Escolha uma categoria para ver a linha completa e solicitar uma cotação — a engenharia responde com proposta sob medida.",
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
};
