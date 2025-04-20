import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      {
        next:(response) => {
          this.authService.saveToken(response.jwtToken)
          this.router.navigate(['/']).then(() => null);
        },
        error: error => {
          this.errorMessage = 'Login fallido. Verifique sus credenciales.';
          console.log(error);
        }
      }
    );
  }

}
