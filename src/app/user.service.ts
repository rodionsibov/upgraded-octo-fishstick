import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users'
  private http = inject(HttpClient)

  members = toSignal(this.http.get<User[]>(this.userUrl), {initialValue: []})
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}