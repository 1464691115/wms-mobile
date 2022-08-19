export function installState<S>(options: S) {
    return options
}

interface SotreType<S, M, A, G> {
    commit<CK extends keyof M>(type: CK, params: GetParameters<M[CK]>[1]): any
    dispatch<DK extends keyof A>(type: DK, params: GetParameters<A[DK]>[1]): GetReturnType<A[DK]>
    getters: { [GK in keyof G]: GetReturnType<G[GK]> }
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
    dispathAct?: A
}

export function createModules<
    S,
    M extends Record<any, (state: S, payload: any) => void>,
    A,
    G extends Record<any, (state: S) => any>
>(options: ModulesOptions<S, M, A, G>): ModulesOptions<S, M, A, G>;
export function createModules(options) {
    return { namespaced: true, ...options }
}
