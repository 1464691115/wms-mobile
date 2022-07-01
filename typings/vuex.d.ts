import { ComponentCustomProperties, ComputedOptions, State } from 'vue'
import { Store } from 'vuex'
import user from '@/store/modules/user';
import doctor from '@/store/modules/doctor';
import store from '@/store';

declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
    }

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
    }
}

declare module 'vuex' {

    export * from 'vuex/types'

    //TODO kesen: 2022-05-21  模块化 dispatch 和 commit
    type _StoreOptions<S, M extends ModuleTree<S>> = StoreOptions<S> & { modules: M }

    type _Store<S, M extends ModuleTree<S>> = Omit<Store<S>, 'dispatch' | 'commit'> & {
        state: { [KM in keyof M]: M[KM]['state'] }
        test: DispatchParmType<M>
        dispatch<K extends keyof T, T = DispatchParmType<M>>(type: K, payload?: Parameters<T[K]>[1]): ReturnType<T[K]>
        commit<K extends keyof T, T = CommitParmType<M>>(type: K, payload: Parameters<T[K]>[1]): ReturnType<T[K]>
    }


    type DispatchParmType<T extends ModuleTree<S>> = valueOfU<{
        [K in keyof T]: valueOfU<{
            [P in keyof T[K]['actions']]: {
                [C in P as `${K}/${P}`]: T[K]['actions'][C]
            }
        }>
    }>

    type CommitParmType<T extends ModuleTree<S>> = valueOfU<{
        [K in keyof T]: valueOfU<{
            [P in keyof T[K]['mutations']]: {
                [C in P as `${K}/${P}`]: T[K]['mutations'][C]
            }
        }>
    }>


    export function createStore<S, M extends ModuleTree<S>>(options: _StoreOptions<S, M>): _Store<S, M>;


    export function useStore<S = State>(injectKey?: InjectionKey<typeof store> | string): typeof store;

}


