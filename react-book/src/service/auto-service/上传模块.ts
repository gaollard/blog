import { request } from '@/utils/request';

export const get7niuToken = (params: {}) => {
  return request<{}>({
    url: '/api/upload/get7niuToken',
    method: 'POST',
    data: params,
  });
};

export const files = (params: {}) => {
  return request<{}>({
    url: '/api/upload/files',
    method: 'POST',
    data: params,
  });
};

export const file = (params: {}) => {
  return request<{}>({
    url: '/api/upload/file',
    method: 'POST',
    data: params,
  });
};
