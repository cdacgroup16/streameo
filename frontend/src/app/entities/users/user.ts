export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: number;
  // tslint:disable-next-line:variable-name
  stream_count: number;
  profiles: any;
  // tslint:disable-next-line:variable-name
  watch_history: any;


  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:variable-name
  // tslint:disable-next-line:max-line-length
  constructor(id: string, firstname: string, lastname: string, email: string, role: number, stream_count: number, profiles: any, watch_history :any) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.stream_count = stream_count;
    this.profiles = profiles;
    this.watch_history = watch_history;
  }
}
