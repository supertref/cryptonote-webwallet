<template>
  <div class="wrapper">
    <header-component :user="user" />
    <navbar :user="user" />
    <div class="slim-mainpanel">
      <router-view />
    </div>
    <footer-component  :user="user" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import Navbar from '@/components/Navbar'
import FooterComponent from '@/components/Footer'

export default {
  props: ['user'],

  components: {
    HeaderComponent,
    Navbar,
    FooterComponent
  }
}
</script>
