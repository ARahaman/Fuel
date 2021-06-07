const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const WorksheetSchema = new Schema({
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

const Worksheet = mongoose.model('worksheets', WorksheetSchema);

Worksheet.getRecrods = (filter = {}) => {
  return crud.getRecords(Worksheet, filter);
}

Worksheet.getRecrod = (filter) => {
  return crud.getRecordByFilter(Worksheet, filter);
}

Worksheet.createRecrod = (record) => {
  return crud.createRecrod(Worksheet, record);
}

Worksheet.deleteRecrod = (filter) => {
  return crud.deleteRecrod(Worksheet, filter);
}

Worksheet.updateRecrod = (filter, record) => {
  return crud.updateRecrod(Worksheet, filter, record);
}

module.exports = Worksheet;
