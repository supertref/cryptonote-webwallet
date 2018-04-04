<template>
  <div class="slim-pageheader">
    <ol class="breadcrumb slim-breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
    </ol>
    <h6 class="slim-pagetitle">{{ title }}</h6>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
