export const ApiCode = {
    OK: { code: '00000', msg: 'ok' },

    USER_NOT_FOUND: { code: 'A0001', msg: '用户不存在' },
    PASSWORD_ERR: { code: 'A0002', msg: '密码错误' },
    NOT_LOGIN: { code: 'A0003', msg: '登录失效' },
    CREATE_ROOM_ERROR: { code: 'A0004', msg: '创建房间失败' },
    JOIN_ERROR: { code: 'A0005', msg: '加入房间失败' },

    ROUTER_NOT_FOUND: { code: 'B0001', msg: '接口不存在' },
    SYSTEM_ERROR: { code: 'B0002', msg: '系统错误' },
};
