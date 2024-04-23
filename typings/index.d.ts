//? 去拉文档类型用下面正则替换

//? uni-app的
//TODO 查找： (.*)(String|Object|Boolean|HexColor|Number|boolean|HandleEvent)(.*)
//TODO 替换： /** $3 */ \n $1: \U$2

//? uview的
//TODO 查找：([A-Za-z]+(-[a-z]+){0,10})\t*([\u4e00-\u9fa5]([\u4e00-\u9fa5]|，|[a-z])*).*(String|Object|Boolean|HexColor|Number|boolean|HandleEvent).*
//TODO 替换（没有中间斜杠参数）： /** $3 */ \n $1: \L$5
//TODO 替换： /** $2 */ \n $1: \L$4

//? 接口文档的（这个隔行比较多，需要替换完再完善一下）
//TODO 查找（后面没有可能性和值说明的）：\d.*\n([a-z]\w+)\n\n(.*)(.*\n){0,2}
//TODO 查找（后面可能性和值说明的）：\d.*\n([a-z]\w+)\n\n(.*)(.*\n){0,5}
//TODO 替换：/** $2 */\n\t$1: string\n

//TODO 驼峰转换： (-)(\w)(\w*)
//TODO 替换： \U$2$3

//? 设计稿的样式拷贝

//? 字体
//TODO 查找 \s?height:\s?(\d*|#\d).*\n\s?font-size:\s?(\d*|#\d).*?\n(.*\s?font-family: .*\n)?.*\s?font-weight:\s?(\d*|#\d).*?\n.*\s?color:\s?(#\d+|#\w+|rgba/(.*/)).*
//TODO 替换 \n\t\t\t@include font($2rpx, $1rpx, $5, $4);\n

declare let __wxConfig: {
  envVersion: 'develop' | 'trial' | 'release'
}

/**  取对象的值 转为 联合类型 */
declare type valueOfU<T> = UnionToIntersection<T[keyof T]>
/**  取对象的值 转为 交叉类型 */
declare type valueOfI<T> = T[keyof T]
declare type getChildrenProps<T> = InstanceType<T>['$props']

type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never
type UnionToIntersection<T> = ToUnionOfFunction<T> extends (x: infer P) => any
  ? P
  : never

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}
