<template>
  <div class="text-center">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary spinner"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.spinner {
  z-index: 9999999;
}
</style>
