import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
private authService = inject(AuthService);
private router = inject(Router);

email = '';
password = '';
name = '';
errorMessage = signal('');

onSignUp() {
 console.log(this.name, this.email,this.password);
 if(this.authService.signup(this.name,this.email,this.password)){
  this.router.navigate(['/signin']);
 }else{
  this.errorMessage.set('signup failed: User may already exist.');
  return;
 }

  
}

}
