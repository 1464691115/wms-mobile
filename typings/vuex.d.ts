import store from '@/store'
import { InjectionKey } from 'vue'

declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
    }

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
    }
}

declare module 'vuex' {
    //TODO kesen: 2022-05-21  模块化 dispatch、commit、getters
    type _StoreOptions<S, M extends ModuleTree<S>> = StoreOptions<S> & { modules: M }

    /** 要重构的 方法 */
    type ReconstitutionFnKey = 'dispatch' | 'commit' | 'getters'
    /** 要重构的 属性 */
    type ReconstitutionStKey = 'dispathAct' | 'mutations' | 'getters' | 'state'

    type _Store<S, M extends ModuleTree<S>> = Omit<Store<S>, ReconstitutionFnKey> & {
        state: GetStoreValue<M, 'state'>
        /** 如遇到type没有提示的情况下，请检查 store/index.ts 是否报错，actions属性不能为空，请给给空字段 */
        dispatch<K extends keyof T, T = GetParmType<M, 'dispathAct'>>(type: K, payload?: T[K]['params']): T[K]['result']
        /** 如遇到type没有提示的情况下，请检查 store/index.ts 是否报错，actions属性不能为空，请给给空字段 */
        commit<K extends keyof T, T = GetParmType<M, 'mutations'>>(type: K, payload: T[K]['params']): T[K]['result']
        /** 如遇到type没有提示的情况下，请检查 store/index.ts 是否报错，actions属性不能为空，请给给空字段 */
        getters: GetParmType<M, 'getters'>['result']
    }

    type GetStoreValue<S, K extends ReconstitutionStKey> = { [KS in keyof S]: S[KS][K] }


    type GetParmType<T, V extends ReconstitutionStKey> = valueOfU<{
        [K in keyof T]: {
            [C in keyof Exclude<T[K][V], undefined> as `${K}/${C}`]: { result: ReturnType<Exclude<T[K][V], undefined>[C]>, params: Parameters<Exclude<T[K][V], undefined>[C]>[1] }
        }
    }>

    type GetPathValue<T> = T extends `${infer key}/${infer value}` ? value : never
    type GetPathKey<T> = T extends `${infer key}/${infer value}` ? key : never

    export function createStore<S, M extends ModuleTree<S>>(options: _StoreOptions<S, M>): _Store<S, M>;


    export function useStore<S = State>(injectKey?: InjectionKey<typeof store> | string): typeof store;

}
