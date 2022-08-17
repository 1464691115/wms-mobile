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
         /** 如遇到type没有提示的情况下，请检查 modules里是否有 空对象的 属性，如有请删除 */
        dispatch<K extends keyof T, T = GetParmType<M, 'dispathAct'>>(type: K, payload?: Parameters<T[K]>[1]): any
         /** 如遇到type没有提示的情况下，请检查 modules里是否有 空对象的 属性，如有请删除 */
        commit<K extends keyof T, T = GetParmType<M, 'mutations'>>(type: K, payload: Parameters<T[K]>[1]): ReturnType<T[K]>
         /** 如遇到type没有提示的情况下，请检查 modules里是否有 空对象的 属性，如有请删除 */
        getters: {
            [K in keyof GetParmType<M, 'getters'>]: ReturnType<GetParmType<M, 'getters'>[K]>
        }
    }

    type GetStoreValue<S, K extends ReconstitutionStKey> = { [KS in keyof S]: S[KS][K] }


    type GetParmType<T, V extends ReconstitutionStKey> = valueOfU<{
        [K in keyof T]: valueOfU<{
            [P in keyof Exclude<T[K][V], undefined>]: {
                [C in P as `${K}/${P}`]: Exclude<T[K][V], undefined>[C]
            }
        }>
    }>

    export function createStore<S, M extends ModuleTree<S>>(options: _StoreOptions<S, M>): _Store<S, M>;


    export function useStore<S = State>(injectKey?: InjectionKey<typeof store> | string): typeof store;

}


