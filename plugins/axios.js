export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/')
    } else if (code === 403) {
      redirect('/403')
    }  else if (code === 404) {
      redirect('/404')
    }
  })
}
