class ParkingLot {

  constructor() {
    this.slots = new Array() // array for parking slots
    this.parkinglot = 0
    this.cars = {}
  }

  createPark(input) {
    this.parkinglot = parseInt(input.split(' ')[1])
    if (this.parkinglot <= 0) {
      throw new Error('Lot Minimum must be greater than or equal to 0')
    }
    for (let i = 0; i < this.parkinglot; i++) {
      this.slots.push(null)
    }
    return this.parkinglot
  }

  park(input) {
    if (this.parkinglot > 0) {
      let carNumber, carColor
      if (this.getAvailable()) {
        for (let i = 0; i < this.slots.length; i++) {
          if (this.slots[i] === null) {
            carNumber = input.split(' ')[1]
            carColor = input.split(' ')[2]
            this.cars = {
              name: carNumber,
              colour: carColor,
            }
            if (carNumber && carColor) {
              this.slots[i] = this.cars
              i++
              return i
            } else {
              throw new Error('Please specify the registration number and color first')
            }
          }
        }
      } else {
        throw new Error('Sorry, parking lot is full')
      }
    }
    else {
      throw new Error('No Parking')
    }
  }

  leave(input) {
    if (this.parkinglot > 0) {
      let carIndex = 0
      carIndex = parseInt(input.split(' ')[1] - 1)
      if (carIndex > this.parkinglot.length) {
        throw new Error(`Parking Not Found Number ${carIndex + 1}.`)
      } else if (this.slots[carIndex] === null) {
        throw new Error(`Slot ${carIndex + 1} is available.`)
      } else if (carIndex >= 0 && this.slots[carIndex] !== null && carIndex <= this.parkinglot) {
        this.slots[carIndex] = null
        carIndex++
        return carIndex
      }
    } else {
      throw new Error('No Parking')
    }
  }

  leaveBycarName() {
    if (this.parkinglot > 0) {
      let carName = ''
      carName = input.split(' ')[1]
      for (let i = 0; i < this.slots.length; i++) {
        if (carName === this.slots[i].name) {
          this.slots[i] = null
          return i + 1
        }
      }
    } else {
      throw new Error('No Parking')
    }
  }

  status() {
    const stack = new Array()
    if (this.parkinglot > 0) {
      stack.push('Slot No. Registration No Colour')
      for (let i = 0; i < this.slots.length; i++) {
        if (this.slots[i] !== null) {
          stack.push(i + 1 + ' ' + this.slots[i].name + ' ' + this.slots[i].colour)
        }
      }
      return stack
    }
    return null
  }

  registerCarColour(input) {
    const stack = new Array()
    if (this.parkinglot > 0) {
      let carColor = ''
      carColor = input.split(' ')[1]
      for (let i = 0; i < this.slots.length; i++) {
        if (this.slots[i] !== null && this.slots[i].colour === carColor) {
          stack.push(this.slots[i].name)
        }
      }
      if (!stack) throw new Error('Status not avaliable')
      return stack
    } else {
      throw new Error('No Parking')
    }
  }

  slotCarsColour(input) {
    const stack = new Array()
    if (this.parkinglot > 0) {
      let carColor = ''
      carColor = input.split(' ')[1]
      for (let i = 0; i < this.slots.length; i++) {
        if (this.slots[i] !== null && this.slots[i].colour === carColor) {
          stack.push(i + 1)
        }
      }
      if (!stack) throw new Error('Status not avaliable')
      return stack
    } else {
      throw new Error('No Parking')
    }
  }

  registerCarName(input) {
    try {
      let index = 0
      if (this.parkinglot > 0) {
        let carName = ''
        carName = input.split(' ')[1]
        for (let i = 0; i < this.slots.length; i++) {
          if (this.slots[i] !== null && this.slots[i].name === carName) {
            index = i + 1
            return index
          }
        }
        return 'Not found'
      } else {
        throw new Error('No Parking')
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  getSlots() {
    console.log(`Parking slots: ${this.slots}`)
    return this.slots
  }

  getSize() {
    console.log(`Parking size is: ${this.slots.length}`)
    return this.slots.length
  }

  getAvailable() {
    const availableSlots = this.slots.filter((v) => v === null).length
    return availableSlots
  }

  isFull() {
    return this.getAvailable() === 0
  }
}

module.exports = ParkingLot