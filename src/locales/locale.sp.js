export default {
  alerts: {
    loginOk: '¡Login realizado con éxito!',
    loginFailed: '¡Un intento sin éxito de acceder a su cuenta se realizó!',
    newTransaction: '¡Se ha recibido información de una nueva transacción!',
    transactionConfirmed: 'Se ha confirmado una transacción!'
  },
  messages: {
    requiredFields: {
      title: '¡Campos obligatorios!',
      message: 'Todos los campos marcados con * son obligatorios!'
    },
    ok: {
      title: '¡¡¡Todo cierto!!!'
    },
    criticalError: {
      title: 'OMG!!!',
      message: '¡Algo de muy mal está sucediendo con nuestros servidores! ¡Inténtelo de nuevo más tarde!'
    },
    removeAddress: {
      title: 'Quitar dirección',
      message: '¿Desea realmente quitar esa dirección?'
    },
    removeContact: {
      title: 'Eliminación de contacto',
      message: '¿Desea realmente quitar ese contacto?'
    },
    contactRemoved: {
      title: 'Contacto removido',
      message: 'El contacto se ha eliminado con éxito'
    },
    profileUpdated: {
      title: 'Perfil actualizado',
      message: 'Su perfil ha sido actualizado con éxito!'
    },
    passwordsAreDifferent: {
      title: 'Contraseñas diferentes',
      message: '¡Las contraseñas informadas necesitan ser idénticas!'
    },
    newTransaction: {
      title: 'Nueva transacción',
      message: 'La transacción se envió con éxito'
    },
    error: {
      title: 'Problemas :(',
      message: '¡Se ha producido un error inesperado, vuelva a intentarlo más tarde o enviar un mensaje a nuestro equipo de soporte!'
    },
    badAddress: {
      title: 'Dirección no válida :(',
      message: '¡El campo de dirección tiene un valor incorrecto, compruebe que la dirección es correcta e inténtelo de nuevo!'
    },
    wrongAmount: {
      title: 'Cantidad no válida :(',
      message: '¡La cantidad de transferencia de esta transacción no es válida, compruebe que tiene suficiente saldo e inténtelo de nuevo!'
    },
    smallFee: {
      title: 'Tasa muy pequeña :(',
      message: '¡La tasa de esta transacción es muy pequeña, informe al menos% {minimumFee} e inténtelo de nuevo!'
    },
    invalidTransaction: {
      title: 'Problemas :(',
      message: '¡Hay algo malo con su transacción, asegúrese de que está bien o envíe un mensaje a nuestro equipo de soporte!'
    },
    invalidCredentials: {
      title: 'Iniciar sesión no válido!',
      message: 'Introduzca un email y una contraseña válidos para entrar.'
    },
    reCAPTCHA: {
      title: 'reCAPTCHA no es inválido!',
      message: 'Por favor confirma que no eres un robot!'
    },
    invalidEmail: {
      title: 'Invalid email',
      message: 'Este e-mail ya está en uso por otro usuario (tal vez usted mismo)!'
    }
  },
  common: {
    from: 'De',
    to: 'Para',
    amount: 'Cantidad',
    date: 'Fecha',
    waitingConfirmation: 'Esperando la confirmación',
    confirmed: 'Confirmado',
    fee: 'Tasa',
    hash: 'Hash',
    paymentId: 'ID de Pago',
    anonymity: 'Anonimato',
    status: 'Status',
    createdAt: 'Creado en',
    na: 'N/A',
    save: 'Guardar',
    cancel: 'Cancelar',
    ok: 'Ok'
  },
  login: {
    hello: 'Ingrese sus credenciales',
    emailPlaceholder: 'Ingrese su e-mail',
    passwordPlaceholder: 'Ingrese su contraseña',
    createAccount: 'No hay una cuenta?',
    signIn: 'Entrar',
    signUp: 'Registro'
  },
  menu: {
    dashboard: 'Dashboard',
    transactions: 'Transacciones',
    contacts: 'Contactos',
    settings: 'Ajustes',
    profile: 'Perfil',
    signOut: 'Salir',
    notifications: 'Notificaciones'
  },
  dashboard: {
    title: 'Mi cartera',
    balance: 'Saldo',
    locked: 'Bloqueado',
    value: 'Valor',
    yourAddresses: 'Sus direcciones',
    selectAnAddress: 'Seleccione una dirección',
    allAddresses: 'Todas las direcciones',
    createAddress: 'Nueva dirección',
    copyAddress: 'Copiar dirección',
    sendMoney: 'Enviar dinero',
    removeAddress: 'Quitar la dirección',
    transactionHistory: 'Historial de transacciones',
    viewAllHistory: 'Ver todo el historial de transacciones'
  },
  transaction: {
    title: 'Transacción',
    waiting: 'Esperando',
    informations: 'Información',
    blockchainConfirmation: 'Confirmación blockchain'
  },
  transactions: {
    title: 'Nueva transacción',
    transactions: 'Transacciones',
    toPlaceholder: 'Dirección de destino',
    paymentIdPlaceholder: 'ID de Pago',
    newPaymentIdTip: 'Haga clic aquí para generar un nuevo ID de pago',
    newTransactionInfo: 'Utilice este formulario para enviar dinero a una dirección.',
    send: 'Enviar',
    cancel: 'Cancelar'
  },
  contacts: {
    title: 'Contactos',
    contact: 'Contacto',
    name: 'Nombre',
    address: 'Dirección',
    newContact: 'Nuevo contacto',
    editContact: 'Editar contacto',
    newContactInfo: 'Utilice este formulario para crear un contacto nuevo y enlazarlo a una dirección.',
    editContactInfo: 'Utilice este formulario para editar el contacto.',
    defaultPaymentId: 'ID de Pago estándar',
    defaultAnonymity: 'Nivel de anonimato estándar',
    defaultAmount: 'Cantidad estándar',
    save: 'Guardar',
    cancel: 'Cancelar',
    remove: 'Quitar'
  },
  profile: {
    title: 'Perfil',
    name: 'Nombre',
    email: 'E-mail',
    password: 'Contraseña',
    confirmPassword: 'Confirmación de la contraseña',
    defaultCurrency: 'Moneda mostrada en el Dashboard',
    save: 'Guardar',
    cancel: 'Cancelar',
    defaultLanguage: 'Idioma'
  }
}
