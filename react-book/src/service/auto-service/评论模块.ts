import { request } from '@/utils/request';

export interface QueryCommentListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  topic_type: string;
  topic_id: number;
}

export interface QueryCommentListVo {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    from_uid: number;
    topic_type: string;
    topic_id: number;
    content: string;
    images?: string;
    author_name: string;
    author_avatar: string;
    reply_info: undefined;
  }[];
  total: number;
}

export const queryCommentList = (params: QueryCommentListDTO) => {
  return request<QueryCommentListVo>({
    url: '/api/comment/queryCommentList',
    method: 'POST',
    data: params,
  });
};

export interface AddCommentDTO {
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
}

export interface AddCommentVo {
  id: number;
  create_time: string;
  update_time: string;
  from_uid: number;
  topic_type: string;
  topic_id: number;
  content: string;
  images?: string;
  author_name: string;
  author_avatar: string;
}

export const addComment = (params: AddCommentDTO) => {
  return request<AddCommentVo>({
    url: '/api/comment/addComment',
    method: 'POST',
    data: params,
  });
};

export interface RemoveCommentDTO {
  id: number;
}

export const removeComment = (params: RemoveCommentDTO) => {
  return request<{}>({
    url: '/api/comment/removeComment',
    method: 'POST',
    data: params,
  });
};

export interface QueryReplyListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  comment_id: number;
}

export interface QueryReplyListVo {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    from_uid: number;
    to_uid: number;
    comment_id: number;
    reply_type: string;
    reply_id: number;
    content: string;
    images: string;
    author_name: string;
    author_avatar: string;
  }[];
  total: number;
  has_more: boolean;
}

export const queryReplyList = (params: QueryReplyListDTO) => {
  return request<QueryReplyListVo>({
    url: '/api/comment/queryReplyList',
    method: 'POST',
    data: params,
  });
};

export interface AddReplyDTO {
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images?: string;
}

export const addReply = (params: AddReplyDTO) => {
  return request<{}>({
    url: '/api/comment/addReply',
    method: 'POST',
    data: params,
  });
};

export interface RemoveReplyDTO {
  id: number;
}

export const removeReply = (params: RemoveReplyDTO) => {
  return request<{}>({
    url: '/api/comment/removeReply',
    method: 'POST',
    data: params,
  });
};
