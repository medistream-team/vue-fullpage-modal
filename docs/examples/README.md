# Examples
## Basic Modal

<example-modal-basic />

### Usage

```html
<template>
  <div class="wrapper">
    <button class="open" @click="openModal">
      Open
    </button>
  </div>
</template>
<script>
import BasicComponent from '../src/components/BasicComponent'

export default {
  methods: {
    openModal() {
      this.$FModal.show({ component: BasicComponent })
    }
  }, 
}
</script>
```

### *BasicComponent*

<<< @/docs/.vuepress/components/BasicComponent.vue

## Close Button

<example-modal-close-button />

### Usage

```html
<template>
  <div class="wrapper">
    <button class="open" @click="openModal">
      Open
    </button>
  </div>
</template>
<script>
import CloseButtonComponent from '../src/components/CloseButtonComponent'

export default {
  methods: {
    openModal() {
      this.$FModal.show({ component: CloseButtonComponent })
    }
  }
}
</script>
```

### *CloseButtonComponent*

<<< @/docs/.vuepress/components/CloseButtonComponent.vue
## Centered

<example-modal-centered />

### Usage

```html
<template>
  <div class="wrapper">
    <button class="open" @click="openModal">
      Open
    </button>
  </div>
</template>
<script>
import BasicComponent from '../src/components/BasicComponent'

export default {
  methods: {
    openModal() {
      this.$FModal.show(
        { 
          component: BasicComponent, 
          width: 300, 
          maxHeight: '100%', 
          placement: 'center center' 
        }
      )
    }
  }
}
</script>
```

## Component Props

<example-modal-component-props />

### Usage

```html
<template>
  <div>
    <button @click="openModal">
      Open
    </button>
  </div>
</template>
<script>
import PropsComponent from '../src/components/PropsComponent'

export default {
  methods: {
    openModal() {
      this.$FModal.show(
        { 
          component: PropsComponent 
        }, 
        { 
          text: 'Hello Props', 
          color: '#7c8', 
          contentPadding: 30 
        }
      )
    }
  }
}
</script>
```

### *PropsComponent*

<<< @/docs/.vuepress/components/PropsComponent.vue

## Custom Styling

<example-custom-styling />

### Usage

```html
<template>
  <div>
    <button @click="openModal">
      Open
    </button>
  </div>
</template>
<script>
import BasicComponent from '../src/components/BasicComponent'

export default {
  methods: {
    openModal() {
      this.$FModal.show(
        { 
          component: BasicComponent, 
          overlayStyles: { 
            backgroundColor: 'rgba(72, 128, 48, 0.4)'
          }, 
          contentStyles: { 
            border: '4px solid grey', 
            borderBottomLeftRadius: '25px',
            borderBottomRightRadius: '25px'
          } 
        }
      )
    }
  }
}
</script>
```