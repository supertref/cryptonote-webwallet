export default {
  alerts: {
    loginOk: 'Login performed successfully!',
    loginFailed: 'A failed attempt to access your acount occured!',
    newTransaction: 'A new transaction info has been received!',
    transactionConfirmed: 'A transaction has been confirmed!'
  },
  messages: {
    requiredFields: {
      title: 'Required fields!',
      message: 'All fields marked with * are required!'
    },
    ok: {
      title: 'Ok!!!'
    },
    criticalError: {
      title: 'OMG!!!',
      message: 'Something wrong with our servers is goind on! Try again later'
    },
    removeAddress: {
      title: 'Removing address',
      message: 'Are you sure about remove this address?'
    },
    removeContact: {
      title: 'Removing contact',
      message: 'Are you sure you want to remove this contact?'
    },
    contactRemoved: {
      title: 'Contact removed',
      message: 'The contact has been removed successfully!'
    },
    profileUpdated: {
      title: 'Profile updated',
      message: 'Your profile has been updated successfully!'
    },
    passwordsAreDifferent: {
      title: 'Password are different',
      message: 'The passwords must be the same!'
    },
    error: {
      title: 'Problems :(',
      message: 'An unexpected error has occurred, please try again later or send a menssage to our support team!'
    },
    newTransaction: {
      title: 'New Transaction :)',
      message: 'The transaction has been sent successfully'
    },
    badAddress: {
      title: 'Bad Address :(',
      message: 'The address field has an invalid value, please check if the address is correct and try again!'
    },
    wrongAmount: {
      title: 'Wrong amount :(',
      message: 'The amount of transaction is invalid, please check if you have founds and try again!'
    },
    smallFee: {
      title: 'Small fee :(',
      message: 'The fee of transaction is too small, please set a fee to at least %{minimumFee}'
    },
    invalidTransaction: {
      title: 'Problems :(',
      message: 'There is something wrong with you transaction, check if is everything ok and try again or send a message to our support!'
    },
    invalidCredentials: {
      title: 'Invalid credentials!',
      message: 'Please inform a valid email and password to sign in.'
    },
    reCAPTCHA: {
      title: 'reCAPTCHA is not invalid!',
      message: 'Please confirm you are not a robot!'
    },
    invalidEmail: {
      title: 'Invalid email',
      message: 'This email is already in use by other user (maybe you)!'
    },
    passwordReset: {
      message: 'Your password has been reset successfully! Please sign in.'
    },
    passwordResetRequest: {
      message: 'You will receive a email explain how to reset your password!'
    },
    userNotFound: {
      title: 'User not found!',
      message: 'Something wrong is going on!'
    }
  },
  common: {
    from: 'From',
    to: 'To',
    amount: 'Amount',
    date: 'Date',
    waitingConfirmation: 'Waiting confirmation',
    confirmed: 'Confirmed',
    fee: 'Fee',
    hash: 'Hash',
    paymentId: 'Payment Id',
    anonymity: 'Anonymity',
    status: 'Status',
    createdAt: 'Created at',
    na: 'N/A',
    save: 'Salvar',
    cancel: 'Cancelar',
    ok: 'Ok',
    anonymous: 'Anonymous'
  },
  login: {
    hello: 'Sign In to continue',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    createAccount: 'Don\'t have an account?',
    twoFactorAuthTokenPlaceholder: '2FA (leave blank if you don\'t enabled it)',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    verified: 'Account verified!',
    lostPassword: 'Have you lost your password?',
    resetPasswordRequest: 'Reset your password'
  },
  menu: {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    contacts: 'Contacts',
    settings: 'Settings',
    profile: 'Profile',
    signOut: 'Sign Out',
    notifications: 'Notifications'
  },
  dashboard: {
    title: 'My Wallet',
    balance: 'Balance',
    locked: 'Locked',
    value: 'Value',
    yourAddresses: 'Your Addresses',
    selectAnAddress: 'Select an address',
    allAddresses: 'All addresses',
    createAddress: 'Create address',
    copyAddress: 'Copy address',
    sendMoney: 'Send money',
    removeAddress: 'Remove address',
    transactionHistory: 'Transaction History',
    viewAllHistory: 'View all transaction history'
  },
  transaction: {
    title: 'Transação',
    waiting: 'Waiting',
    informations: 'Informations',
    blockchainConfirmation: 'Blockchain confirmation'
  },
  transactions: {
    title: 'New Transaction',
    transactions: 'Transactions',
    toPlaceholder: 'To Address',
    paymentIdPlaceholder: 'Payment Id',
    newPaymentIdTip: 'Click here to generate a new payment id',
    newTransactionInfo: 'Use this form to send money to another address.',
    send: 'Send',
    cancel: 'Cancel'
  },
  contacts: {
    title: 'Contacts',
    contact: 'Contact',
    name: 'Name',
    address: 'Address',
    newContact: 'New Contact',
    editContact: 'New Contact',
    newContactInfo: 'Use this form to create a new contact and associate an address.',
    editContactInfo: 'Use this form to edit a contact.',
    defaultPaymentId: 'Default Payment Id',
    defaultAnonymity: 'Default Anonymity',
    defaultAmount: 'Default Amount',
    save: 'Save',
    cancel: 'Cancel',
    remove: 'Remove'
  },
  profile: {
    title: 'Profile',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    defaultCurrency: 'Default currency at Dashboard',
    save: 'Save',
    cancel: 'Cancel',
    defaultLanguage: 'Language'
  },
  settings: {
    title: 'Settings',
    twoFactorAuth: {
      title: '2FA',
      info: 'Use two-factor authentication to increase security in your account access!',
      activate2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      invalid2FAToken: 'The token is invalid',
      enabled: 'The 2FA has been enabled successfully!',
      disabled: 'The 2FA has been disabled successfully!',
      modal: {
        title: '2FA',
        info: 'Type the numbers shown in your app',
        placeholder: '',
        enable: 'Enable 2FA',
        close: 'Close',
        disable: 'Disable 2FA'
      }
    }
  },
  signUp: {
    title: 'Get Started!',
    message: 'It\'s free to signup and only takes a minute.',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    alreayHaveAccount: 'Already have an account?'
  },
  passwordReset: {
    title: 'Reset your password',
    passwordPlaceholder: 'New password',
    newPassword: 'Reset password',
    emailPlaceholder: 'Email'
  }
}
