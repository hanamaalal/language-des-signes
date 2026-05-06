import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private authService=inject(AuthService);
  private router=inject(Router);
  errorMessage=signal('');
  email='';
  password='';
  onLogin(){
    const res=this.authService.signin(this.email,this.password);
    console.log(this.email,this.password);
    if(res ===true){
      this.router.navigate(['/sign']);

    }else{
      this.errorMessage.set(res.message);
      return;
    }
  }

}
