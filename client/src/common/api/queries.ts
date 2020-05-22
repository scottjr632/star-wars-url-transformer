import axios from 'axios'

interface TransformedUrlResponse {
  url: string
}

export const getTransformedUrl = async (url: string): Promise<TransformedUrlResponse> => {
  const res = await axios.post('/', { url })
  return res.data
}