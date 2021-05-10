# Getting Started
## Installation
```shell
npm i vue-fullpage-modal
```
## How to Use
### plugin

```javascript
import FullpageModal from 'vue-fullpage-modal'

Vue.use(FullpageModal)
```

### component
```html
<template>
  <div>
    <button @click="openModal">open</button>
  </div>
</template>
<script>
import HelloWorld from './HelloWorld'


export default {
  methods: {
    openModal() {
      this.$FModal.show(
        { 
          component: HelloWorld 
        }, 
        { 
          msg: "Welcome to Your Vue.js App" 
        }
      )
    }
  }
}
</script>
```

<h2 class="no-border-bottom"> 🎉 easy! </h2>
  <modal-getting-started />
<style>
.no-border-bottom {
  border-bottom: none;
}
</style>