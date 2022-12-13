module.exports = class UserDto {
  email;
  id;
  userName;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.userName = model.userName;
  }
};
