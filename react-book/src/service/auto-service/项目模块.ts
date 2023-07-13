import { request } from '@/utils/request';

export interface QueryProjectTagDTO {
  category_id?: number;
}

export const queryTags = (params: QueryProjectTagDTO) => {
  return request<{}>({
    url: '/api/project/queryTags',
    method: 'POST',
    data: params,
  });
};

export const queryCategoryList = (params: {}) => {
  return request<{}>({
    url: '/api/project/queryCategoryList',
    method: 'POST',
    data: params,
  });
};

export interface RemoveProjectDTO {
  id?: number;
}

export const remove = (params: RemoveProjectDTO) => {
  return request<{}>({
    url: '/api/project/remove',
    method: 'POST',
    data: params,
  });
};

export interface CreateProjectDTO {
  id?: number;
  create_time?: string;
  update_time?: string;
  user_id?: number;
  title?: string;
  skill?: string;
  description?: string;
  remark?: string;
  reward?: number;
  images?: string;
  city?: string;
  city_code?: string;
  category_id?: number;
  task_type?: number;
  task_type_name?: string;
}

export const create = (params: CreateProjectDTO) => {
  return request<{}>({
    url: '/api/project/create',
    method: 'POST',
    data: params,
  });
};

export interface CreateProjectDTO {
  id?: number;
  create_time?: string;
  update_time?: string;
  user_id?: number;
  title?: string;
  skill?: string;
  description?: string;
  remark?: string;
  reward?: number;
  images?: string;
  city?: string;
  city_code?: string;
  category_id?: number;
  task_type?: number;
  task_type_name?: string;
}

export interface ProjectUpdateVo {
  status: boolean;
}

export const updateProject = (params: CreateProjectDTO) => {
  return request<ProjectUpdateVo>({
    url: '/api/project/updateProject',
    method: 'POST',
    data: params,
  });
};

export interface QueryProjectDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  title?: string;
  task_type?: string;
  category_id?: string;
  id?: number;
}

export interface ProjectListVo {
  total: number;
  list: {
    id: number;
    create_time: string;
    update_time: string;
    user_id: number;
    title: string;
    skill: string;
    description: string;
    remark: string;
    reward: number;
    images: string;
    city: string;
    city_code: string;
    category_id: number;
    task_type: number;
    task_type_name: string;
    category_name: string;
    author_name: string;
    author_avatar: string;
  }[];
}

export const queryList = (params: QueryProjectDTO) => {
  return request<ProjectListVo>({
    url: '/api/project/queryList',
    method: 'POST',
    data: params,
  });
};

export interface QueryListByIdListDTO {
  id: any[];
}

export interface ProjectListVo {
  total: number;
  list: {
    id: number;
    create_time: string;
    update_time: string;
    user_id: number;
    title: string;
    skill: string;
    description: string;
    remark: string;
    reward: number;
    images: string;
    city: string;
    city_code: string;
    category_id: number;
    task_type: number;
    task_type_name: string;
    category_name: string;
    author_name: string;
    author_avatar: string;
  }[];
}

export const queryListByIdList = (params: QueryListByIdListDTO) => {
  return request<ProjectListVo>({
    url: '/api/project/queryListByIdList',
    method: 'POST',
    data: params,
  });
};

export interface QueryProjectDetailDTO {
  id: number;
}

export interface ProjectItemVo {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  title: string;
  skill: string;
  description: string;
  remark: string;
  reward: number;
  images: string;
  city: string;
  city_code: string;
  category_id: number;
  task_type: number;
  task_type_name: string;
  category_name: string;
  author_name: string;
  author_avatar: string;
}

export const queryDetail = (params: QueryProjectDetailDTO) => {
  return request<ProjectItemVo>({
    url: '/api/project/queryDetail',
    method: 'POST',
    data: params,
  });
};
