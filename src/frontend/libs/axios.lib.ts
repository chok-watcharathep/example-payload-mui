import axios from 'axios'

import environmentConfig from '@/environment.config'

const axiosInstance = axios.create({
  baseURL: environmentConfig.NEXT_PUBLIC_APP_BASE_URL,
  adapter: 'fetch',
  fetchOptions: {
    cache: 'no-store',
    next: {
      revalidate: 60,
    },
  },
})

export default axiosInstance
