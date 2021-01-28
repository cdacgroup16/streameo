export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: number;
  stream_count: number;
  profiles: any;
  watch_history: any;


  constructor(id: string, firstname: string, lastname: string, email: string, role: number, stream_count: number, profiles: any, watch_history: any) {
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
