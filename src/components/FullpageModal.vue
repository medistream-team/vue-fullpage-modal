<template>
  <div :class="['fpm--modal', verticalAlignClass, horizontalAlignClass]" :style="modalStyles" v-if="exist" v-show="toggleModal">
    <transition appear name="fade">
      <div class="fpm--modal-overlay" :style="overlayStyles" @click.self.stop="overlayOnClick" v-show="visible"></div>
    </transition>
    <transition appear @after-enter="afterOpenModal" @before-leave="beforeCloseModalAnimation" @after-leave="afterCloseModalAnimation" :name="animation">
      <div class="fpm--modal-content" :style="computedContentStyles" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// TODO: should be seperated by util
// TODO: should include closeAnimationSideEffect inpreventAnimationSideEffect

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
    document.documentElement.style.overflow = ''
    return
  }
  // The scrollbar is created and disappeared due to animation. it temporarily prevents additional screen movement.
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    index: {
      type: Number
    },
    modals: {
      type: Array
    },
    fpmId: {
      type: Number | String
    },
    isBottomMost: {
      type: Boolean
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
    },
    animation: {
      type: String,
      default: 'bounce-up'
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
    },
    isModalAtTop: function(){
      return this.index === this.modals.length - 1
    }
  },
  created: function () {
    window.addEventListener('keyup', this.closeIfEsc)
    this.$FModal.eventInterface.$on('hide-dynamic', this.hideDynamicCallback)
  },
  mounted: function () {
    if (this.value) {
      if(this.isBottomMost){
        this.fixRootApp()
      }
      setTimeout(() => {
        this.openModal()
      }, 17)
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keyup', this.closeIfEsc)
    this.$FModal.eventInterface.$off('hide-dynamic', this.hideDynamicCallback)

  },
  destroyed() {
    // FIXME: tidy up restore logic. temporary implmentation
    // restore app behavior on unexpected destorying
    if(this.isBottomMost) {
      this.fixRootApp({ restore: true })
    }

    preventScrollEvent({ restore: true })
    preventAnimationSideEffect({ restore: true })
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
      if (!this.isModalAtTop) return
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
    beforeCloseModalAnimation: function () {
      // TODO: preventCloseAnimationSideEffect
      this.$el.style.cssText += `position: fixed; left: 0; top: -${window.scrollY}px;`
    },
    afterCloseModalAnimation: function () {
      if(this.isBottomMost) {
        this.fixRootApp({ restore: true })
      }

      // restore unexpected lock state
      preventScrollEvent({ restore: true })
      preventAnimationSideEffect({ restore: true })

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
      this.$emit('modal-closed', this.fpmId)
      this.$FModal.eventInterface.$emit('modal-closed', this.fpmId)
    }
  }
}
</script>

<style>
.fpm--modal {
  display: flex;
  position: absolute;
  /* // FIXME: If there is a scrollbar, the screen exceeds the scrollbar area */
  min-height: 100vh;
  width: 100%;
  z-index: 900;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.3)
}

.fpm--modal-content {
  position: relative;
  max-width: 100%;
  border-radius: 4px;
  z-index: 910;
}

/* Animation */
/* // TODO: add more animations */

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity:0;
}
/* bounce-up */
.bounce-up-enter-active {
  animation: bounce-up 0.4s;
}
.bounce-up-leave-active {
  animation: bounce-up 0.4s reverse;
}
/* fade-up */
.fade-up-enter-active,
.fade-up-leave-active {
  transition:all 0.4s;
}
.fade-up-enter,
.fade-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity:0;
  transform:translateY(10px);
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
