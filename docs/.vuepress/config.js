module.exports = {
  base: "/vue-fullpage-modal/",
  title: 'Fullpage Modal',
  themeConfig: {
    logo: '/vue-fullpage-modal.svg',
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
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'}],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' }],
    ['link', { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' }],
  ],
  port: 8088, 
  chainWebpack(config, isServer){
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js')
  }
}