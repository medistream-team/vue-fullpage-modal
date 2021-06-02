<template>
<div class="fpm--modal-container">
  <fullpage-modal v-for="(modal, index) in modals" :key="modal.key" v-model="modal.show" :index="index" :modals="modals" :fpmId="modal.fpmId === undefined ? index : modal.fpmId" v-bind="modal.modalProps" >
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
  },
  beforeDestroy: function () {
    this.modals = []
    this.$FModal.eventInterface.$off('show-dynamic', this.show)
    this.$FModal.eventInterface.$off('hide-dynamic', this.hide)
    this.$FModal.eventInterface.$off('modal-closed', this.remove)
  },
  methods: {
    remove: function (fpmId) {
      const modalIndex = this.modals.findIndex(modal => modal.fpmId === fpmId)
      this.modals.splice(modalIndex, 1)
    },
    show: function (modalOptions, componentPropsOrAttrs = {}) {
      const { component, template, componentName, fpmId = this.modals.length , ...modalProps } = modalOptions
      const { key = Symbol('fullpage-modal') } = modalOptions // cf. vue-final-modal


      if (component) {
        this.modals.push({ key, fpmId, show: true, component, modalProps, componentPropsOrAttrs })
        return
      }

      if (template) {
        const customComponent = {}
        customComponent.template = template
        customComponent.data = () => ({ ...componentPropsOrAttrs })
        this.modals.push({ key, fpmId, show: true, component: customComponent, modalProps })
        return
      }

      if (componentName) {
        this.modals.push({ key, fpmId, show: true, component: componentName, modalProps, componentPropsOrAttrs })
      }
    },
    hide: function (fpmId) {
      if (fpmId !== undefined) return
      const lastModalFpmId = this.modals[this.modals.length - 1].fpmId
      const isSecondModal = this.modals.length === 2;
      this.$FModal.eventInterface.$emit('hide-dynamic', lastModalFpmId)
      if(isSecondModal){
        this.$FModal.eventInterface.$emit('fix-root-app')
      }
    }
  }
}
</script>

<style scoped>

</style>
