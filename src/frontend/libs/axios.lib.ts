import axios from 'axios'

import environmentConfig from '@/environment.config'

const axiosInstance = axios.create({
  baseURL: environmentConfig.NEXT_PUBLIC_API_ENDPOINT,
  adapter: 'fetch',
  fetchOptions: {
    cache: 'no-store',
  },
})

export default axiosInstance
