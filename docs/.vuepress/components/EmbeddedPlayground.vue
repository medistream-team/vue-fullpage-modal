<template>
  <div></div>
</template>

<script>
function postOnClose(){
  window.top.postMessage('modal-closed')
}
export default {
  name:'embedded-in-iframe',
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

      this.$FModal.show(renderOptions)
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
    listenMessageFromParent: function (e) {
      if(e.data === 'close'){
        this.$FModal.hide()
      }
    }
  },
}
</script>