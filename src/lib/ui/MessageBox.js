import Logger from '@/lib/Logger'

const logger = new Logger('MessageBox')

class MessageBox {
  constructor (vueContext) {
    if (!vueContext) {
      logger.error('There is no Vue context linked to this MessageBox instance')
    } else if (!vueContext.$refs.simplert) {
      logger.error('There is no simplert linked to this MessageBox instance')
    }

    this.vueContext = vueContext
  }

  showMessage (title, message, type, customCloseBtnText, onClose) {
    this.vueContext.$refs.simplert.openSimplert({
      title,
      message,
      type,
      customCloseBtnText,
      onClose: onClose
    })
  }

  showError (title, message, onClose) {
    this.showMessage(title, message, 'error', 'ok', onClose)
  }

  showInfo (title, message, onClose) {
    this.showMessage(title, message, 'info', 'ok', onClose)
  }

  showWarning (title, message, onClose) {
    this.showMessage(title, message, 'warning', 'ok', onClose)
  }

  showSuccess (message, onClose) {
    this.showInfo('Tudo certo!!!', message, onClose)
  }

  showCriticalError (error, onClose) {
    console.log(error)
    this.showError('OMG!!!', 'Somthing worong with our servers is goind on! Try again later', onClose)
  }

  showRequiredFieldsMessage () {
    this.showError('Required fields!', 'All fields marked with * are required!')
  }

  confirm (title, message, fnCallback) {
    let obj = {
      title: title,
      message: message,
      type: 'info',
      useConfirmBtn: true,
      onConfirm: fnCallback,
      customConfirmBtnClass: 'btn btn-warning',
      customConfirmBtnText: 'OK'
    }
    this.vueContext.$refs.simplert.openSimplert(obj)
  }
}

export default MessageBox
