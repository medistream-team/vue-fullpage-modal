<template>
  <div>
    <div class="close">
      <div class="close-title">Close Button</div>
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
.content {
  padding: 15px 15px 15px 15px;
}
.close {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.close-title {
  margin-left: 15px;
  padding: 15px 0px;
  font-size: 2rem;
  font-weight: bold;
}

.close button {
  margin-right: 15px;
  font-size: 2.5rem;
}

* {
  font-size: 1.5rem;
}
</style>