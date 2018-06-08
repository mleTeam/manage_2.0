export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    if(config.method === 'get' && config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/vnd.ms-excel'){
      let url = config.baseURL + config.url + formatParam(config.params)
      downloadUrl(url)
      config.url = '/'
      return config
    }

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

  $axios.onResponse(res => {
    // 处理excel文件
    //console.log(res.request.responseURL)
    // if (res.headers && (res.headers['content-type'] === 'application/vnd.ms-excel;charset=utf-8' || res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    //   downloadUrl(res.request.responseURL)
    //   return
    // }
  })

}

const formatParam = params => {
  let str = '?'
  for(let i in params){
    if(str != '?'){
      str = str + '&'
    }
    str = str + i + '=' + params[i]
  }
  return str
}

// download url
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// Add a response interceptor

