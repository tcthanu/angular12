import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './bean/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }
  getUserList():Observable<User[]>{
    return this.http.get<User[]>('/assets/data/userList.json');
  }
}
