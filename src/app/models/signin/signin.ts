export class SigninModel {
  username: string;
  password: string;

  constructor(username='', password=''){
    this.username = username;
    this.password = password;
  }
}
