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
import Component from './Component'

export default {
// ...
  methods: {
    openModal() {
      this.$FModal.show({ component: Component }, { foo: 'foo', bar: 'bar' })
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