/**
 * Created by Administrator on 2018/11/30 0030.
 */
import axios from 'axios'
// import store from '../store'

const baseURL = process.env.BASE_URI + 'api'
console.log(baseURL)
class Axios {
  static instance = axios.create({
    baseURL,
    timeout: 35000
  })

  static get(url, data, config = {}) {
    // config.headers= {
    //   'token': store.state.token
    // }
    return new Promise((resolve, reject) => {
      this.instance.get(url, {
        params: data,
        ...config
      }
      ).then(res => {
        resolve(res.data)
      })
    })
  }
  // config={
  //   headers:{ 'token': store.state.token}
  // }
  static fetch(url, data, config = {}, method) {
    // config.headers= {
    //   'token': store.state.token
    // }
    return new Promise((resolve, reject) => {
      this.instance[method](url, data, config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  static put(url, data, config) {
    return this.fetch(url, data, config, 'put')
  }
  static post(url, data, config) {
    return this.fetch(url, data, config, 'post')
  }
}
export default Axios

