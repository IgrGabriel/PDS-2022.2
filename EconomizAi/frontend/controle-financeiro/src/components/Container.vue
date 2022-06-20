<template>
  <div class="container">
    <div class="row justify-content-around">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--color-primary);
  box-shadow: 1px 1px 2px var(--color-shadow);
  margin: 20px auto;
  padding-top: 25px;
  border-radius: 10px;
}
</style>