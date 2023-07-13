export interface SendSmsCodeDto {
  mobile: string;
}

export interface RegisterDto {
  account: string;
  password?: string;
  code?: string;
  registerType: string;
}

export interface RegisterRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

export interface RegisterByAccountDto {
  account: string;
  password?: string;
}

export interface RegisterRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

export interface LoginDto {
  account: string;
  password?: string;
  code?: string;
  codeType?: string;
  loginType: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

export interface PwdLoginDto {
  account: string;
  password: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

export interface CodeLoginDTO {
  account: string;
  code: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
  reputation: number;
}

export interface CheckLoginRes {
  status: boolean;
  user: undefined;
}

export interface GetUserInfoRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
}

export interface SendCodeDto {}

export interface SendCodeRes {
  status: boolean;
}

export interface UpdateUserInfoDto {}

export interface InitPasswordDto {}

export interface InitPasswordRes {
  status: boolean;
}

export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}

export interface UpdatePwdRes {
  status: boolean;
}

export interface BindMobileDto {
  mobile: string;
  code: string;
}

export interface BindEmailDto {
  email: string;
  code: string;
}

export interface GetWxQrCodeForAuthCodeDTO {
  redirect: string;
}

export interface GetWexinAuthUrlVo {
  uri: string;
  token: string;
  img: string;
}

export interface GetUserReputationFlowDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
}

export interface QueryCommentListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  topic_type: string;
  topic_id: number;
}

export interface CommentItemVo {
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

export interface RemoveCommentDTO {
  id: number;
}

export interface QueryReplyListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  comment_id: number;
}

export interface ReplyItemVo {
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

export interface AddReplyDTO {
  to_uid: number;
  comment_id: number;
  reply_type: string;
  reply_id: number;
  content: string;
  images?: string;
}

export interface RemoveReplyDTO {
  id: number;
}

export interface QueryFeedTagDTO {
  category_id?: number;
}

export interface RemoveFeedDTO {
  id?: number;
}

export interface CreateFeedDTO {
  title: string;
  content: string;
  images: string;
  category_id: number;
}

export interface QueryFeedDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  title?: string;
  category_id?: string;
}

export interface SaveActionDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
  flag: number;
}

export interface QueryListForUserDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
}

export interface TrackItemVo {
  id: number;
  create_time: string;
  update_time: string;
  entity_type: number;
  action_type: number;
  entity_id: number;
  from_uid: number;
  author_name: string;
  author_id: number;
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

export interface QueryStatusForUserDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export interface QueryCountForEntityDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export interface QueryProjectTagDTO {
  category_id?: number;
}

export interface RemoveProjectDTO {
  id?: number;
}

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

export interface QueryProjectDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  title?: string;
  task_type?: string;
  category_id?: string;
  id?: number;
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

export interface QueryListByIdListDTO {
  id: any[];
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

export interface AddrQueryListDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
}

export interface AddrItemQueryDTO {}

export interface AddrAddDTO {}

export interface AddrDeleteDTO {}

export interface AddrUpdateDTO {}

export interface QueryWalletAccountVO {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  password: string;
  amount: number;
  frozen_amount: number;
  status: number;
}

export interface WalletAccountFlowEntity {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  record_no: string;
  third_no: string;
  amount: number;
  change_type: number;
  action_type: number;
  description: string;
}

export interface QueryWalletFlowVO {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    user_id: number;
    record_no: string;
    third_no: string;
    amount: number;
    change_type: number;
    action_type: number;
    description: string;
  }[];
  total: number;
}

export interface WalletBankEntity {
  id: number;
  create_time: string;
  update_time: string;
  user_id: number;
  bank_id: number;
  bank_name: string;
  bank_account: string;
  bank_no: string;
}

export interface QueryUserWalletBankVO {
  list: {
    id: number;
    create_time: string;
    update_time: string;
    user_id: number;
    bank_id: number;
    bank_name: string;
    bank_account: string;
    bank_no: string;
  }[];
}

export interface DoBindWalletBankDTO {
  bank_account: string;
  bank_no: string;
  bank_name: string;
}

export interface DoRemoveWalletBankDTO {
  id: number;
}

export interface SetWalletPasswordDTO {
  password: string;
}

export interface DoWalletWithdrawDto {
  password: string;
  amount: number;
}

export interface DoWalletRechargeDTO {
  amount: number;
}

export interface QueryNavListDto {}

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

export interface QueryTagsDto {}

export interface QueryChildrenDto {
  id?: number;
  name?: string;
  is_nav?: number;
  is_folder?: number;
}

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
