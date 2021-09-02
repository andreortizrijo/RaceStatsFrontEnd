import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { SignupComponent } from './signup/signup.component';
import { LivegraphComponent } from './livegraph/livegraph.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'detail/:id', component: DetailComponent },
  { path:'signup', component: SignupComponent },
  { path:'live', component: LivegraphComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
