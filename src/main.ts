import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store';
import * as globalUtils from '@/utils/global';
import * as globalEnum from '@/enums';

export function createApp() {
    const app = createSSRApp(App).use(store)
    app.mixin({ methods: globalUtils, data() { return { ...globalEnum } } })

    return {
        app
    }
}

