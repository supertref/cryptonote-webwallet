<template>
  <!-- eslint-disable -->
  <div class="slim-header">
    <div class="container">
      <div class="slim-header-left">
        <h2 class="slim-logo"><router-link to="/">webwallet<span></span></router-link></h2>
      </div><!-- slim-header-left -->
      <div class="slim-header-right">
        <div class="dropdown dropdown-b">
          <a href="#" class="header-notification" data-toggle="dropdown">
            <i class="icon ion-ios-bell-outline"></i>
            <span class="indicator"></span>
          </a>
          <div class="dropdown-menu">
            <div class="dropdown-menu-header">
              <h6 class="dropdown-menu-title">Notifications</h6>
            </div>
            <div class="dropdown-list">
              <a href="#" class="dropdown-link">
                <div class="media">
                  <img src="/static/img/img8.jpg" alt="">
                  <div class="media-body">
                    <p><strong>Suzzeth Bungaos</strong> tagged you and 18 others in a post.</p>
                    <span>October 03, 2017 8:45am</span>
                  </div>
                </div>
              </a>
              <a href="#" class="dropdown-link">
                <div class="media">
                  <img src="/static/img/img9.jpg" alt="">
                  <div class="media-body">
                    <p><strong>Mellisa Brown</strong> appreciated your work <strong>The Social Network</strong></p>
                    <span>October 02, 2017 12:44am</span>
                  </div>
                </div>
              </a>
              <a href="#" class="dropdown-link ">
                <div class="media">
                  <img src="/static/img/img10.jpg" alt="">
                  <div class="media-body">
                    <p>20+ new items added are for sale in your <strong>Sale Group</strong></p>
                    <span>October 01, 2017 10:20pm</span>
                  </div>
                </div>
              </a>
              <a href="#" class="dropdown-link ">
                <div class="media">
                  <img src="/static/img/img2.jpg" alt="">
                  <div class="media-body">
                    <p><strong>Julius Erving</strong> wants to connect with you on your conversation with <strong>Ronnie Mara</strong></p>
                    <span>October 01, 2017 6:08pm</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-c">
          <a href="#" class="logged-user" data-toggle="dropdown">
            <img src="/static/img/abstract-user-flat-3.svg" alt="">
            <span>{{ user.name }}</span>
            <i class="fa fa-angle-down"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <nav class="nav">
              <router-link to="/me" class="nav-link"><i class="icon ion-person"></i> Profile</router-link>
              <router-link to="/settings" class="nav-link"><i class="icon ion-ios-gear"></i> Settings</router-link>
              <a href="#" @click="logout" class="nav-link"><i class="icon ion-forward"></i> Sign Out</a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  props: ['user'],

  methods: {
    logout () {
      const userController = ControllerFactory.getController('user', this)
      userController.logout()
      this.$router.push('/logout')
    }
  }
}
</script>
