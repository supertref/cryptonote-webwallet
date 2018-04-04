<template>
  <div class="slim-navbar">
    <div class="container">
      <ul class="nav">
        <li class="nav-item active">
          <a class="nav-link" href="/">
            <i class="icon ion-ios-home-outline"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="icon ion-ios-filing-outline"></i>
            <span>Transactions</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="icon ion-ios-book-outline"></i>
            <span>Contacts</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-toggle="dropdown">
            <i class="icon ion-ios-gear-outline"></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div><!-- container -->
  </div><!-- slim-navbar -->
</template>

<script>
export default {
  props: ['user']
}
</script>
