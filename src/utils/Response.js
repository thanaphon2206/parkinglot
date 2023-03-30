const codeStatus = {
  Success: 0,
  MaintenanceService: 500,
  InvalidData: 400,
}

const status = (code) => {
  let res
  switch (code) {
    case 0:
      res = { code, message: 'ดำเนินการสำเร็จ' }
      break
    case 500:
      res = { code, message: 'ระบบกำลังอยู่ในช่วงปิดปรับปรุง' }
      break
    case 400:
      res = { code, message: 'ข้อมูลผิดพลาด' }
      break
  }
  return res
}

const response = (code, data = {}) => ({
  status: status(code),
  data,
})

module.exports = {
  response,
  codeStatus,
}
