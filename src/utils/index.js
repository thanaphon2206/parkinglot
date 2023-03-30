const Response = require('./Response')

const { response, codeStatus } = Response
const timeFormatter = require('./timeFormatter')

module.exports = {
  Response: response,
  Code: codeStatus,
  timeFormatter,
}
