<template>
<!-- // TODO: add background image :style="{ backgroundImage: 'url(\'/1.jpg\')' }" -->
  <div>
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <img src="/favicon.png" @click="openModal" style="height: 128px; width: 128px;">
    </div>
  </div>
</template>

<script>
import DemoHelloWorld from './DemoHelloWorld'

function postOnClose(){
  window.top.postMessage('modal-closed')
}
export default {
  name:'embedded-demo',
  created: function (){
    if(this.$route.query.open === 'true'){
      let renderOptions = {}

      if(this.$route.query.template){
        renderOptions.template = this.$route.query.template
      }

      if(this.$route.query.componentName){
        renderOptions.componentName = this.$route.query.componentName
      }

      if(this.$route.query.modalProps){
        const parsedModalProps = JSON.parse(this.$route.query.modalProps)
        renderOptions = {  ...renderOptions, ...parsedModalProps }
      }

      this.renderOptions = { ...renderOptions }
    }
  },
  mounted() {
    this.$FModal.eventInterface.$on('modal-closed', postOnClose)
    window.addEventListener('message', this.listenMessageFromParent)
  },
  destroyed: function(){
    this.$FModal.eventInterface.$off('modal-closed', postOnClose)
    window.removeEventListener('message', this.listenMessageFromParent)
  },
  methods: {
    openModal: function(){
      this.$FModal.show(
        { 
          component: DemoHelloWorld,
          maxHeight: '460px',
          contentStyles: {
            fontSize: '1.2rem'
          }
        }, 
        { 
          msg: "Welcome to Your Vue.js App" 
        }
      )
    },
    listenMessageFromParent: function (e) {
      if(e.data === 'close'){
        this.$FModal.hide()
      }
    },
  },
}
</script>
<style scoped>
.openModal {
  border: 1px solid rgba(0,0,0,0.1);
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.9rem 1.8rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
}
</style>