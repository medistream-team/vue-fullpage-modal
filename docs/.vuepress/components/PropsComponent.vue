<template>
  <div :style="{ color, padding: `${contentPadding}px`, fontWeight: 'bold' }">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    color: {
      type: String
    },
    contentPadding: {
      type: Number
    }
  }
}
</script>

<style scoped>
* {
  font-size: 1.5rem;
}
</style>