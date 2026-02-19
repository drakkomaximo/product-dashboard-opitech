import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not defined')
}

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
})

export default axiosClient
