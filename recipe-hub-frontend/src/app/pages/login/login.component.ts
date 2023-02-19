import { Component, ComponentRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DialogService } from 'src/app/dialog/dialog.service';
import { AuthResponse } from 'src/app/models/authResponse';
import { LoginUser } from 'src/app/models/loginUser';
import { RecipeHubService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayErrorMessages: Boolean = false;
  invalidLogin: boolean = false;
  credentials: LoginUser = { email: '', password: '' };

  constructor(private titleService: Title, private recipeService: RecipeHubService, private router: Router, private dialogService: DialogService) {
    this.titleService.setTitle("Login:");
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)])
  });

  get emailControl() {
    return this.loginForm.get("email");
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    Object.keys(this.loginForm.controls).forEach(element => {
      const control = this.loginForm.get(element);

      if (control?.errors != null) {
        this.displayErrorMessages = true;
      }
    });

    if (this.loginForm.invalid) {
      return;
    }

    this.credentials = { email: this.emailControl?.value, password: this.passwordControl?.value };

    this.recipeService.PostUserLogin(this.credentials).subscribe({
      next: (response) => {
        const token = (response as AuthResponse).token;
        localStorage.setItem("jwt", token);
        this.recipeService.SendAuthStateChangeNotification(response.isAuthSuccessful);
        this.router.navigate(["/recipes-page"]);
      },

      error: (err) => {
        let errorText;

        if (err.status == 0) {
          errorText = "Your request could not reach the server"
        } else errorText = err.error;

        this.dialogService.openMessageDialog("Error", errorText);
      }
    });

  }


}


