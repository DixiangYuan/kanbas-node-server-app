import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (id) => model.findById(id); //model.find({ _id: id });
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) => model.findOne({ username: usr, password: pass });
export const updateUser = (id, user) =>
  model.updateOne({ _id: id }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });