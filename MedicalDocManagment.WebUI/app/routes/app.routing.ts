import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/guards/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { UserAddComponent } from "../components/user/user-add/user-add.component";
import { UsersSearchFormComponent } from "../components/user/users-search/users-search-form.component";
import { HomeAdminComponent } from "../components/home/admin/home-admin.component";
import { HomeMainComponent } from "../components/home/main/home-main.component";
import ChildCardAddComponent from "../components/childrens-card/children-cards-list/add/children-card-add.component";
import MainAppComponent from "../components/main-app.component";
import AdminAppComponent from "../components/admin-app.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'admin', component: AdminAppComponent, canActivate: [AuthGuard], data: { roles: ['admin'] },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeAdminComponent },
            { path: 'add', component: UserAddComponent },
            { path: 'search', component: UsersSearchFormComponent }
        ]
    },
    {
        path: 'main', component: MainAppComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'user'] },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeMainComponent },
            { path: 'add', component: ChildCardAddComponent },
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);