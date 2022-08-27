interface SotreType<S, M, A, G> {
    commit<CK extends keyof M>(type: CK, params: GetParameters<M[CK]>[1]): any
    dispatch<DK extends keyof A, O extends { root: boolean }>(type: O extends { root: true } ? string : DK, params: GetParameters<A[DK]>[1], options?: O): GetReturnType<A[DK]>
    //@ts-ignore
    getters: { [GK in keyof G]: ReturnType<G[GK]> },
    state: S
}

type GetParameters<T> = T extends (...args: infer P) => any ? P : never;
type GetReturnType<T> = T extends (...args: any) => infer R ? R : any;

interface ModulesOptions<S, M, A, G> {
    namespaced?: boolean,
    state: S,
    mutations?: M,
    getters?: G,
    actions: A | {
        [AK in keyof A]: <ST extends SotreType<S, M, A, G>>(store: ST, payload: any) => any
    }
    dispathAct?: A,
}

export function createModules<
    S,
    M extends Record<any, (state: S, payload: any) => void>,
    A,
    G extends {
        [GK: string]: (state: S) => any
    },
>(options: ModulesOptions<S, M, A, G>): ModulesOptions<S, M, A, G>


export function createModules(options) {
    return { namespaced: true, ...options }
}

export function installState<S>(options: S) {
    return options
}
