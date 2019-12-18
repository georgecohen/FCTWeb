import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        private loginService: LoginService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.loginService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLoggedin() {
        this.loading = true;

        this.loginService.login(this.model.username, this.model.password).subscribe(
            (response: any) => {
                switch (response)
                {
                    case 1:
                        // this.msg = "Login successully. ";
                        this.alertService.success("Login successully.", false);
                        this.router.navigate([this.returnUrl]);
                        break;
                    case -2:
                        // this.msg = "The account is locked.";
                        this.alertService.error("The account is locked.", false);
                        break;
                    default:
                        // this.msg = "User name and password are not matched.";
                        this.alertService.error("User name and password are not matched.", false);
                        break;

                }
                this.loading = false;
            },
            error => {
                this.alertService.error("There is an error when logging in.", false);
                this.loading = false;
            }
        );
    }
}
