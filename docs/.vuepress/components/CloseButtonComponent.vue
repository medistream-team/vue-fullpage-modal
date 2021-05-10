<template>
  <div>
    <div class="close">
      <button @click="closeModal">×</button>
    </div>
    <div class="content">
      Aliqua qui deserunt pariatur ullamco ex dolore mollit consequat eu ut id.
      Amet elit nostrud aliqua laborum eiusmod anim reprehenderit excepteur
      laboris nisi cupidatat ipsum nulla consequat.
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal: function () {
      this.$FModal.hide();
    },
  },
};
</script>

<style scoped>
.close {
  display: flex;
  justify-content: flex-end;
}

.close button {
  margin-right: 10px;
  font-weight: bold;
  font-size: 2rem;
}

* {
  font-size: 1.5rem;
}
</style>