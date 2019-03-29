export class UserDetailsModel {
  public isAdmin: boolean;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: any;
  public uid: string;

  constructor (isAdmin: boolean,
               firstName: string,
               lastName: string,
               email: string,
               phone: any,
               uid: string) {
    this.isAdmin = isAdmin;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.uid = uid;
  }
}
