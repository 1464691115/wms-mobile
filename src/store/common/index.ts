
export function installState<S>(options: S) {
    return options
}



interface SotreType<S, M, A> {
    commit<CK extends keyof M>(type: CK, params: GetParameters<M[CK]>[1]): any
    dispatch<DK extends keyof A>(type: DK, params: GetParameters<A[DK]>[1]): GetReturnType<A[DK]>
    state: S
}

type GetParameters<T> = T extends (...args: infer P) => any ? P : never;
type GetReturnType<T> = T extends (...args: any) => infer R ? R : any;

interface ModulesOptions<S, M, A> {
    namespaced: boolean,
    state: S,
    mutations: M,
    actions: A & {
        [AK in keyof A]: <ST extends SotreType<S, M, A>>(store: ST, payload: any) => any
    }
}

export function createSlice<
    S,
    M extends Record<any, (state: S, payload: any) => void>,
    A
>(options: ModulesOptions<S, M, A>): ModulesOptions<S, M, A>;
export function createSlice(options) {
    return options
}