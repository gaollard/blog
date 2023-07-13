import { request } from '@/utils/request';

export const test = (params: {}) => {
  return request<{}>({
    url: '/api/ping/test',
    method: 'GET',
    data: params,
  });
};

export const mongo = (params: {}) => {
  return request<{}>({
    url: '/api/ping/mongo',
    method: 'GET',
    data: params,
  });
};

export const redirect = (params: {}) => {
  return request<{}>({
    url: '/api/ping/redirect',
    method: 'GET',
    data: params,
  });
};
