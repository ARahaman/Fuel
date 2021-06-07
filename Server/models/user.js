const mongoose = require('mongoose');
const crud = require('../utils/crud-utils')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  designation: String,
  id: String,
  email: String,
  password: String,
  gender: String,
  myBlogs: [Schema.Types.ObjectId],
  myStories: [Schema.Types.ObjectId],
  blogsLiked: [Schema.Types.ObjectId],
  storiesLiked: [Schema.Types.ObjectId],
  provider:String,
  image: String,
  token: String,
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

const User = mongoose.model('users', UserSchema);

User.getRecrods = () => {
  return crud.getRecords(User);
}

User.getRecordByFilter = (filter = {}) => {
  return crud.getRecordByFilter(User, filter);
}

User.getRecrod = (filter) => {
  return crud.getRecord(User, filter);
}

User.createRecrod = (record) => {
  return crud.createRecrod(User, record);
}

User.deleteRecrod = (filter) => {
  return crud.deleteRecrod(User, filter);
}

User.updateRecrod = (filter, record) => {
  return crud.updateRecrod(User, filter, record);
}

module.exports = User;
