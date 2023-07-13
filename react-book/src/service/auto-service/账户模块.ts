import { request } from '@/utils/request';

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

export const register = (params: RegisterDto) => {
  return request<RegisterRes>({
    url: '/api/account/register',
    method: 'POST',
    data: params,
  });
};

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

export const registerByAccount = (params: RegisterByAccountDto) => {
  return request<RegisterRes>({
    url: '/api/account/registerByAccount',
    method: 'POST',
    data: params,
  });
};

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

export const login = (params: LoginDto) => {
  return request<LoginRes>({
    url: '/api/account/login',
    method: 'POST',
    data: params,
  });
};

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

export const pwdLogin = (params: PwdLoginDto) => {
  return request<LoginRes>({
    url: '/api/account/pwdLogin',
    method: 'POST',
    data: params,
  });
};

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

export const codeLogin = (params: CodeLoginDTO) => {
  return request<LoginRes>({
    url: '/api/account/codeLogin',
    method: 'POST',
    data: params,
  });
};

export const logout = (params: {}) => {
  return request<{}>({
    url: '/api/account/logout',
    method: 'POST',
    data: params,
  });
};

export interface CheckLoginRes {
  status: boolean;
  user: undefined;
}

export const checkLogin = (params: {}) => {
  return request<CheckLoginRes>({
    url: '/api/account/checkLogin',
    method: 'POST',
    data: params,
  });
};

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

export const getUserInfo = (params: {}) => {
  return request<GetUserInfoRes>({
    url: '/api/account/getUserInfo',
    method: 'POST',
    data: params,
  });
};

export interface SendCodeDto {}

export interface SendCodeRes {
  status: boolean;
}

export const sendCode = (params: SendCodeDto) => {
  return request<SendCodeRes>({
    url: '/api/account/sendCode',
    method: 'POST',
    data: params,
  });
};

export interface UpdateUserInfoDto {}

export const updateUserInfo = (params: UpdateUserInfoDto) => {
  return request<{}>({
    url: '/api/account/updateUserInfo',
    method: 'POST',
    data: params,
  });
};

export interface InitPasswordDto {}

export interface InitPasswordRes {
  status: boolean;
}

export const initPassword = (params: InitPasswordDto) => {
  return request<InitPasswordRes>({
    url: '/api/account/initPassword',
    method: 'POST',
    data: params,
  });
};

export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}

export interface UpdatePwdRes {
  status: boolean;
}

export const updatePassword = (params: UpdatePasswordDto) => {
  return request<UpdatePwdRes>({
    url: '/api/account/updatePassword',
    method: 'POST',
    data: params,
  });
};

export interface BindMobileDto {
  mobile: string;
  code: string;
}

export const bindMobile = (params: BindMobileDto) => {
  return request<{}>({
    url: '/api/account/bindMobile',
    method: 'POST',
    data: params,
  });
};

export interface BindEmailDto {
  email: string;
  code: string;
}

export const bindEmail = (params: BindEmailDto) => {
  return request<{}>({
    url: '/api/account/bindEmail',
    method: 'POST',
    data: params,
  });
};

export const queryWxLoginResult = (params: {}) => {
  return request<{}>({
    url: '/api/account/queryWxLoginResult',
    method: 'POST',
    data: params,
  });
};

export interface GetWxQrCodeForAuthCodeDTO {
  redirect: string;
}

export interface GetWexinAuthUrlVo {
  uri: string;
  token: string;
  img: string;
}

export const getWexinAuthUrl = (params: GetWxQrCodeForAuthCodeDTO) => {
  return request<GetWexinAuthUrlVo>({
    url: '/api/account/getWexinAuthUrl',
    method: 'POST',
    data: params,
  });
};

export const wexinLoginByAuthCode = (params: {}) => {
  return request<{}>({
    url: '/api/account/wexinLoginByAuthCode',
    method: 'POST',
    data: params,
  });
};
