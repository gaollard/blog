import { request } from '@/utils/request';

export const getCity = (params: {}) => {
  return request<{}>({
    url: '/api/general/getCity',
    method: 'POST',
    data: params,
  });
};
