export default {
  alerts: {
    loginOk: 'Login realizado com sucesso!',
    loginFailed: 'Uma tentativa sem sucesso de acessar sua conta foi realizada!',
    newTransaction: 'Informação de uma nova transação foi recebida!',
    transactionConfirmed: 'Uma transação foi confirmada!'
  },
  messages: {
    requiredFields: {
      title: 'Campos obrigatório!',
      message: 'Todos os campos marcados com * são obrigatórios!'
    },
    ok: {
      title: 'Tudo certo!!!'
    },
    criticalError: {
      title: 'OMG!!!',
      message: 'Algo de muito errado está acontecendo com nossos servidores! Tente novamente mais tarde!'
    },
    removeAddress: {
      title: 'Removendo endereço',
      message: 'Deseja realmente remover esse endereço?'
    },
    removeContact: {
      title: 'Removendo contato',
      message: 'Deseja realmente remover esse contato?'
    },
    contactRemoved: {
      title: 'Contato removido',
      message: 'O contato foi removido com sucesso'
    },
    profileUpdated: {
      title: 'Perfil atualizado',
      message: 'Seu perfil foi atualizado com sucesso!'
    },
    passwordsAreDifferent: {
      title: 'Senhas diferentes',
      message: 'As senhas informadas precisam ser idênticas!'
    },
    newTransaction: {
      title: 'Nova transação :)',
      message: 'A transação foi enviada com sucesso'
    },
    error: {
      title: 'Problemas :(',
      message: 'Um erro inesperado ocorreu, tente novamente mais tarde ou envie uma mensagem para nossa equipe de suporte!'
    },
    badAddress: {
      title: 'Endereço inválido :(',
      message: 'O campo de endereço tem um valor incorreto, verifique se o endereço está correto e tente novamente!'
    },
    wrongAmount: {
      title: 'Quantidade inválida :(',
      message: 'A quantidade de transferência desse transação é inválida, verifique se você tem saldo suficiente e tente novamente!'
    },
    smallFee: {
      title: 'Taxa muito pequena :(',
      message: 'A taxa dessa transação é muito pequena, informe ao menos %{minimumFee} e tente novamente'
    },
    invalidTransaction: {
      title: 'Problemas :(',
      message: 'Há algo de errado com sua transação, verifique se está tudo ok ou envie uma mensagem para nossa equipe de suporte!'
    },
    invalidCredentials: {
      title: 'Login inválido!',
      message: 'Informe um email e senha válidos para entrar.'
    },
    reCAPTCHA: {
      title: 'reCAPTCHA não é válido!',
      message: 'Por favor, confirme que você não é um robô!'
    },
    invalidEmail: {
      title: 'E-mail inválido :(',
      message: 'Esse e-mail já está em uso por outro usuário (talvez você mesmo)!'
    }
  },
  common: {
    from: 'De',
    to: 'Para',
    amount: 'Quantidade',
    date: 'Data',
    waitingConfirmation: 'Aguardando confirmação',
    confirmed: 'Confirmada',
    fee: 'Taxa',
    hash: 'Hash',
    paymentId: 'ID de Pagamento',
    anonymity: 'Anonimato',
    status: 'Status',
    createdAt: 'Criado em',
    na: 'N/A',
    save: 'Salvar',
    cancel: 'Cancelar',
    ok: 'Ok'
  },
  login: {
    hello: 'Informe suas credenciais',
    emailPlaceholder: 'Informe seu e-mail',
    passwordPlaceholder: 'Informe sua senha',
    createAccount: 'Ainda não tem uma conta?',
    twoFactorAuthTokenPlaceholder: '2FA (deixe em branco caso tenha habilitado)',
    signIn: 'Entrar',
    signUp: 'Cadastrar'
  },
  menu: {
    dashboard: 'Dashboard',
    transactions: 'Transações',
    contacts: 'Contatos',
    settings: 'Configurações',
    profile: 'Perfil',
    signOut: 'Sair',
    notifications: 'Notificações'
  },
  dashboard: {
    title: 'Minha Carteira',
    balance: 'Saldo',
    locked: 'Bloqueado',
    value: 'Valor',
    yourAddresses: 'Seus endereços',
    selectAnAddress: 'Selecione um endereço',
    allAddresses: 'Todos os endereços',
    createAddress: 'Novo endereço',
    copyAddress: 'Copiar endereço',
    sendMoney: 'Enviar dinheiro',
    removeAddress: 'Remover endereço',
    transactionHistory: 'Histórico de transações',
    viewAllHistory: 'Visualizar todo o histórico de transações'
  },
  transaction: {
    title: 'Transação',
    waiting: 'Aguardando',
    informations: 'Informações',
    blockchainConfirmation: 'Confirmação blockchain'
  },
  transactions: {
    title: 'Nova transação',
    transactions: 'Transações',
    toPlaceholder: 'Endereço de destino',
    paymentIdPlaceholder: 'ID de Pagamento',
    newPaymentIdTip: 'Clique aqui para gerar um novo ID de pagamento',
    newTransactionInfo: 'Use esse formulário para enviar dinheiro para um endereço.',
    send: 'Enviar',
    cancel: 'Cancelar'
  },
  contacts: {
    title: 'Contatos',
    contact: 'Contato',
    name: 'Nome',
    address: 'Endereço',
    newContact: 'Novo Contato',
    editContact: 'Editar Contato',
    newContactInfo: 'Use esse formulário para criar um novo contato e vinculá-lo a um endereço.',
    editContactInfo: 'Use esse formulário para editar contato.',
    defaultPaymentId: 'ID de Pagamento padrão',
    defaultAnonymity: 'Nível de anonimato padrão',
    defaultAmount: 'Quantidade padrão',
    save: 'Salvar',
    cancel: 'Cancelar',
    remove: 'Remover'
  },
  profile: {
    title: 'Perfil',
    name: 'Nome',
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmação da senha',
    defaultCurrency: 'Moeda exibida no Dashboard',
    save: 'Salvar',
    cancel: 'Cancelar',
    defaultLanguage: 'Idioma'
  },
  settings: {
    title: 'Configurações',
    twoFactorAuth: {
      title: 'Autenticação em dois fatores - 2FA',
      info: 'Use a autenticação em dois fatores para aumentar a seguraça no acesso a sua conta!',
      activate2FA: 'Habilitar 2FA',
      disable2FA: 'Desabilitar 2FA',
      invalid2FAToken: 'O token informado é inválido',
      enabled: 'O 2FA foi habilitado com sucesso!',
      disabled: 'O 2FA foi desabilitado com sucesso!',
      modal: {
        title: '2FA',
        info: 'Digite os números exibidos no aplicativo',
        placeholder: '',
        enable: 'Habilitar 2FA',
        close: 'Fechar',
        disable: 'Desabilitar 2FA'
      }
    }
  },
  signUp: {
    title: 'Crie sua conta!',
    message: 'É gratuíto e leva um minuto.',
    namePlaceholder: 'Nome',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Senha',
    signUp: 'Criar conta',
    signIn: 'Entrar',
    alreayHaveAccount: 'Já tem uma conta?'
  }
}
