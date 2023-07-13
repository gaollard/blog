import { request } from '@/utils/request';

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

export const queryUserWalletAccount = (params: {}) => {
  return request<QueryWalletAccountVO>({
    url: '/api/wallet/queryUserWalletAccount',
    method: 'POST',
    data: params,
  });
};

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

export const queryUserWalletFlow = (params: {}) => {
  return request<QueryWalletFlowVO>({
    url: '/api/wallet/queryUserWalletFlow',
    method: 'POST',
    data: params,
  });
};

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

export const queryUserWalletBank = (params: {}) => {
  return request<QueryUserWalletBankVO>({
    url: '/api/wallet/queryUserWalletBank',
    method: 'POST',
    data: params,
  });
};

export interface DoBindWalletBankDTO {
  bank_account: string;
  bank_no: string;
  bank_name: string;
}

export const doBindWalletBank = (params: DoBindWalletBankDTO) => {
  return request<{}>({
    url: '/api/wallet/doBindWalletBank',
    method: 'POST',
    data: params,
  });
};

export interface DoRemoveWalletBankDTO {
  id: number;
}

export const doRemoveWalletBank = (params: DoRemoveWalletBankDTO) => {
  return request<{}>({
    url: '/api/wallet/doRemoveWalletBank',
    method: 'POST',
    data: params,
  });
};

export interface SetWalletPasswordDTO {
  password: string;
}

export const setWalletPassword = (params: SetWalletPasswordDTO) => {
  return request<{}>({
    url: '/api/wallet/setWalletPassword',
    method: 'POST',
    data: params,
  });
};

export interface DoWalletWithdrawDto {
  password: string;
  amount: number;
}

export const doWalletWithdraw = (params: DoWalletWithdrawDto) => {
  return request<{}>({
    url: '/api/wallet/doWalletWithdraw',
    method: 'POST',
    data: params,
  });
};

export interface DoWalletRechargeDTO {
  amount: number;
}

export const doWalletRecharge = (params: DoWalletRechargeDTO) => {
  return request<{}>({
    url: '/api/wallet/doWalletRecharge',
    method: 'POST',
    data: params,
  });
};

export const walletRechargeNotify = (params: {}) => {
  return request<{}>({
    url: '/api/wallet/walletRechargeNotify',
    method: 'POST',
    data: params,
  });
};
