import pkg from '../../package.json'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return __wxConfig.envVersion
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return __wxConfig.envVersion == 'develop'
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return __wxConfig.envVersion == 'release'
}

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getAppEnvConfig() {
  const _config = {
    VITE_GLOB_APP_TITLE: pkg.description,
    /** 全局接口前缀 */
    VITE_GLOB_API_URL: 'https://xxx.allyesok.com',
    /** 全局图片前缀 */
    VITE_GLOB_IMG_PREFIX: 'https://xxx.allyesok.com',
    VITE_GLOB_APP_SHORT_NAME: pkg.name,
    VITE_GLOB_FONT_URL: '/static/font/DingTalk-JinBuTi.woff',
  }

  let version = ''
  //#ifdef MP-WEIXIN
  version = __wxConfig.envVersion
  //#endif
  switch (version) {
    // 开发
    case 'develop':
    //  体验
    case 'trial':
    //  线上
    case 'release':
      _config.VITE_GLOB_API_URL = 'https://xxx.allyesok.com'
  }

  return _config
}
