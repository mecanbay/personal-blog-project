const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  create_user: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  read_user: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  update_user: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  delete_user: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  create_role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  read_role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  update_role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  delete_role: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const Roles = mongoose.model("Roles", RolesSchema);

module.exports = Roles;
