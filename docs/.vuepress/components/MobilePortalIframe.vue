<template>
<iframe :style="{ width: `${width}px`, height: `${height}px` }" :src="iframeSrc" frameborder="1">
</iframe>
</template>

<script>
function objToParam(paramObj) {
  if(typeof paramObj !== 'object') return ''
  return  Object.keys(paramObj).map((key) => `${key}=${paramObj[key]}`).join("&")
}

export default {
  name: 'mobile-portal-iframe',
  mounted: function () {
    window.addEventListener('message', this.listenMessageFromChild)
  },
  destroyed: function(){
    window.removeEventListener('message', this.listenMessageFromChild)
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    template: {
      type: String
    },
    componentName: {
      type: String
    },
    modalProps: {
      type: Object,
      default: function(){
        return {}
      }
    },
    width: {
      type: Number,
      // default: 300
    },
    height: {
      type: Number,
      // default: 500
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    listenMessageFromChild: function(event){
      if(event.data === 'modal-closed'){
        this.$emit('input', false)
      }
    }
  },
  computed: {
    iframeSrc: function() {
      const params = { open: this.value }

      if(this.template){
        params.template = this.template
      }

      if(this.componentName){
        params.componentName = this.componentName
      }

      if(Object.keys(this.modalProps) !== 0){
        params.modalProps = encodeURI(JSON.stringify(this.modalProps))
      }
      
      return this.baseUrl + '?' + objToParam(params)
    }
  }
}
</script>