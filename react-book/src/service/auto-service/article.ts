import { request } from '@/utils/request';

export interface QueryNavListDto {}

export interface QueryNavListVo {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    pid: number;
    name: string;
    content: string;
    is_nav: number;
    nav_id: number;
    is_folder: number;
  }[];
}

export const queryNavList = (params: QueryNavListDto) => {
  return request<QueryNavListVo>({
    url: '/api/article/queryNavList',
    method: 'POST',
    data: params,
  });
};

export interface QueryTagsDto {}

export const queryTags = (params: QueryTagsDto) => {
  return request<{}>({
    url: '/api/article/queryTags',
    method: 'POST',
    data: params,
  });
};

export interface QueryChildrenDto {
  id?: number;
  name?: string;
  is_nav?: number;
  is_folder?: number;
}

export interface QueryChildrenVo {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    pid: number;
    name: string;
    content: string;
    is_nav: number;
    nav_id: number;
    is_folder: number;
  }[];
}

export const queryChildren = (params: QueryChildrenDto) => {
  return request<QueryChildrenVo>({
    url: '/api/article/queryChildren',
    method: 'POST',
    data: params,
  });
};

export interface QueryArticleDetail {}

export interface ArticleEntity {
  id: number;
  create_time: string;
  update_time: string;
  pid: number;
  name: string;
  content: string;
  is_nav: number;
  nav_id: number;
  is_folder: number;
}

export const queryArticleDetail = (params: QueryArticleDetail) => {
  return request<ArticleEntity>({
    url: '/api/article/queryArticleDetail',
    method: 'POST',
    data: params,
  });
};
