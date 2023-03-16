import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
})

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    // console.log(error.response.data.message);
    return Promise.reject(error.response.data)
  }
)

export default api
