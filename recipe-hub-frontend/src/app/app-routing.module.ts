import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './AuthGuard';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes-page', pathMatch:"full" },
  { path: 'recipes-page', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'register-page', component: RegisterComponent },
  { path: 'login-page', component: LoginComponent },
  { path: 'view-recipe-page/:id', component: ViewRecipeComponent, canActivate : [AuthGuard] },
  { path: 'user-page', component: UserPageComponent, canActivate : [AuthGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
