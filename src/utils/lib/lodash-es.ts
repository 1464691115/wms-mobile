import _ from 'lodash-es'

export const sumBy = _.sumBy

export const round = function (number: number = 0, precision: number = 0) {
  const _pre = 10 ** precision
  return Math.round(number * _pre) / _pre
}
