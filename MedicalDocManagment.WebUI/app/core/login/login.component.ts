﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    //TODO fix routing
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Помилка аутентифікації, неправильне імʼя користувача або пароль';
                    this.loading = false;
                    this.authenticationService.logout();
                }
            },
            error => {
                console.log(error);
                this.error = 'Помилка аутентифікації, неправильне імʼя користувача або пароль';
                this.loading = false;
                this.authenticationService.logout();
            });
    }
}