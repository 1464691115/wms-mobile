import { ref, watch } from "vue";

export default function <A>(props: { api: (...arg) => Promise<Result<A>>, immediate?}) {
    const list = ref<A>()

    watch(() => props, (val) => {
        if (val.immediate === false) return
        reload()
    }, {
        immediate: true
    })

    function reload() {
        props.api?.().then(res => {
            list.value = res.data
        })
    }

    return [
        list,
        reload
    ] as const
}