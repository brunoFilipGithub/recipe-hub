import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IncrementalNumberInputComponent } from './ui_components/incremental-number-input/incremental-number-input.component';
import { DropdownComponent } from './ui_components/dropdown/dropdown.component';
import { IngredientTagComponent } from './ui_components/ingredient-tag/ingredient-tag.component';
import { IngredientInputComponent } from './ui_components/ingredient-input/ingredient-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FileUploadComponent } from './ui_components/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './AuthGuard';
import { HomeComponent } from './pages/home/home.component';
import { DialogModule } from './dialog/dialog.module';
import { UpsertRecipeTabComponent } from './ui_components/dialogs/dialog-tabs/upsert-recipe-tab/upsert-recipe-tab.component';
import { RecipeStepsTabComponent } from './ui_components/dialogs/dialog-tabs/recipe-steps-tab/recipe-steps-tab.component';
import { UploadRecipeImageComponent } from './ui_components/dialogs/dialog-tabs/upload-recipe-image/upload-recipe-image.component';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { NavBarComponent } from './ui_components/nav-bar/nav-bar.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecipeListComponent } from './ui_components/recipe-list/recipe-list.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    IncrementalNumberInputComponent,
    DropdownComponent,
    IngredientTagComponent,
    IngredientInputComponent,
    RegisterComponent,
    LoginComponent,
    FileUploadComponent,
    HomeComponent,
    UpsertRecipeTabComponent,
    RecipeStepsTabComponent,
    UploadRecipeImageComponent,
    ViewRecipeComponent,
    NavBarComponent,
    UserPageComponent,
    PageNotFoundComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule, 
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
