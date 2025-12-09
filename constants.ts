import { Category, DocStatus } from './types';

export const INITIAL_DATA: Category[] = [
  {
    id: '1',
    title: '1. Documentos Pessoais Básicos',
    items: [
      { id: '1-1', text: 'Passaporte válido (e passaportes antigos com vistos anteriores, se houver)', status: DocStatus.PENDING },
      { id: '1-2', text: 'Página de confirmação do DS-160', status: DocStatus.PENDING },
      { id: '1-3', text: 'Comprovante de pagamento da taxa MRV', status: DocStatus.PENDING },
      { id: '1-4', text: 'Página de confirmação do agendamento', status: DocStatus.PENDING },
      { id: '1-5', text: 'Documento de identidade (RG ou CNH) para conferência', status: DocStatus.PENDING },
    ]
  },
  {
    id: '2',
    title: '2. Comprovação de Vínculo Familiar',
    items: [
      { id: '2-1', text: 'Certidão de casamento (original ou cópia autenticada)', status: DocStatus.PENDING },
    ]
  },
  {
    id: '3',
    title: '3. Documentos da Empresa (Sócio/Proprietário)',
    items: [
      { id: '3-1', text: 'Contrato social e última alteração contratual', status: DocStatus.PENDING },
      { id: '3-2', text: 'Comprovante de Inscrição e Situação Cadastral do CNPJ', status: DocStatus.PENDING },
      { id: '3-3', text: 'Comprovante de endereço comercial', status: DocStatus.PENDING },
      { id: '3-4', text: 'Extratos bancários da empresa (últimos 3–6 meses)', status: DocStatus.PENDING },
      { id: '3-5', text: 'Demonstrativo de resultados ou balancete contábil', status: DocStatus.PENDING },
      { id: '3-6', text: 'Comprovantes de pró-labore', status: DocStatus.PENDING },
      { id: '3-7', text: 'Notas fiscais recentes emitidas pela empresa', status: DocStatus.PENDING },
      { id: '3-8', text: 'Declaração da contabilidade confirmando sua função e que a empresa está ativa', status: DocStatus.PENDING },
    ]
  },
  {
    id: '4',
    title: '4. Comprovação Financeira Pessoal',
    items: [
      { id: '4-1', text: 'Extratos bancários pessoais (últimos 3–6 meses)', status: DocStatus.PENDING },
      { id: '4-2', text: 'Extratos de investimentos (CDB, Tesouro, previdência, ações etc.)', status: DocStatus.PENDING },
      { id: '4-3', text: 'Declaração de Imposto de Renda Pessoa Física (IRPF)', status: DocStatus.PENDING },
      { id: '4-4', text: 'Documentos de bens: imóveis, veículos, contratos de aluguel etc.', status: DocStatus.PENDING },
    ]
  },
  {
    id: '5',
    title: '5. Comprovação de Vínculos com o Brasil',
    items: [
      { id: '5-1', text: 'Comprovantes de propriedades (casas, terrenos, lotes)', status: DocStatus.PENDING },
      { id: '5-2', text: 'Contas de consumo no seu nome (água, luz, internet)', status: DocStatus.PENDING },
      { id: '5-3', text: 'Contratos empresariais ativos que exijam sua presença', status: DocStatus.PENDING },
      { id: '5-4', text: 'Comprovantes de residência', status: DocStatus.PENDING },
    ]
  },
  {
    id: '6',
    title: '6. Documentos Relacionados à Viagem',
    items: [
      { id: '6-1', text: 'Roteiro estimado da viagem', status: DocStatus.PENDING },
      { id: '6-2', text: 'Reserva de hospedagem (hotel/Airbnb)', status: DocStatus.PENDING },
      { id: '6-3', text: 'Passagens aéreas (se já compradas)', status: DocStatus.PENDING },
      { id: '6-4', text: 'Comprovante de viagem em grupo/família, se aplicável', status: DocStatus.PENDING },
    ]
  },
  {
    id: '7',
    title: '7. Documentos Opcionais',
    items: [
      { id: '7-1', text: 'Cartas de clientes ou parceiros comerciais', status: DocStatus.PENDING },
      { id: '7-2', text: 'Declarações de atividades contínuas', status: DocStatus.PENDING },
      { id: '7-3', text: 'Comprovantes de participações societárias adicionais', status: DocStatus.PENDING },
    ]
  },
];