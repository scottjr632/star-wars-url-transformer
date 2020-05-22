import axios from 'axios';

export interface TransformedUrlResponse {
  url: string
}

export const getTransformedUrl = async (url: string): Promise<TransformedUrlResponse> => {
  const res = await axios.post('/api/', { url });
  return res.data;
};