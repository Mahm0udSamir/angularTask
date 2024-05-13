import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './components/users-list/users-list.component';
import CoreModule from '../../core/core.module';
import { UsersComponent } from './components/users.component';
import UsersRoutingModule from './users-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { UsersService } from './services/users.service';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { SearchComponent } from './components/users-list/search/search.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { UserCardComponent } from './components/users-list/user-card/user-card.component';

@NgModule({
    declarations: [
        UsersComponent,
        UsersListComponent,
        UserDetailsComponent,
        SearchComponent,
        UserCardComponent
    ],
    exports: [],
    providers: [UsersService],
    imports: [
        CommonModule,
        CoreModule,
        UsersRoutingModule,
        HeaderComponent,
        PaginationComponent,
        MatCardModule,
        MatGridListModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        HeaderComponent,
        LoadingComponent,
        ErrorComponent
    ]
})
export default class UsersModule {}