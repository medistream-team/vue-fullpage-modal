<template>
<div :style="{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }">
  <div class="device-wrapper">
    <div class="device device-iphone-8">
      <div class="device-frame">
        <mobile-portal-iframe ref="ifr" class="device-content" :baseUrl="$withBase('/simulator/close-button.html')" v-model="open" />
      </div>
      <div class="device-stripe"></div>
      <div class="device-header"></div>
      <div class="device-sensors"></div>
      <div class="device-btns"></div>
      <div class="device-power"></div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      open: true
    }
  },
}
</script>

<style scoped>
</style>