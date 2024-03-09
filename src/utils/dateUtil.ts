/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'
// 时间插件
import duration from 'dayjs/plugin/duration'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date: dayjs.Dayjs | number | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

export function formatToDate(
  date: dayjs.Dayjs | number | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format)
}

dayjs.extend(duration)

export const dateUtil = dayjs
