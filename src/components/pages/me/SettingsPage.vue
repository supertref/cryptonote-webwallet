<template>
  <page :title="$t('settings.title')">
    <div class="section-wrapper">
      <simplert :useIcon="true" ref="simplert" />
      <div id="modal-2fa" class="modal fade">
        <div class="modal-dialog modal-dialog-vertical-center" role="document">
          <div class="modal-content bd-0 tx-14">
            <div class="modal-header pd-y-20 pd-x-25">
              <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">{{$t('settings.twoFactorAuth.modal.title')}}</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pd-25">
              <div class="row no-gutters">
                <div class="col-lg-6">
                  <img :src="token.dataUrl" />
                </div>
                <div class="col-lg-6">
                  <div>
                    <div class="form-group">
                      <p>{{$t('settings.twoFactorAuth.modal.info')}}</p>
                      <input type="text" class="form-control pd-y-12" v-model="userToken" :placeholder="$t('settings.twoFactorAuth.modal.placeholder')">
                    </div>
                    <p v-if="this.view.validationStatus === 1" class="tx-success">{{$t('settings.twoFactorAuth.enabled')}}</p>
                    <p v-if="this.view.validationStatus === -1" class="tx-danger">{{$t('settings.twoFactorAuth.invalid2FAToken')}}</p>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button v-if="this.view.validationStatus !== 1" type="button" class="btn btn-primary" @click="configure2FAToken()">{{$t('settings.twoFactorAuth.modal.enable')}}</button>
              <button type="button" class="btn btn-secondary"  data-dismiss="modal" aria-label="Close">{{$t('settings.twoFactorAuth.modal.close')}}</button>
            </div>
          </div>
        </div>
      </div>

      <div id="disable-modal-2fa" class="modal fade">
        <div class="modal-dialog modal-dialog-vertical-center" role="document">
          <div class="modal-content bd-0 tx-14">
            <div class="modal-header pd-y-20 pd-x-25">
              <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">{{$t('settings.twoFactorAuth.modal.title')}}</h6>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body pd-25">
              <div class="row no-gutters">
                <div class="col-lg-12">
                  <div>
                    <div class="form-group">
                      <p>{{$t('settings.twoFactorAuth.modal.info')}}</p>
                      <input type="text" class="form-control pd-y-12" v-model="userToken" :placeholder="$t('settings.twoFactorAuth.modal.placeholder')">
                    </div>
                    <p v-if="this.view.validationStatus === 1" class="tx-success">{{$t('settings.twoFactorAuth.disabled')}}</p>
                    <p v-if="this.view.validationStatus === -1" class="tx-danger">{{$t('settings.twoFactorAuth.invalid2FAToken')}}</p>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="configure2FAToken()">{{$t('settings.twoFactorAuth.modal.disable')}}</button>
              <button type="button" class="btn btn-secondary"  data-dismiss="modal" aria-label="Close">{{$t('settings.twoFactorAuth.modal.close')}}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-layout">
        <div class="row mg-b-25">
          <div class="col-lg-12">
              <label class="section-title">{{$t('settings.twoFactorAuth.title')}}</label>
              <p>{{$t('settings.twoFactorAuth.info')}}</p>
              <p>
                <a v-if="!token.isEnabled" @click="resetValidationStatus()" href="#modal-2fa" class="modal-effect btn btn-primary" data-toggle="modal" data-effect="effect-flip-vertical"><i class="fa fa-lock" /> {{$t('settings.twoFactorAuth.activate2FA')}}</a>
                <a v-if="token.isEnabled" @click="resetValidationStatus()" href="#disable-modal-2fa" class="modal-effect btn btn-danger" data-toggle="modal" data-effect="effect-flip-vertical"><i class="fa fa-unlock-alt" /> {{$t('settings.twoFactorAuth.disable2FA')}}</a>
              </p>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Amount from '@/components/common/ui/Amount'
import ConvertCoin from '@/components/common/ui/ConvertCoin'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  components: {
    Page,
    Amount,
    ConvertCoin
  },

  data () {
    return {
      token: {
        isEnabled: false,
        dataUrl: ''
      },
      view: {
        validationStatus: 0
      },
      userToken: ''
    }
  },

  mounted () {
    this.get2FAToken()
  },

  watch: {
    userToken () {
      this.view.tokenActivatingError = false
    }
  },

  methods: {
    resetValidationStatus () {
      this.view.validationStatus = 0
    },

    get2FAToken () {
      var userController = ControllerFactory.getController('user', this)
      userController.get2FAToken()
        .then(token => {
          this.token = token
        })
    },

    configure2FAToken () {
      var userController = ControllerFactory.getController('user', this)

      userController.configure2FAToken(!this.token.isEnabled ? 'enable' : 'disable', this.userToken)
        .then(token => {
          this.view.validationStatus = 1
          this.userToken = ''

          this.get2FAToken()
        })
        .catch(e => {
          this.view.validationStatus = -1
        })
    }
  }
}
</script>

<style scoped>
</style>
