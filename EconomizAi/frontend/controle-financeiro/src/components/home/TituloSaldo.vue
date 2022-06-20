<template>
  <div class="col-sm-11 col-md-8 col-lg-7">
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scope>
.title {
  margin-top: 8px;
}
</style>
