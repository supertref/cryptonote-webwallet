<template>
  <div class="slim-pageheader">
    <ol class="breadcrumb slim-breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li v-if="!subTitle" class="breadcrumb-item active" aria-current="page">{{ title }}</li>
      <li v-if="subTitle" class="breadcrumb-item" aria-current="page">{{ title }}</li>
      <li v-if="subTitle" class="breadcrumb-item active" aria-current="page">{{ subTitle }}</li>
    </ol>
    <h6 class="slim-pagetitle">{{ title }}</h6>
  </div>
</template>

<script>
export default {
  props: ['title', 'subTitle']
}
</script>
