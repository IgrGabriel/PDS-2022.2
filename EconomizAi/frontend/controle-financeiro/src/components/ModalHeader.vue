<template>
  <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">
      {{ title }}
    </h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
