import { request } from '@/utils/request';

export interface SaveActionDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
  flag: number;
}

export const saveActionForUser = (params: SaveActionDTO) => {
  return request<{}>({
    url: '/api/track/saveActionForUser',
    method: 'POST',
    data: params,
  });
};

export interface QueryListForUserDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
}

export interface QueryTrackListForUserVO {
  total: number;
  list: {
    id: number;
    create_time: string;
    update_time: string;
    entity_type: number;
    action_type: number;
    entity_id: number;
    from_uid: number;
    author_name: string;
    author_id: number;
  }[];
}

export const queryListForUser = (params: QueryListForUserDTO) => {
  return request<QueryTrackListForUserVO>({
    url: '/api/track/queryListForUser',
    method: 'POST',
    data: params,
  });
};

export interface QueryStatusForUserDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export const queryStatusForUser = (params: QueryStatusForUserDTO) => {
  return request<{}>({
    url: '/api/track/queryStatusForUser',
    method: 'POST',
    data: params,
  });
};

export interface QueryCountForEntityDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export const queryCountForEntity = (params: QueryCountForEntityDTO) => {
  return request<{}>({
    url: '/api/track/queryCountForEntity',
    method: 'POST',
    data: params,
  });
};
