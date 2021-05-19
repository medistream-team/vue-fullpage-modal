<template>
  <div class="wrapper">
    <button class="open" @click="openModal">
      Open
    </button>
  </div>
</template>

<script>
import ImageComponent from './ImageComponent'

function postOnClose(){
  window.top.postMessage('modal-closed')
}
export default {
  data() {
    return {
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
      this.$FModal.show(
        { 
          component: ImageComponent,
          contentStyles: {
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }
        }
      )
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