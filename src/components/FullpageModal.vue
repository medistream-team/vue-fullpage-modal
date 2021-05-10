<template>
  <div :class="['fpm--modal', verticalAlignClass, horizontalAlignClass]" :style="modalStyles" v-if="exist" v-show="toggleModal">
    <transition appear name="fade">
      <div class="fpm--modal-overlay" :style="overlayStyles" @click.self.stop="overlayOnClick" v-show="visible"></div>
    </transition>
    <transition appear @after-enter="afterOpenModal" @before-leave="beforeCloseModal" @after-leave="afterCloseModal" name="bounce-up">
      <div class="fpm--modal-content" :style="computedContentStyles" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// TODO: util로 분리
// TODO: closeAnimationSideEffect도 preventAnimationSideEffect 내부에 포함시켜야한다.

function stopPropagation (e) {
  e.stopPropagation()
}

function preventScrollEvent (options = {}) {
  const { restore } = options
  if (restore) {
    window.removeEventListener('scroll', stopPropagation, true)
    return
  }
  window.addEventListener('scroll', stopPropagation, true)
}

function preventAnimationSideEffect (options = {}) {
  const { restore } = options
  if (restore) {
    document.body.style.overflow = ''
    return
  }
  // animation으로 인해 scrollbar가 생겼다 사라지고 이로인해 생기는 부가적인 화면 움직임을 일시적으로 막아준다
  document.body.style.overflow = 'hidden'
}

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    fpmId: {
      type: Number | String
    },
    maxHeight: {
      type: Number | String,
      default: '80%'
    },
    height: {
      type: Number | String
    },
    width: {
      type: Number | String,
      default: 800
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    escToClose: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'center bottom'
    },
    modalStyles: {
      type: String | Object | Array
    },
    overlayStyles: {
      type: String | Object | Array
    },
    contentStyles: {
      type: String | Object | Array
    }
  },
  computed: {
    marginTop: function () {
      if (typeof this.maxHeight === 'number') {
        return `calc(100vh - ${this.maxHeight}px)`
      }
      if (this.maxHeight.includes('%')) {
        const marginTopPercentage = 100 - Number(this.maxHeight.replace('%', ''))
        return `${marginTopPercentage}vh`
      }
      return `calc(100vh - ${this.maxHeight})`
    },
    boxShadow: function () {
      const verticalAlign = this.placement.split(' ')[1]
      if (verticalAlign === 'bottom') {
        return `0 10px 0 0 ${this.backgroundColor}`
      }

      return ''
    },
    convertedHeight: function () {
      if (typeof this.height === 'number') {
        return `${this.height}px`
      }
      return this.height
    },
    convertedWidth: function () {
      if (typeof this.width === 'number') {
        return `${this.width}px`
      }
      return this.width
    },
    verticalAlignClass: function () {
      const verticalAlign = this.placement.split(' ')[1]
      return `fpm--align-${verticalAlign}`
    },
    horizontalAlignClass: function () {
      const horizontalAlign = this.placement.split(' ')[0]
      return `fpm--justify-${horizontalAlign}`
    },
    computedContentStyles: function () {
      if (typeof this.contentStyles === 'string') {
        return `margin-top: ${this.marginTop}; background-color: ${this.backgroundColor}; box-shadow: ${this.boxShadow}; width: ${this.convertedWidth}; height: ${this.convertedHeight}; ${this.contentStyles}`
      }

      if (Array.isArray(this.contentStyles)){
        return [{ marginTop: this.marginTop, backgroundColor: this.backgroundColor, boxShadow: this.boxShadow, width: this.convertedWidth, height: this.convertedHeight }].concat(this.contentStyles)
      }

      return [{ marginTop: this.marginTop, backgroundColor: this.backgroundColor, boxShadow: this.boxShadow, width: this.convertedWidth, height: this.convertedHeight }, this.contentStyles]
    }
  },
  created: function () {
    window.addEventListener('keyup', this.closeIfEsc)
    this.$FModal.eventInterface.$on('hide-dynamic', this.hideDynamicCallback)
  },
  mounted: function () {
    if (this.value) {
      this.fixRootApp()
      setTimeout(() => {
        this.openModal()
      }, 17)
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keyup', this.closeIfEsc)
    this.$FModal.eventInterface.$off('hide-dynamic', this.hideDynamicCallback)
  },
  data: function () {
    return {
      exist: this.value,
      toggleModal: false,
      visible: false,
      rootScrollY: undefined
    }
  },
  methods: {
    hideDynamicCallback: function (fpmId) {
      if (fpmId === undefined) return
      if (this.fpmId === fpmId) this.visible = false
    },
    closeIfEsc: function (event) {
      if (!this.escToClose) return
      if (event.keyCode === 27) {
        this.visible = false
      }
    },
    overlayOnClick: function () {
      if (!this.clickToClose) return
      this.visible = false
    },
    afterOpenModal: function () {
      preventScrollEvent({ restore: true })
      preventAnimationSideEffect({ restore: true })
    },
    beforeCloseModal: function () {
      // preventCloseAnimationSideEffect
      this.$el.style.cssText += `position: fixed; left: 0; top: -${window.scrollY}px;`
    },
    afterCloseModal: function () {
      this.fixRootApp({ restore: true })
      this.closeModal()
    },
    fixRootApp: function (options = {}) {
      const { restore } = options
      if (restore) {
        this.$root.$el.style.cssText = ''
        window.scroll(0, this.rootScrollY)
        return
      }
      preventScrollEvent()
      this.rootScrollY = window.scrollY
      const rootOffsetWidth = this.$root.$el.offsetWidth
      this.$root.$el.style.cssText = `position: fixed; top: -${this.rootScrollY}px; bottom: 0; width: ${rootOffsetWidth}px`
    },
    openModal: function () {
      preventAnimationSideEffect()
      this.toggleModal = this.value
      this.visible = this.value
    },
    closeModal: function () {
      this.toggleModal = false
      this.exist = false
      this.$emit('input', false)
      this.$FModal.eventInterface.$emit('modal-closed', this.fpmId)
    }
  }
}
</script>

<style>
.fpm--modal {
  z-index: 900;
  /* FIXME: 100vh로는 horizontal scrollbar가 있는 경우 scrollbar 영역만큼을 초과하게 된다. */
  min-height: 100vh;
  width: 100%;
  display: flex;
}

/* placement */
.fpm--modal.fpm--align-bottom {
  align-items: flex-end;
}

.fpm--modal.fpm--align-center {
  align-items: center;
}

.fpm--modal.fpm--align-top {
  align-items: flex-start;
}

.fpm--modal.fpm--justify-left {
  justify-content: flex-start;
}

.fpm--modal.fpm--justify-center {
  justify-content: center;
}

.fpm--modal.fpm--justify-right {
  justify-content: flex-end;
}

.fpm--modal-overlay {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(128, 128, 128, 0.3)
}

.fpm--modal-content {
  z-index: 910;
  position: relative;
  max-width: 100%;
  border-radius: 4px;
}

/* animation도 여러개 추가해서 Prop으로 제공 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity:0;
}
.bounce-up-enter-active {
  animation: bounce-up 0.4s;
}
.bounce-up-leave-active {
  animation: bounce-up 0.4s reverse;
}

@keyframes bounce-up {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  60% {
    opacity: 1;
    transform: translateY(-7px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
