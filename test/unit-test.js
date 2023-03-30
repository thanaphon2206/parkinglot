const Utils = require('../src/utils')
const Parking = require('../src/controllers/parking.controller')
const fs = require('fs')
const rs = require('chai').assert

let cmd = new Array()
let parking = new Parking()
let stack

describe('Test for reading file', function () {
    it('Test read file', function (done) {
        fs.readFile('./data/input.txt', 'utf-8', function (err, data) {
            if (err) {
                throw 'Can not read file'
            }
            cmd = JSON.parse(JSON.stringify(data)).split('\n')
            done()
        })
    })
})

describe('Test Funtion Parking..', function () {
    it('Creating a Parking lot', function (done) {
        stack = parking.createPark(cmd[0])
        rs.equal(stack, 6)
        done()
    })

    it('Allocated slot number: 1', function (done) {
        stack = parking.park(cmd[1])
        rs.equal(stack, 1)
        done()
    })

    it('Allocated slot number: 2', function (done) {
        stack = parking.park(cmd[2])
        rs.equal(stack, 2)
        done()
    })

    it('Allocated slot number: 3', function (done) {
        stack = parking.park(cmd[3])
        rs.equal(stack, 3)
        done()
    })

    it('Allocated slot number: 4', function (done) {
        stack = parking.park(cmd[4])
        rs.equal(stack, 4)
        done()
    })

    it('Allocated slot number: 5', function (done) {
        stack = parking.park(cmd[5])
        rs.equal(stack, 5)
        done()
    })

    it('Allocated slot number: 6', function (done) {
        stack = parking.park(cmd[6])
        rs.equal(stack, 6)
        done()
    })

    it('leave 4', function (done) {
        stack = parking.leave(cmd[7])
        rs.equal(stack, 4)
        done()
    })

    it('status', function (done) {
        stack = parking.status(cmd[8])
        rs.equal(stack.length, 6)
        done()
    })

    it('new cars into parking, Allocated slot number: 4', function (done) {
        stack = parking.park(cmd[9])
        rs.equal(stack, 4)
        done()
    })

    it('new cars into parking, Sorry, parking lot is full', function (done) {
        try {
            stack = parking.park(cmd[10])
        } catch (e) {
            rs.equal(String(e), 'Error: Sorry, parking lot is full')
        }
        done()
    })

    it('registration numbers for cars with colour White', function (done) {
        stack = parking.registerCarColour(cmd[11])
        rs.include(stack[0], 'KA-01-HH-1234')
        rs.include(stack[1], 'KA-01-HH-9999')
        rs.include(stack[2], 'KA-01-P-333')
        done()
    })

    it('slot numbers for cars with colour White', function (done) {
        stack = parking.slotCarsColour(cmd[12])
        rs.equal(stack[0], 1)
        rs.equal(stack[1], 2)
        rs.equal(stack[2], 4)
        done()
    })

    it('slot number for registration number KA-01-HH-3141', function (done) {
        stack = parking.registerCarName(cmd[13])
        rs.equal(stack, 6)
        done()
    })

    it('slot number for registration number MH-04-AY-1111', function (done) {
        try {
            stack = parking.registerCarName(cmd[14])
        } catch (e) {
            rs.equal(String(e), 'Error Not found')
        }
        done()
    })
})