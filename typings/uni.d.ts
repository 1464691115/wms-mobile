/// <reference types="@dcloudio/types" />

declare namespace UniApp {
    interface Uni {
        setStorageSync<T extends keyof global.storageObj>(key: T, value: any): void
        getStorageSync<T extends keyof global.storageObj>(key: T): global.storageObj[T] | undefined
    }
}