/* eslint-disable */

const moment = require('moment-timezone')

exports.getDate = (type, date = new Date(), username) => {
  const today = moment(date).tz('Asia/Hong_Kong')
  const dateFormat = today.format().split('T')[0].split('-')
  switch (type) {
    case 'id':
      // Format: '20190624'
      return dateFormat[0] + dateFormat[1] + dateFormat[2]
    case 'idUser':
      // Format: '20190624aa001'
      return dateFormat[0] + dateFormat[1] + dateFormat[2] + username
    case 'display':
      // Format: '24-06-2019'
      return `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`
    default:
      return today.format()
  }
}

exports.convertToDateId = (date) => {
  const _date = moment(date).tz('Asia/Hong_Kong')
  const dateFormat = _date.format().split('T')[0].split('-')
  return dateFormat[0] + dateFormat[1] + dateFormat[2]
}

exports.displayDateTime = (date) => {
  const dateTime = moment(date).tz('Asia/Hong_Kong')
  const _date = dateTime.format().split('T')[0]
  const _time = dateTime.format().split('T')[1]
  const splitDate = _date.split('-')
  const splitTime = _time.split('+')
  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitTime[0]}`
}

