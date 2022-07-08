<template>
  <div class="dialog-container">
    <div class="backdrop" @click="onModal"></div>

    <div class="dialog">
      <h2 class="primary">{{ title ? title : 'Error' }}</h2>
      <div>
        <p>{{ message }}</p>
        <v-btn text class="primary" @click="onModal">Got it</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'message'],
  methods: {
    onModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .backdrop {
    background-color: rgba(0, 0, 0, 0.651);
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 99;
  }

  .dialog {
    margin-top: 15rem;
    width: 320px;
    background-color: white;
    border-radius: 5px;
    text-align: center;
    color: black;
    position: absolute;
    z-index: 99;
    overflow: hidden;

    h2 {
      font-size: 1.6rem;
      color: white;
      padding: 1rem 0;
    }

    div {
      padding: 2rem 2rem 1rem 2rem;
      p {
        margin-bottom: 2.5rem;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
