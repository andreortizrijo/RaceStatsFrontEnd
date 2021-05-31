export class SignupModel {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  constructor(email='', username='', password='', confirmPassword=''){
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
