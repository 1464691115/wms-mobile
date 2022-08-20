export namespace BasicIcon {
}


/** 图标 */
export enum ICON_UNICODE {
    TAB1 = '&#xe60d;',
    TAB1SELECTED = '&#xe610;',
    TAB2 = '&#xe60e;',
    TAB2SELECTED = '&#xe60a;',
}

export type ICON_UNICODE_VALUE = keyof { [Key in keyof typeof ICON_UNICODE as `${typeof ICON_UNICODE[Key]}`]: any } | keyof typeof ICON_UNICODE
