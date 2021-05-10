// https://vuetifyjs.com/en/getting-started/installation/#usage-with-vuepress
const Vuetify = require('vuetify')
require("vuetify/dist/vuetify.min.css")
require("./public/disable-vuetify-default.css")
// https://vuepress.vuejs.org/theme/writing-a-theme.html#app-level-enhancements
// async function is also supported, too
export default async ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
  isServer // is this enhancement applied in server-rendering or client
}) => {
  // ...apply enhancements to the app
  Vue.use(Vuetify)
  if(!isServer){
    await import('../../dist/FullpageModal').then(FullpageModalPlugin => {
      Vue.use(FullpageModalPlugin.default)
    })
  }
  options.vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#3eaf7c'
        }
      }
    }
  })
}