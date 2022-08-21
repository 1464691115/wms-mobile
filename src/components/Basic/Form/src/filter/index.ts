export function filterComponentsProps(this, arr, propsParams = {}) {
    return arr?.map(function (el) {
        const fn = el.componentProps
        el.componentProps = typeof fn == "function" ? fn(propsParams) : fn;
        return el;
    });
}

export function filterLabel(label?: string | Function, item?) {
    return typeof label == "string" || label === undefined ? label : label(item);
}

/** 过滤分号 */
export function filterColon(str?: boolean | string) {
    return typeof str === 'string' ? str : '：'
}
