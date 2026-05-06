import { computed, Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private storageKey='users';
  private currentKey='currentUser';
  isLoggedIn=computed(()=>this.user()!==null);
  private user=signal<any|null>(this.loadUser());
  signup(name:string,email:string,password:string):boolean{
    const newUser: User={name,email,password};
    const users =this.getUserFromStorage();
    if(users.find(user =>user.email===email)){
      return false;
    }
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    return true;
  }
  private loadUser(){
    if(typeof localStorage ==='undefined') return null;
   const currentUser=localStorage.getItem(this.currentKey);
   return currentUser ? JSON.parse(currentUser!):null; 
  }
 private getUserFromStorage():User[] 
 {
  const users =localStorage.getItem('users');
  return users? JSON.parse(users):[];
  }
  signin(email:string,password:string){
    const users=this.getUserFromStorage();
    const found=users.find(u =>u.email === email && u.password===password);
    if(!found){
      return{message:'erreur'};
    }
    localStorage.setItem(this.currentKey,JSON.stringify(found));
    this.user.set(found);
    return true;
  }
  logout() {
  localStorage.removeItem(this.currentKey);
  this.user.set(null);
}
}

