import { request } from '@/utils/request';

export interface SendSmsCodeDto {
  mobile: string;
}

export const sendSmsCode = (params: SendSmsCodeDto) => {
  return request<{}>({
    url: '/api/sms-pop/sendSmsCode',
    method: 'POST',
    data: params,
  });
};
