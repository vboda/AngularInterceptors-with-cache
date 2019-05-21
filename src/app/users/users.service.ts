import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { UsersCacheService } from './users-cache.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  private url = "http://localhost:3000/api/users";
  
  constructor(private http:HttpClient, private userCacheService:UsersCacheService) { }
  
  getUsers():Observable<User[]>|null{
    return this.http.get<User[]>(this.url)
    .pipe(
      tap(res=>res)
    )
     
  }

  updateUser(user):Observable<User>|undefined{
    console.log(`${this.url}/${user._id}`);
    return this.http.patch<User>(`${this.url}/${user._id}`,user)
    .pipe(
      tap(res=>res)
    )
  }

  addUser(user):Observable<any>|undefined{
    return this.http.post(this.url,user)
    .pipe(
      tap(res=>res)
    )
  }

  deleteUser(user):Observable<any>|undefined{
    return this.http.delete(`${this.url}/${user._id}`, user)
    .pipe(
      tap(res => res)
    )
  }
}
