<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }">
    <div class="device-wrapper">
      <div class="device device-iphone-8">
        <div class="device-frame">
          <mobile-portal-iframe ref="ifr" class="device-content" :baseUrl="$withBase('/simulator/mobile.html')" v-model="open" :template="template" :componentName="componentName" :modalProps="modalProps" />
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
  data: function () {
    return {
      open: false,
      template: undefined,
      componentName: undefined,
      modalProps: {}
    }
  },
  methods: {
    openModal: function () {
      this.template = `<div><h3>foo</h3><div :style="{ marginBottom: '30px' }">bar</div></div>`
      if(this.open) {
        return this.$refs.ifr.$el.contentWindow.postMessage('close')
      }
      this.open = true
    }
  }
}
</script>

<style>
.openModal {
  border:1px solid rgba(0,0,0,0.1);
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
}
</style>