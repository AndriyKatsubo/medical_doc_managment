﻿import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // get users from secure api end point
        //this.userService.getUsers()
        //    .subscribe(users => {
        //        this.users = users;
        //    });
    }

}