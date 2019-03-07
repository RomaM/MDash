export class UserDetailsModel {
  public name: string;
  public email: string;
  public isAdmin: boolean;
  public responsible: string;
  public uid: string;

  constructor (name: string,
               email: string,
               isAdmin: boolean,
               responsible: string,
               uid: string) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
    this.responsible = responsible;
    this.uid = uid;
  }
}
