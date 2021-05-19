<template>
  <div class="wrapper">
    <button class="open" @click="openModal">
      Open
    </button>
  </div>
</template>

<script>
import BasicComponent from './BasicComponent'

function postOnClose(){
  window.top.postMessage('modal-closed')
}
export default {
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

      this.renderOptions = renderOptions
    }
  },
  data() {
    return {
      renderOptions: {},
      opened: false
    }
  },
  mounted() {
    this.$FModal.eventInterface.$on('modal-closed', this.toggleOpened)
    this.$FModal.eventInterface.$on('onClose', postOnClose)
    window.addEventListener('message', this.listenMessageFromParent)
  },
  destroyed: function(){
    this.$FModal.eventInterface.$off('onClose', postOnClose)
    window.removeEventListener('message', this.listenMessageFromParent)
  },
  methods: {
    listenMessageFromParent: function (e) {
      if(e.data === 'close'){
        this.$FModal.hide()
      }
    },
    toggleOpened(){
      this.opened = !this.opened
    },
    openModal() {
      this.opened = true
      this.$FModal.show({ component: BasicComponent })
    }
  },
}
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

button.open {
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
}
</style>