
export default class User {
  constructor(username, email, password, isAdmin) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}