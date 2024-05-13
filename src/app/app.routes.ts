import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./modules/users/users.module') },
    {path:'', redirectTo:'/users', pathMatch:'full'}

];
