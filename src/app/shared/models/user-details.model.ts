export class UserDetailsModel {
  constructor (
    public isSAdmin: boolean,
    public name: string,
    public surname: string,
    public email: string,
    public phone: any,
    public uid: string,
  ) {}
}

export class CurrentUser {
  constructor (
    public email: string,
    public uid: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
