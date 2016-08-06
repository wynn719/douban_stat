export default {
  /**
   * @param  {string} datetime  '2018-08-06 15:31:02'
   * @return {[type]} rfc3339Time '2018-08-06T15:31:02Z'
   */
  toRfc3339: function (datetime) {
    return datetime.replace(' ', 'T') + 'Z'
  },

  /**
   * @param  {String} arg 时间参数
   * @return {String || Object}
   */
  now: function (arg) {
    let date = new Date()
    let pad2 = function (number) {
      return (number < 10 ? '0' : '') + number
    }
    let now = {
      year: pad2(date.getFullYear()),
      mouth: pad2(date.getMonth() + 1),
      day: pad2(date.getDate()),
      hour: pad2(date.getHours()),
      minute: pad2(date.getMinutes()),
      second: pad2(date.getSeconds())
    }
    let datetime = now.year + '-' + now.mouth + '-' + now.day + ' ' + now.hour + ':' + now.minute + ':' + now.second
    if (arg) {
      return now.arg
    }
    return datetime
  },

  getDateTimeByYear: function (year) {
    return year + '' + '-01-01 00:00:00'
  }
}
