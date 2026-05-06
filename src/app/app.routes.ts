import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Signup } from './components/signup/signup';
import { Signin } from './components/signin/signin';
import { guardAuthGuard } from './guard/guard.auth-guard';
import { Sign } from './components/sign/sign';
import { Quiz } from './components/quiz/quiz';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home',component:Home},
    {path:'signup',component:Signup},
    {path:'signin',component:Signin},
    {path:'sign',component:Sign,canActivate:[guardAuthGuard]},
    {path:'quiz',component:Quiz,canActivate:[guardAuthGuard]}

];
