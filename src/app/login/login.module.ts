import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AlertModule } from '../_directives/alert.module';

@NgModule({
    imports: [CommonModule, FormsModule, LoginRoutingModule,AlertModule],
    declarations: [
        LoginComponent
        ],
    providers: [LoginService]
})
export class LoginModule {}
