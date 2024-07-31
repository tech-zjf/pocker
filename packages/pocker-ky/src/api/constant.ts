/** api状态码 */
export enum ApiCode {
    /** 成功 */
    SUCCESS = '00000',

    /** token无效或已过期 */
    TOKEN_INVALID = 'A0230',

    /** 系统执行出错 */
    SOCKET_ERROR = 'B0001'
}

export const socket_connect_error_code = new Map([
    [ApiCode.SUCCESS, '成功'],
    [ApiCode.TOKEN_INVALID, 'token无效或已过期'],
    [ApiCode.SOCKET_ERROR, '系统执行出错']
]);
