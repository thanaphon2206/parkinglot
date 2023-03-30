/* eslint-disable */
const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId


const status = ['ACTIVE', 'INACTIVE']

const groupUserSchema = new mongoose.Schema({
  companyName: { type: String },
  name: { type: String },
  description: { type: String },
  status: { type: String, enum: status },
  member: [{ type: ObjectId, }],
  userManagements: [{ type: ObjectId, }],
  userMembers: [{ type: ObjectId, }],
})

module.exports = mongoose.model('group', groupUserSchema)