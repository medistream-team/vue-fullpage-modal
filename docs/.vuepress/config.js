module.exports = {
  // FIXME: 문서용 임시 base
  base: "/vue-fullpage-modal/",
  title: 'Fullpage Modal',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/'},
      { text: 'Playground', link: '/playground/'},
      { text: 'Examples', link: '/examples/'},
      { text: 'Github', link: 'https://github.com/medistream-team/vue-fullpage-modal'},
    ],
    sidebar: [
      '/',
      '/playground/',
      '/examples/',
      '/api/'
    ]
  },
  // https://github.com/picturepan2/devices.css
  head: [
    ['link', { rel: 'stylesheet', href: '/devices.min.css' }],
    ['link', { rel: 'stylesheet', href: '/modify-devices.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900'}],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'}]
  ],
  port: 8088, 
  chainWebpack(config, isServer){
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
  }
}