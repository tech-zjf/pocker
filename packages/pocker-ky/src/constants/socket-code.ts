export const SOCKET_CONNECT_ERROR_CODE = {
    A0230: 'token无效或已过期'
};

export type Error_Code = keyof typeof SOCKET_CONNECT_ERROR_CODE;
