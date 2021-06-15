<template>
<div class="fpm--modal-container">
  <fullpage-modal v-for="(modal, index) in modals" :key="modal.key" v-model="modal.show" :index="index" :modals="modals" :fpmId="modal.fpmId === undefined ? index : modal.fpmId" :isBottomMost="modal.isBottomMost" v-on="modal.onClose !== undefined ? { 'modal-closed': modal.onClose } : {}" v-bind="modal.modalProps" >
    <component :is="modal.component" v-bind="modal.componentPropsOrAttrs"></component>
  </fullpage-modal>
</div>
</template>

<script>
export default {
  name: 'fpm--modal-container',
  data: function () {
    return {
      modals: []
    }
  },
  beforeMount: function () {
    this.$FModal.eventInterface.$on('show-dynamic', this.show)
    this.$FModal.eventInterface.$on('hide-dynamic', this.hide)
    this.$FModal.eventInterface.$on('modal-closed', this.remove)
    this.$FModal.eventInterface.$on('destroy-all', this.destroyAll)
  },
  beforeDestroy: function () {
    this.modals = []
    this.$FModal.eventInterface.$off('show-dynamic', this.show)
    this.$FModal.eventInterface.$off('hide-dynamic', this.hide)
    this.$FModal.eventInterface.$off('modal-closed', this.remove)
    this.$FModal.eventInterface.$off('destroy-all', this.destroyAll)
  },
  methods: {
    remove: function (fpmId) {
      const modalIndex = this.modals.findIndex(modal => modal.fpmId === fpmId)
      this.modals.splice(modalIndex, 1)
    },
    show: function (modalOptions, componentPropsOrAttrs = {}) {
      const { component, template, componentName, fpmId = this.modals.length, onClose, ...modalProps } = modalOptions
      const { key = Symbol('fullpage-modal') } = modalOptions // cf. vue-final-modal
      const isBottomMost = this.modals.length === 0

      if (component) {
        this.modals.push({ key, fpmId, show: true, component, isBottomMost, onClose, modalProps, componentPropsOrAttrs })
        return
      }

      if (template) {
        const customComponent = {}
        customComponent.template = template
        customComponent.data = () => ({ ...componentPropsOrAttrs })
        this.modals.push({ key, fpmId, show: true, component: customComponent, isBottomMost, onClose, modalProps })
        return
      }

      if (componentName) {
        this.modals.push({ key, fpmId, show: true, component: componentName, isBottomMost, onClose, modalProps, componentPropsOrAttrs })
      }
    },
    // The hide-dynamic event that the FullpageModalContainer receives must not have any arguments.
    hide: function (fpmId) {
      if (fpmId !== undefined) return
      if (this.modals.length === 0) return
      const lastModalFpmId = this.modals[this.modals.length - 1].fpmId
      this.$FModal.eventInterface.$emit('hide-dynamic', lastModalFpmId)
    },
    destroyAll: function (){
      if(this.modals.length === 0) return
      this.modals = []
    }
  }
}
</script>

<style scoped>

</style>
