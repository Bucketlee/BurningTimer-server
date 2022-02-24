module.exports = {
  // users
  login: require("./users/login"),
  signup: require("./users/signup"),
  findId: require("./users/findId"),
  findPassword: require("./users/findPassword"),

  // tasks
  createTask: require("./tasks/createTask"),
  getTasks: require("./tasks/getTasks"),
  updateTask: require("./tasks/updateTask"),

  // labels
  createLabel: require("./labels/createLabel"),
  getLabels: require("./labels/getLabels"),
  updateLabel: require("./labels/updateLabel"),
  deleteLabel: require("./labels/deleteLabel"),
};
