class PromiseTools {
    static sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * promise 队列任务
     *
     * for循环执行效率太低，每个都需要等待上一个执行完才可以继续下一个循环
     *
     * promise.all 并行执行太多，可能导致io阻塞，例如数据库链接太多，导致数据库链接异常
     *
     * 使用分割的方式，一次执行定量的promise，保证效率与安全
     */
    static async queue<T, K>(dataList: T[], callBack: (item: T, index: number) => Promise<K> | K, spliceLength = 5): Promise<K[]> {
        if (!dataList?.length) {
            return [];
        }
        const list: K[] = [];
        for (let i = 0; i < dataList.length; i += spliceLength) {
            const step = i + spliceLength < dataList.length ? spliceLength : dataList.length - i;
            const promiseList = new Array(step).fill(0).map((_, index) => callBack(dataList[i + index], i + index));
            const result = await Promise.all(promiseList);
            list.push(...result);
        }
        return list;
    }

    /**
     * promise 轮询任务
     *
     * fn函数需要返回一个status，一个data。
     *
     * 如果status为ture则结束轮询
     *
     * 轮询超时为timeOutMs，如果超时则结束轮询
     *
     * 轮询间隔为intervalMs
     */
    static async polling<T>(fn: () => Promise<{ status: true; data: T } | { status?: false; data?: T }>, { timeOutMs = 5000, intervalMs = 1000 } = {}): Promise<T> {
        const startTime = new Date().valueOf();
        while (new Date().valueOf() - startTime <= timeOutMs) {
            const res = await fn();
            if (res.status) {
                return res.data;
            }
            await PromiseTools.sleep(intervalMs);
        }
        throw new Error(`promiseTolls polling timeout ms ${timeOutMs}`);
    }
}

export default PromiseTools;
