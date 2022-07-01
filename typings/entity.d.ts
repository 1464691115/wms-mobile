/** 用户 */
declare namespace userEntity {
    type Item = {
        openid: IdType;
        nickName: string;
        avatarUrl: string;
        token: string;
        phone: string;
        uid?: string | number;
    }

    type Info = {
        city: string;
        country: string;
        headimgurl: string;
        language: string;
        nickname: string;
        openid: string;
        privilege: any[];
        province: string;
        sex: number;
    }
}


/** id */
declare type IdType = number | string

/** 选项 */
declare type OptionType = { id: IdType, title?: string }