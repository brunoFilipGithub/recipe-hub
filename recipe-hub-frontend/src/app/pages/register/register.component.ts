import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { RecipeHubService } from 'src/app/services/recipe.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/dialog/dialog.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  displayErrorMessages : Boolean = false;

  user : User = {
    Id: 0,
    Email: '',
    UserName: '',
    PasswordHash: '',
    UserImage: ''
  };
  
  constructor(private router : Router, private titleService : Title, private recipeService : RecipeHubService, private dialogService : DialogService) {
    titleService.setTitle("Register:");
    
   }

   registerForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      userName : new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    repeatPassword : new FormControl('', 
    [Validators.required
    ])
    });

  get emailControl() {
    return this.registerForm.get("email");
  }

  get userNameControl() {
    return this.registerForm.get("userName");
  }

  get passwordControl() {
    return this.registerForm.get("password");
  }

  get repeatPasswordControl() {
    return this.registerForm.get("repeatPassword");
  }
  
  ngOnInit(): void {
    
  }

  async onSubmit() {
    Object.keys(this.registerForm.controls).forEach(element => {
      const control = this.registerForm.get(element);

      if(control?.errors != null)
      {
        this.displayErrorMessages = true;
      }
    })

    if(this.registerForm.invalid)
    {
      return;
    }
    
    if (this.user.UserImage == "") {
      this.user.UserImage = "/assets/images/default.png";
    }

    this.user = { Id : 0, Email : this.emailControl?.value, UserName : this.userNameControl?.value, PasswordHash : this.passwordControl?.value, UserImage : this.user.UserImage}

    this.recipeService.PostUserRegister(this.user).subscribe({
      next: (result) => {

        this.dialogService.openMessageDialog("Message", "Registration successful!")
        /* dialogRef.dialogRef!.afterClosed.pipe(take(1)).subscribe((x) => {
          this.router.navigate(['/recipes-page']);
        })*/
        
      },
      error: (err) => {

        let errorText;

        if(err.status == 0)
        {
          errorText = "Your request could not reach the server"
        } else errorText = err.error;

       const dialogRef = this.dialogService.openMessageDialog("Error","Registration failed! " + errorText);
       /*
        dialogRef.dialogRef!.afterClosed.pipe(take(1)).subscribe((x) => {
          this.router.navigate(['/register-page']);
        })*/
      }
    }); 

    
  }

  passwordsEqual() : Boolean {

    if(this.passwordControl?.value != this.repeatPasswordControl?.value)
    {
      this.repeatPasswordControl?.setErrors({ ...(this.repeatPasswordControl.errors || {}), 'passwordsNotEqual': 'Passwords do not match!' })
      return false;
    }
    return true;
  }

  onImageUpload(e : string) : void {
    this.user.UserImage = e;
    console.log(this.user.UserImage)
  }


}
