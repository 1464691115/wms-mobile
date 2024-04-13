export interface UserInfo {
  nickName: string
  avatarUrl: string
  uid: string
  unionid: string
  /** 公众号用户openId */
  openid_gzh: string
  openid: string
  token: string
  phone: string
  timeout: number
}

export namespace vocabulary {
  export interface persistenceData {
    /** 已学习天数 */
    learnedDay: number
    /** 当前学习书籍的id */
    nowLearnBookId?: number
    /** 当前学习目录的id，为书籍下层 */
    nowLearnDirectoryId?: number
    /** 当前学习目录的进度 100为满，为书籍下层 */
    nowLearnDirectoryPercentage?: number
    /** 未完成单词数 */
    notSuccessNumber: number
    /** 每日任务 每日刷新*/
    dailyTask?: {
      /** 新词数 */
      newword: number
      /** 复习数 */
      reviewword: number
      /** 学习时间 */
      complete_time: string
      /** 学习天数 */
      days: number
    }
    /** 每日已完成单词 */
    recordTask: {
      /** 新词数 */
      newword: number
      /** 复习数 */
      reviewword: number
    }
  }

  export interface bookInfo {
    id: number
    name: string
    deleted_at?: any
    /** 总单词数 */
    issues: number
    isLock: 0 | 1
    /** 进度 百分比 */
    percentage: number
    /** 已完成单词数 */
    learned: number
    tid: number
    originalPrice: string
    price: string
    pic: string
  }

  export interface wordsInfo {
    id: number
    word: string
    interpretation: string
    example: string
    pt: string
    bid: number
    deleted_at?: any
    wordaudio?: any
    interaudio?: any
    examaudio?: any
    status: number
  }

  export interface directoryInfo {
    id: number
    name: string
    tid: number
    percentage: number
  }
}
