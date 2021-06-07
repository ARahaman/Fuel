const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const ManagerSheetSchema = new Schema({
  workerid: { type: Schema.Types.ObjectId, ref: 'users'},
  worksheet: String,
  createdOn: String,
  updatedOn: String,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'users'}
})

const ManagerSheet = mongoose.model('managerSheet', ManagerSheetSchema);

ManagerSheet.getRecrods = (filter = {}) => {
  return crud.getRecords(ManagerSheet, filter);
}

ManagerSheet.getRecrod = (filter) => {
  return crud.getRecordByFilter(ManagerSheet, filter);
}

ManagerSheet.createRecrod = (record) => {
  return crud.createRecrod(ManagerSheet, record);
}

ManagerSheet.deleteRecrod = (filter) => {
  return crud.deleteRecrod(ManagerSheet, filter);
}

ManagerSheet.updateRecrod = (filter, record) => {
  return crud.updateRecrod(ManagerSheet, filter, record);
}

module.exports = ManagerSheet;
