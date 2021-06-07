const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const MnagerUserSchema = new Schema({
  manager: { type: Schema.Types.ObjectId, ref: 'users'},
  workers: [{ type: Schema.Types.ObjectId, ref: 'users'}],
  worksheet: String,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users'}
})

const ManagerUserMap = mongoose.model('managerusermap', MnagerUserSchema);

ManagerUserMap.getRecrods = (filter = {}) => {
  return crud.getRecords(ManagerUserMap, filter);
}

ManagerUserMap.getRecrod = (filter) => {
  return crud.getRecord(ManagerUserMap, filter);
}

ManagerUserMap.createRecrod = (record) => {
  return crud.createRecrod(ManagerUserMap, record);
}

ManagerUserMap.deleteRecrod = (filter) => {
  return crud.deleteRecrod(ManagerUserMap, filter);
}

ManagerUserMap.updateRecrod = (filter, record) => {
  return crud.updateRecrod(ManagerUserMap, filter, record);
}

module.exports = ManagerUserMap;
