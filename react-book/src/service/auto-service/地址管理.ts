import { request } from '@/utils/request';

export interface AddrQueryListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
}

export const queryAddrList = (params: AddrQueryListDTO) => {
  return request<{}>({
    url: '/api/address/queryAddrList',
    method: 'POST',
    data: params,
  });
};

export interface AddrItemQueryDTO {}

export const queryAddrDetail = (params: AddrItemQueryDTO) => {
  return request<{}>({
    url: '/api/address/queryAddrDetail',
    method: 'POST',
    data: params,
  });
};

export interface AddrAddDTO {}

export const addAddr = (params: AddrAddDTO) => {
  return request<{}>({
    url: '/api/address/addAddr',
    method: 'POST',
    data: params,
  });
};

export interface AddrDeleteDTO {}

export const deleteAddr = (params: AddrDeleteDTO) => {
  return request<{}>({
    url: '/api/address/deleteAddr',
    method: 'POST',
    data: params,
  });
};

export interface AddrUpdateDTO {}

export const updateAddr = (params: AddrUpdateDTO) => {
  return request<{}>({
    url: '/api/address/updateAddr',
    method: 'POST',
    data: params,
  });
};
