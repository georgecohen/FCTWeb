import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loading = false;
  error = '';

  constructor(
      private route: ActivatedRoute,
      public router: Router,
      private loginService: LoginService,
      public snackBar: MatSnackBar
  ) {
    if (this.loginService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
      this.loginService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedIn() {
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password).subscribe(() => {
        this.router.navigate([this.returnUrl]);
        location.reload(true);
      },
      error => {
        this.error = error;
        this.loading = false;
        this.snackBar.open('Log in failed', null, {duration: 3000, panelClass: 'snack-bar-red'});
      });
  }
}
