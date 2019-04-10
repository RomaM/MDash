export class UserDetailsModel {
  public isSAdmin: boolean;
  public name: string;
  public surname: string;
  public email: string;
  public phone: any;
  public uid: string;

  constructor (isSAdmin: boolean,
               name: string,
               surname: string,
               email: string,
               phone: any,
               uid: string) {
    this.isSAdmin = isSAdmin;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.uid = uid;
  }
}
