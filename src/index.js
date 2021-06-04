import FullpageModalContainer from './components/FullpageModalContainer'
import FullpageModal from './components/FullpageModal'

export default {
  install (Vue, options = {}) {
    if (Vue.prototype.$FModal) {
      return
    }

    const eventInterface = new Vue()
    const pluginStatus = {}

    const $FModal = {
      show: function (...args) {
        if (typeof args[0] === 'object') {
          eventInterface.$emit('show-dynamic', ...args)
        }
      },
      hide: function (...args) {
        eventInterface.$emit('hide-dynamic', ...args)
      },
      destroyAll: function () {
        eventInterface.$emit('destroy-all')
      },
      eventInterface
    }

    Object.defineProperty(Vue.prototype, '$FModal', {
      get: function () {
        if (!pluginStatus.containerBound) {
          pluginStatus.containerBound = true

          const globalDiv = document.createElement('div')
          document.body.appendChild(globalDiv)

          new Vue({
            parent: this.$root,
            render: h => h(FullpageModalContainer)
          }).$mount(globalDiv)
        }

        return $FModal
      }
    })

    Vue.component('fullpage-modal', FullpageModal)
  }
}
