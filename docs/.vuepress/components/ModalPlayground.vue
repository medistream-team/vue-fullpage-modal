<template>
<!-- https://stackoverflow.com/a/59197780/9302758 -->
<v-app>
  <div class="wrapper">
    <div class="props-wrapper">
      <div class="props-top">
        <button class="button open-modal" @click="openModal">
          {{ open ? "Close" : "Open" }}
        </button>
        <button class="button random" @click="random">🎲 Random</button>
      </div>
      <div class="prop-items-wrapper">
        <div class="prop-item">
          <v-text-field v-model="width" hide-details="auto" label="width" />
        </div>
        <div class="prop-item">
          <v-text-field v-model="height" hide-details="auto" label="height" />
        </div>
        <div class="prop-item">
          <v-text-field v-model="maxHeight" hide-details="auto" label="maxHeight" />
        </div>
        <div class="prop-item">
          <v-text-field v-model="backgroundColor" hide-details="auto" label="backgroundColor" />
        </div>
        <div class="prop-item">
          <v-checkbox v-model="escToClose" hide-details="auto" label="escToClose" />
        </div>
        <div class="prop-item">
          <v-checkbox v-model="clickToClose" hide-details="auto" label="clickToClose" />
        </div>
        <div :style="{ marginTop: '8px' }" class="prop-item">
          <v-text-field label="placement"  hide-details="auto" v-model="computedPlacement" type="text" name="placement" id="placement" disabled />
          <div :style="{ display: 'flex', marginLeft: '20px', marginTop: '5px' }">
            <v-select :style="{ marginRight: '5px' }" :items="horizontalItems" hide-details="auto" label="horizontal" v-model="horizontal" name="horizontal" id="horizontal" />
            <v-select :items="verticalItems" hide-details="auto" label="vertical" v-model="vertical" name="vertical" id="vertical" />
          </div>
        </div>
        <div class="prop-item">
          <v-text-field label="modalStyles" hide-details="auto" v-model="modalStyles" name="modalStyles" id="modalStyles" />
          <!-- <div class="error-message" v-if="modalStylesInputError">{{ modalStylesInputError }}</div> -->
        </div>
        <div class="prop-item">
          <v-text-field label="overlayStyles" hide-details="auto" v-model="overlayStyles" name="overlayStyles" id="overlayStyles" />
        </div>
        <div class="prop-item">
          <v-text-field label="contentStyles" hide-details="auto" v-model="contentStyles" name="contentStyles" id="contentStyles" />
        </div>
        <div class="prop-item">
          <v-select label="animation" v-model="animation" :items="animationItems" name="animation" id="animation" />
        </div>
      </div>
    </div>
      <div :style="{ transform: 'scale(0.7)', transformOrigin: '100% 10%' }" class="device device-iphone-8">
        <div class="device-frame">
        <mobile-portal-iframe
          class="device-content"
          ref="ifr"
          :baseUrl="$withBase('/simulator/playground.html')"
          v-model="open"
          :template="template"
          :componentName="componentName"
          :modalProps="computedModalProps"
        />
        </div>
        <div class="device-stripe"></div>
        <div class="device-header"></div>
        <div class="device-sensors"></div>
        <div class="device-btns"></div>
        <div class="device-power"></div>
      <!-- <div :style="{ display: 'flex', justifyContent: 'space-around' }">
        <div class="iframe-prop">
          <label for="width">width</label>
          <input type="number" name="width" id="width" />
        </div>
        <div class="iframe-prop">
          <label for="height">height</label>
          <input type="number" name="height" id="height" />
        </div>
      </div> -->
    </div>
  </div>
</v-app>
</template>

<script>
function getRandomRgba(){
  return `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.random() * 0.5 + 0.5})`
}

function getRandomInteger(range = 1){
  return Math.round(Math.random() * range)
}

const borderStyles = ['dotted', 'dashed', 'solid', 'double']

function getRandomBorder(){
  const borderWidth = getRandomInteger(15)
  const borderStyle = borderStyles[getRandomInteger(borderStyles.length - 1)]
  const borderColor = getRandomRgba()
  return `border: ${borderWidth}px ${borderStyle} ${borderColor};`
}

export default {
  name: "modal-playground",
  data: function () {
    return {
      open: false,
      template: `<div :style="{ padding: '15px 15px 15px 15px' }"><div :style="{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '5px' }">title</div><div :style="{ fontSize: '1.5rem' }">Aute nisi enim aliquip esse consectetur ea. Incididunt minim exercitation eu Lorem officia reprehenderit pariatur sit id occaecat. Incididunt nostrud et quis in laboris. Ullamco elit anim pariatur aliquip. Enim esse ullamco sint elit aute ut occaecat enim irure consequat aliquip. Officia ex amet ut est incididunt ad laborum qui in pariatur deserunt.</div></div>`,
      componentName: undefined,
      modalProps: {},
      width: undefined,
      height: undefined,
      maxHeight: undefined,
      backgroundColor: undefined,
      escToClose: true,
      clickToClose: true,
      horizontal: 'center',
      horizontalItems: ['left', 'center', 'right'],
      vertical: 'bottom',
      verticalItems: ['top', 'center', 'bottom'],
      modalStyles: undefined,
      modalStylesInputError: undefined,
      overlayStyles: undefined,
      contentStyles: undefined,
      animation: 'bounce-up',
      animationItems: ['fade', 'fade-up', 'bounce-up'],
      randomBase: {
        width: ['100%', 50, 100, 500, '200px', ''],
        height: ['100%', 300, 1000, 1500, '200px', ''],
        maxHeight: ['100%', 300, '200px', ''],
        // FIXME: hex color not supproted in Playground
        backgroundColor: ['red', '', 'rgba(128, 128, 128, 0.4)', 'cadetblue', 'random', 'random'],
        horizontal: ['left', 'center', 'right'],
        vertical: ['top', 'center', 'bottom'],
        modalStyles: ['justify-content: center;', '{ "justifyContent": "flex-start" }', ''],
        overlayStyles: ['{ "backgroundColor": "rgba(0, 0, 0, 0)" }', 'random', ''],
        contentStyles: ['{ "border-radius": "8px" }', '{ "overflow": "hidden" }', 'random'],
      }
    };
  },
  methods: {
    openModal() {
      if (this.open) {
        return this.$refs.ifr.$el.contentWindow.postMessage("close");
      }
      this.open = true;
    },
    random() {
      this.height = this.getRandomValueFromBase('height')
      this.width = this.getRandomValueFromBase('width')
      this.maxHeight = this.getRandomValueFromBase('maxHeight')
      this.backgroundColor = this.getRandomBackground()
      this.vertical = this.getRandomValueFromBase('vertical')
      this.horizontal = this.getRandomValueFromBase('horizontal')
      this.modalStyles = this.getRandomValueFromBase('modalStyles')
      this.overlayStyles = this.getRandomBackground()
      this.contentStyles = this.getRandomContentStyles()
    },
    getRandomBackground(){
      const backgroundColor = this.getRandomValueFromBase('backgroundColor')
      if(backgroundColor === 'random') return getRandomRgba()
      return backgroundColor
    },
    getRandomContentStyles(){
      const contentStyles = this.getRandomValueFromBase('contentStyles')
      if(contentStyles === 'random') return getRandomBorder()
      return contentStyles
    },
    getRandomValueFromBase(propName){
      const propBaseValues = this.randomBase[propName]
      return propBaseValues[getRandomInteger(propBaseValues.length - 1)]
    }
  },
  computed: {
    computedModalProps: function () {
      let { height, width, maxHeight, backgroundColor, modalStyles, overlayStyles, contentStyles } = this

      if(!isNaN(Number(height))){
        if(height !== ''){
          height = Number(height)
        }
        if(height === ''){
          height = undefined
        }
      }

      if(!isNaN(Number(width))){
        if(width !== ''){
          width = Number(width)
        }
        if(width === ''){
          width = undefined
        }
      }

      if(!isNaN(Number(maxHeight))){
        if(maxHeight !== ''){
          maxHeight = Number(maxHeight)
        }
        if(maxHeight === ''){
          maxHeight = undefined
        }
      }

      if(backgroundColor === ''){
        backgroundColor = undefined
      }

      if(modalStyles !== undefined){
        let errorExist = false

        try {
          if(modalStyles.includes('{')){
            modalStyles = JSON.parse(modalStyles)
          }
          errorExist = false
        } catch (error) {
          errorExist = true
          console.dir(error)
        } finally {
          if(errorExist){
            this.modalStylesInputError = 'Please enter the correct json value'
          }

          if(!errorExist){
            this.modalStylesInputError = undefined
          }
        }

        if(modalStyles === ''){
          modalStyles = undefined
        }
      }

      if(modalStyles === ''){
        modalStyles = undefined
      }

      if(overlayStyles && overlayStyles.includes('{')){
        overlayStyles = JSON.parse(overlayStyles)
      }
      
      if(contentStyles === ''){
        contentStyles = undefined
      }

      if(contentStyles && contentStyles.includes('{')){
        contentStyles = JSON.parse(contentStyles)
      }

      return {
        width,
        height,
        maxHeight,
        backgroundColor,
        escToClose: this.escToClose,
        clickToClose: this.clickToClose,
        placement: this.computedPlacement,
        modalStyles,
        overlayStyles,
        contentStyles,
        animation: this.animation
      }
    },
    computedPlacement: function () {
      return this.horizontal + ' ' + this.vertical
    }
  }
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  max-height: 700px;
}

.props-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.props-top {
  display: flex;
}

.prop-item:not(:first-child) {
  margin-top: 5px;
}

.button {
  width: 100px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: 14px;
  cursor: pointer;
}

.button:not(:last-child) {
  margin-right: 5px;
}

.open-modal {
  background-color: #3eaf7c;
  color: #fff;
}

.iframe-prop input {
  width: 50px;
}

/* inputs */
input[type="text"] {
  width: 160px;
  border-radius: 2px;
  box-sizing: border-box;
  color: #152447;
  font-size: 13px;
}
</style>