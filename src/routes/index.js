const Utils = require('../utils')

const Parking = require('../controllers/parking.controller')
const readLine = require("readline")
const fs = require('fs')

require('events').EventEmitter.defaultMaxListeners = 20 //set limiter

let parking = new Parking()

let cmdProcessRun = process.argv
let checkCommand = false
let fileName = cmdProcessRun.at(-1)
let file = cmdProcessRun.at(-1).endsWith('.txt')

if (cmdProcessRun && file) {
  checkCommand = true
  if (checkCommand) {
    fs.readFile(fileName, 'utf-8', function (err, data) {
      if (err) {
        console.log('Can not read file')
      } else {
        let stackCmd = data.split('\n')
        for (let i = 0; i < stackCmd.length; i++) {
          mainControl(stackCmd[i])
        }
        process.exit(1)
      }
    })
  }
} else {
  interactiveConsole()
}

// for input command line
function interactiveConsole() {
  let cml = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  cml.question('Input: ', function (data) {
    mainControl(data)
  })
}

function mainControl(input) {
  if (!input) console.log(Utils.Response(Utils.Code.InvalidData))
  let cmd = input.split(' ')[0]
  let parkingStatus = new Array()
  let positionCarColour = new Array()
  let totalParking = 0
  let parkingNumber = 0
  let registerCarNumbers = 0

  switch (cmd) {
    case 'create_parking_lot':
      try {
        totalParking = parking.createPark(input)
        console.log('Created a parking lot with ' + totalParking + ' slots.')
      }
      catch (e) {
        console.log(e.message)
      }
      break
    case 'park':
      try {
        parkingNumber = parking.park(input)
        
        console.log('Allocated slot number: ' + parkingNumber)
      }
      catch (e) {
        console.log(e.message)
      }
      break
    case 'leave':
      try {
        parkingNumber = parking.leave(input)
        console.log('Slot number ' + parkingNumber + ' is free.')
      }
      catch (e) {
        console.log(e.message)
      }
      break
    case 'status':
      try {
        parkingStatus = parking.status()
        if (parkingStatus && parkingStatus.length > 1) {
          console.log(parkingStatus.join('\n'))
        }
        else {
          console.log('Sorry, parking lot is empty') // what if it's empty
        }
      }
      catch (e) {
        console.log(e.message)
      }
      break
    case 'leave_by_car_name': // input car name for leave
      try {
        parkingNumber = parking.leaveBycarName(input)
        console.log('Slot number ' + parkingNumber + ' is free.')
      } catch (e) {
        console.log(e.message)
      }
    case 'registration_numbers_for_cars_with_colour': // register with same colour
      try {
        registerCarNumbers = parking.registerCarColour(input)
        if (registerCarNumbers.length) {
          console.log(registerCarNumbers.join(', '))
        } else {
          console.log('Car with given color is not found')
        }
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'slot_numbers_for_cars_with_colour': // register with same colour
      try {
        positionCarColour = parking.slotCarsColour(input)
        if (positionCarColour.length) {
          console.log(positionCarColour.join(', '))
        } else {
          console.log('Car with given color is not found')
        }
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'slot_number_for_registration_number': // check car with name car
      try {
        parkingNumber = parking.registerCarName(input)
        console.log(parkingNumber)
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'avaliable_parking': // car avaliable
      try {
        parkingNumber = parking.getAvailable()
        console.log(parkingNumber)
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'size_parking': // check size 
      try {
        parkingNumber = parking.getSize()
        console.log(parkingNumber)
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'slot_parking': // check slot
      try {
        parkingNumber = parking.getSlots()
        console.log(parkingNumber)
      } catch (e) {
        console.log(e.message)
      }
      break
    case 'exit':
      process.exit(0)
      break
    default:
      console.log((input, 'Invalid command'))
      break
  }
  interactiveConsole()
}

// getAvailable console.log(`Parking size is: ${this.slots.length}`)
module.exports = Parking