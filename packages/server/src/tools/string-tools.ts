class StringTools {
    /** 将标签替换为空 */
    static filterTagToEmpty(htmlStr: string) {
        const regex = /<[^>]+>/g;
        const str = htmlStr.replace(regex, '');
        return str;
    }

    static generateRandomString(length = 16) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

export default StringTools;
