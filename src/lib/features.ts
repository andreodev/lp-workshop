export type FeaturePage = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  explanation: string;
  benefits: { title: string; text: string }[];
  workflow: { title: string; text: string }[];
  faqs: [string, string][];
  related: string[];
};

// Product claims come from the existing public landing page, not from demo data.
export const featurePages: Record<string, FeaturePage> = {
  'sistema-para-oficina-mecanica': {
    title: 'Sistema para oficina mecânica | Ofixy',
    description: 'Conheça o Ofixy: sistema para oficina mecânica com clientes, veículos, orçamentos, ordens de serviço, estoque e financeiro. Solicite uma demonstração.',
    h1: 'Sistema para oficina mecânica: conheça o Ofixy',
    intro: 'O Ofixy é um software de gestão para oficinas mecânicas que conecta o atendimento, a execução dos serviços e o controle financeiro em uma plataforma web.',
    explanation: 'Quando cadastros, orçamentos e informações do caixa ficam espalhados, a equipe precisa procurar dados antes de atender. O Ofixy reúne clientes, veículos, propostas, ordens de serviço, estoque, compras e financeiro para acompanhar a rotina da oficina com mais contexto.',
    benefits: [
      { title: 'Atendimento com histórico', text: 'Consulte os dados do cliente, do veículo e dos serviços anteriores antes de preparar uma proposta.' },
      { title: 'Operação acompanhada por etapas', text: 'Organize orçamentos, acompanhe a aprovação e visualize os serviços e os responsáveis por cada ordem.' },
      { title: 'Visão da gestão', text: 'Acompanhe estoque, vendas, contas e indicadores por período para apoiar as decisões da oficina.' },
    ],
    workflow: [
      { title: 'Organize o atendimento', text: 'Reúna clientes e veículos, acompanhe solicitações e organize os atendimentos e agendamentos.' },
      { title: 'Prepare e acompanhe os serviços', text: 'Monte orçamentos com produtos e serviços. Após a aprovação, transforme a proposta em uma ordem de serviço e acompanhe a execução.' },
      { title: 'Consulte a operação e o financeiro', text: 'Use os registros de estoque, compras, vendas, contas a pagar e a receber e os relatórios para entender o andamento do negócio.' },
    ],
    faqs: [
      ['Para quem é o Ofixy?', 'O Ofixy é voltado à gestão de oficinas mecânicas, autocenters e centros automotivos que precisam organizar atendimento, serviços, estoque e financeiro.'],
      ['Minha equipe pode usar o sistema?', 'Sim. O Ofixy permite cadastrar usuários e mecânicos, organizar níveis de acesso e acompanhar informações de comissão. Na demonstração, a equipe explica como esses recursos se aplicam à sua oficina.'],
      ['Como conhecer o sistema e consultar valores?', 'Entre em contato pelo WhatsApp comercial do Ofixy. A equipe apresenta os recursos, consulta as necessidades da sua oficina e combina uma demonstração. O primeiro passo é conversar com a equipe.'],
      ['Qual é o site oficial do Ofixy?', 'O site oficial do Ofixy, software de gestão para oficinas mecânicas, é https://www.ofixy.com.br/. O acesso ao sistema fica em https://app.ofixy.com.br.'],
    ],
    related: ['ordem-de-servico', 'orcamentos', 'controle-de-estoque', 'gestao-financeira', 'agendamentos'],
  },
  'ordem-de-servico': {
    title: 'Ordem de serviço para oficina mecânica | Ofixy',
    description: 'Organize ordens de serviço da oficina com o Ofixy. Acompanhe execução, itens e responsáveis e consulte o histórico de clientes e veículos.',
    h1: 'Ordem de serviço para oficina mecânica',
    intro: 'No Ofixy, a ordem de serviço ajuda a acompanhar o trabalho da oficina, reunindo os itens do serviço e os responsáveis pela execução.',
    explanation: 'Depois que o cliente aprova o orçamento, começa o acompanhamento do serviço. O Ofixy permite converter orçamentos aprovados em ordens de serviço e acompanhar o que está em execução. O histórico do cliente e do veículo oferece contexto para o atendimento e para a equipe.',
    benefits: [
      { title: 'Continuidade após a aprovação', text: 'Transforme um orçamento aprovado em ordem de serviço para dar sequência ao atendimento.' },
      { title: 'Responsáveis identificados', text: 'Registre itens e responsáveis para consultar quem acompanha cada serviço na oficina.' },
      { title: 'Histórico e vistoria', text: 'Consulte serviços anteriores e utilize checklists de vistoria vinculados ao veículo para apoiar o acompanhamento.' },
    ],
    workflow: [
      { title: 'Parta do orçamento aprovado', text: 'Use a proposta aprovada pelo cliente como ponto de partida para a ordem de serviço.' },
      { title: 'Acompanhe a execução', text: 'Consulte os serviços em andamento, os itens registrados e os responsáveis. Assim, o atendimento pode verificar o andamento antes de responder ao cliente.' },
      { title: 'Mantenha o contexto do veículo', text: 'Consulte o cadastro e o histórico dos serviços em atendimentos posteriores. Os checklists de vistoria ajudam a registrar informações vinculadas ao veículo.' },
    ],
    faqs: [
      ['Qual a diferença entre orçamento e ordem de serviço?', 'O orçamento apresenta ao cliente a proposta com produtos e serviços. A ordem de serviço acompanha o trabalho a executar após a aprovação. No Ofixy, um orçamento aprovado pode ser convertido em ordem de serviço.'],
      ['Consigo acompanhar quem está responsável pelo serviço?', 'Sim. O Ofixy permite registrar responsáveis e itens dos serviços, ajudando a acompanhar o trabalho da equipe.'],
      ['O sistema permite usar checklists de vistoria?', 'Sim. O Ofixy oferece checklists de vistoria vinculados ao veículo. Solicite uma demonstração para conhecer o preenchimento e a consulta na rotina da oficina.'],
    ],
    related: ['orcamentos', 'agendamentos', 'sistema-para-oficina-mecanica'],
  },
  orcamentos: {
    title: 'Orçamentos para oficina mecânica | Ofixy',
    description: 'Monte orçamentos com produtos e serviços no Ofixy, compartilhe por PDF, WhatsApp ou e-mail e converta propostas aprovadas em ordens de serviço.',
    h1: 'Orçamentos para oficina mecânica',
    intro: 'Prepare propostas com produtos e serviços, compartilhe com o cliente e acompanhe o status até a aprovação com o Ofixy.',
    explanation: 'Um orçamento precisa deixar claro o que está sendo proposto para o veículo. No Ofixy, a oficina monta a proposta com produtos e serviços e pode compartilhá-la por PDF, WhatsApp ou e-mail. Depois da aprovação, o orçamento pode se tornar uma ordem de serviço para dar continuidade ao trabalho.',
    benefits: [
      { title: 'Proposta organizada', text: 'Reúna os produtos e os serviços do orçamento para apresentar ao cliente o que a oficina propõe executar.' },
      { title: 'Compartilhamento com o cliente', text: 'Envie a proposta por PDF, WhatsApp ou e-mail, de acordo com a forma de contato utilizada no atendimento.' },
      { title: 'Acompanhamento da aprovação', text: 'Consulte o status da proposta e transforme orçamentos aprovados em ordens de serviço.' },
    ],
    workflow: [
      { title: 'Monte a proposta', text: 'Consulte os cadastros do cliente e do veículo e inclua os produtos e serviços necessários no orçamento.' },
      { title: 'Compartilhe e acompanhe', text: 'Apresente a proposta pelo canal adequado ao cliente e acompanhe seu status. Isso ajuda a oficina a identificar quais propostas ainda aguardam uma definição.' },
      { title: 'Continue com a ordem de serviço', text: 'Após a aprovação, converta o orçamento em ordem de serviço para acompanhar a execução com a equipe.' },
    ],
    faqs: [
      ['Posso enviar o orçamento pelo WhatsApp?', 'Sim. O Ofixy permite compartilhar orçamentos pelo WhatsApp e também por PDF ou e-mail.'],
      ['O orçamento pode incluir peças e mão de obra?', 'Você pode montar a proposta com produtos e serviços. Na demonstração, peça à equipe para mostrar um orçamento com os itens usados pela sua oficina.'],
      ['Preciso criar a ordem de serviço do zero depois da aprovação?', 'O Ofixy permite converter o orçamento aprovado em uma ordem de serviço, dando sequência ao acompanhamento do trabalho.'],
    ],
    related: ['ordem-de-servico', 'controle-de-estoque', 'gestao-financeira'],
  },
  'controle-de-estoque': {
    title: 'Controle de estoque para oficina mecânica | Ofixy',
    description: 'Organize peças, movimentações e níveis de estoque com o Ofixy. Gerencie fornecedores e pedidos de compra da oficina. Conheça em uma demonstração.',
    h1: 'Controle de estoque para oficina mecânica',
    intro: 'O Ofixy reúne produtos, movimentações, níveis de estoque, fornecedores e pedidos de compra para acompanhar as peças da oficina.',
    explanation: 'Antes de preparar um orçamento ou planejar uma compra, a oficina precisa conhecer os itens que mantém em estoque. O Ofixy ajuda a organizar os cadastros e consultar as movimentações e os níveis de estoque, junto às informações de fornecedores e pedidos de compra.',
    benefits: [
      { title: 'Produtos organizados', text: 'Mantenha o cadastro dos produtos para consultar as peças utilizadas na rotina da oficina.' },
      { title: 'Visibilidade das movimentações', text: 'Acompanhe movimentações e níveis de estoque para apoiar a conferência dos itens disponíveis.' },
      { title: 'Compras com contexto', text: 'Organize fornecedores e pedidos de compra para reunir as informações de reposição em um só lugar.' },
    ],
    workflow: [
      { title: 'Organize os cadastros', text: 'Cadastre os produtos e mantenha as informações dos fornecedores disponíveis para consulta pela equipe.' },
      { title: 'Acompanhe os níveis e as movimentações', text: 'Consulte os registros de estoque antes de decidir o que precisa ser comprado. Use essas informações para orientar a conferência da operação.' },
      { title: 'Planeje a reposição', text: 'Organize pedidos de compra e consulte os fornecedores para acompanhar a reposição das peças usadas pela oficina.' },
    ],
    faqs: [
      ['Consigo acompanhar as movimentações de peças?', 'Sim. O Ofixy permite organizar produtos, movimentações e níveis de estoque para apoiar o controle da oficina.'],
      ['O Ofixy também organiza fornecedores e compras?', 'Sim. Fornecedores e pedidos de compra fazem parte dos recursos de gestão da plataforma.'],
      ['Como conferir se o estoque atende à rotina da minha oficina?', 'Solicite uma demonstração pelo WhatsApp e apresente à equipe os tipos de peças e a forma como você acompanha as compras. A equipe pode mostrar os cadastros, as movimentações e os pedidos de compra.'],
    ],
    related: ['orcamentos', 'ordem-de-servico', 'gestao-financeira'],
  },
  'gestao-financeira': {
    title: 'Gestão financeira para oficina mecânica | Ofixy',
    description: 'Acompanhe contas a pagar e a receber, entradas, saídas, fluxo de caixa, resultado e ticket médio da oficina com o Ofixy. Solicite uma demonstração.',
    h1: 'Gestão financeira para oficina mecânica',
    intro: 'O Ofixy reúne recebimentos, contas a pagar e a receber, entradas, saídas e fluxo de caixa para acompanhar o financeiro da oficina.',
    explanation: 'O movimento da oficina precisa ser acompanhado junto às informações do caixa. O Ofixy permite consultar entradas, saídas, contas e indicadores por período. A plataforma também reúne vendas pelo PDV, relatórios, resultado e ticket médio para apoiar a análise da operação.',
    benefits: [
      { title: 'Compromissos à vista', text: 'Acompanhe contas a pagar e a receber para consultar as obrigações e os recebimentos da oficina.' },
      { title: 'Caixa acompanhado', text: 'Consulte entradas, saídas e fluxo de caixa por período para entender a movimentação financeira.' },
      { title: 'Indicadores para decidir', text: 'Use relatórios, resultado e ticket médio como apoio para avaliar a operação com dados registrados no sistema.' },
    ],
    workflow: [
      { title: 'Organize as informações financeiras', text: 'Acompanhe vendas, recebimentos e contas a pagar e a receber no sistema, mantendo o contexto da operação disponível para consulta.' },
      { title: 'Consulte o movimento por período', text: 'Analise entradas, saídas e fluxo de caixa no período escolhido para compreender a movimentação da oficina.' },
      { title: 'Avalie os indicadores', text: 'Consulte resultado, ticket médio e relatórios para apoiar as decisões de gestão. A leitura depende dos registros mantidos pela sua equipe.' },
    ],
    faqs: [
      ['O Ofixy controla contas a pagar e a receber?', 'Sim. A plataforma reúne contas a pagar e a receber, recebimentos, entradas e saídas para acompanhar o financeiro da oficina.'],
      ['Posso consultar o fluxo de caixa por período?', 'Sim. O Ofixy permite acompanhar fluxo de caixa, resultado e ticket médio por período, além de relatórios e análise visual dos dados.'],
      ['A plataforma possui ponto de venda?', 'Sim. O Ofixy inclui vendas pelo PDV. Na demonstração, a equipe pode apresentar o fluxo de venda e os recursos financeiros disponíveis.'],
    ],
    related: ['controle-de-estoque', 'orcamentos', 'sistema-para-oficina-mecanica'],
  },
  agendamentos: {
    title: 'Agendamentos para oficina mecânica | Ofixy',
    description: 'Organize atendimentos e agendamentos da oficina com o Ofixy. Receba solicitações pela página pública e acompanhe contatos por etapas.',
    h1: 'Agendamentos e atendimentos para oficina mecânica',
    intro: 'Organize os atendimentos e agendamentos da oficina e acompanhe os contatos por etapas com o Ofixy.',
    explanation: 'O atendimento começa antes da entrada do veículo na oficina. O Ofixy permite receber solicitações pela página pública da oficina e acompanhar os contatos por etapas. Com cadastros e histórico de clientes e veículos disponíveis, a equipe pode consultar informações para dar continuidade à conversa.',
    benefits: [
      { title: 'Solicitações reunidas', text: 'Receba solicitações pela página pública da oficina e organize o acompanhamento dos contatos.' },
      { title: 'Atendimento por etapas', text: 'Acompanhe a evolução dos contatos para consultar em que ponto está cada atendimento.' },
      { title: 'Mais contexto na conversa', text: 'Consulte os dados do cliente, do veículo e dos serviços anteriores ao preparar o próximo atendimento.' },
    ],
    workflow: [
      { title: 'Receba o contato', text: 'A página pública da oficina recebe solicitações que a equipe pode acompanhar no processo de atendimento.' },
      { title: 'Organize a continuidade', text: 'Acompanhe contatos por etapas e organize atendimentos e agendamentos conforme a rotina da sua equipe.' },
      { title: 'Consulte o histórico e prepare a proposta', text: 'Use os cadastros e o histórico para entender o contexto do veículo antes de preparar um orçamento com os produtos e serviços necessários.' },
    ],
    faqs: [
      ['A oficina pode receber solicitações por uma página pública?', 'Sim. O Ofixy permite receber solicitações pela página pública da oficina e acompanhar os contatos por etapas.'],
      ['Posso organizar atendimentos e agendamentos?', 'Sim. Esses recursos fazem parte do Ofixy. Solicite uma demonstração para conhecer a organização do atendimento conforme a rotina da sua oficina.'],
      ['Consigo consultar o histórico do cliente durante o atendimento?', 'Sim. A plataforma reúne cadastros, contatos e histórico de serviços de clientes e veículos para apoiar o atendimento.'],
      ['Como conhecer a agenda do Ofixy?', 'Converse com a equipe pelo WhatsApp comercial e solicite uma demonstração. Explique como sua oficina organiza os atendimentos para conhecer o fluxo mais adequado à sua rotina.'],
    ],
    related: ['orcamentos', 'ordem-de-servico', 'sistema-para-oficina-mecanica'],
  },
};
