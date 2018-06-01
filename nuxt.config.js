module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'manage_2.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '米粒儿金融管理系统2.0版' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['element-ui']
  },
  plugins: [
    { src: '~plugins/element-ui'},'~/plugins/axios'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/v2',
      {
        target: 'http://csactivity.milibanking.com:9050', // api主机
        ws: false
      }
    ]
  ],
  axios: {
    proxy: true,
    baseURL: 'http://csactivity.milibanking.com'
  },

  // proxy: {
  //   '/app/': {
  //     target: 'http://csapp.milibanking.com'
  //   }
  // }
}
