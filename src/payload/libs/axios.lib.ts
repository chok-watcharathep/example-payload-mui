import axios from 'axios'

import environmentConfig from '@/environment.config'

const adminAxiosInstance = axios.create({
  baseURL: environmentConfig.NEXT_PUBLIC_PAYLOAD_API_ENDPOINT,
  adapter: 'fetch',
  fetchOptions: {
    cache: 'no-store',
  },
})

export default adminAxiosInstance
