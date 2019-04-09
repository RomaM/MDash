export class UserDetailsModel {
  public isSAdmin: boolean;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: any;
  public uid: string;

  constructor (isSAdmin: boolean,
               firstName: string,
               lastName: string,
               email: string,
               phone: any,
               uid: string) {
    this.isSAdmin = isSAdmin;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.uid = uid;
  }
}
